// ============================================================================
// USER · SERVICE  (Servicio / Lógica de negocio)
// ----------------------------------------------------------------------------
// Aquí resolvemos un detalle importante del modelo `users`:
//   - El `id` es BigInt -> hay que convertirlo a String, porque JSON (y por
//     tanto GraphQL) NO sabe serializar BigInt y lanzaría un error.
//   - Las fechas son Date -> las pasamos a String ISO.
//
// Esta "limpieza" es lógica de negocio/presentación, por eso vive en el
// servicio y no en el modelo ni en el resolver.
// ============================================================================

import type { AppContext } from "../../graphql/context.js";
import { UserModel, type CreateUserData } from "./user.model.js";

// Tipo "crudo" que devuelve Prisma para un usuario.
type RawUser = Awaited<ReturnType<typeof UserModel.create>>;

// Función auxiliar: convierte un usuario de la BD al formato que espera GraphQL.
function toGraphQLUser(user: RawUser) {
  return {
    ...user,
    id: user.id.toString(), // BigInt -> String
    created_at: user.created_at?.toISOString(), // Date -> String ISO
    updated_at: user.updated_at?.toISOString(),
  };
}

export const UserService = {
  // Lista de usuarios ya transformados para GraphQL.
  async getUsers(prisma: AppContext["prisma"]) {
    const users = await UserModel.findAll(prisma);
    return users.map(toGraphQLUser);
  },

  // Crear usuario y devolverlo en formato GraphQL.
  async createUser(prisma: AppContext["prisma"], data: CreateUserData) {
    // Aquí, en una app real, encriptarías la contraseña antes de guardarla
    // (por ejemplo con bcrypt). Esa sería una típica regla de negocio.
    const newUser = await UserModel.create(prisma, data);
    return toGraphQLUser(newUser);
  },
};
