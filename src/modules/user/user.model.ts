// ============================================================================
// USER · MODEL  (Modelo / Capa de acceso a datos)
// ----------------------------------------------------------------------------
// Igual que ProductModel: solo habla con la base de datos vía Prisma.
// Devuelve los registros "crudos" tal cual vienen de Postgres (con id BigInt,
// fechas como Date, etc.). La transformación a tipos de GraphQL se hace en el
// SERVICIO, no aquí.
// ============================================================================

import type { AppContext } from "../../graphql/context.js";

export interface CreateUserData {
  nombre: string;
  email: string;
  password: string;
}

export const UserModel = {
  // Todos los usuarios.
  findAll(prisma: AppContext["prisma"]) {
    return prisma.users.findMany();
  },

  // Crear un usuario.
  create(prisma: AppContext["prisma"], data: CreateUserData) {
    return prisma.users.create({ data });
  },
};
