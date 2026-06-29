// ============================================================================
// GRAPHQL · CONTEXT
// ----------------------------------------------------------------------------
// El "context" es un objeto que Apollo construye en CADA petición y le pasa a
// TODOS los resolvers como tercer argumento.
//
// Aquí metemos las dependencias compartidas (de momento, la instancia de
// Prisma). Así los resolvers/servicios no importan Prisma directamente, sino
// que lo reciben por el contexto. Esto facilita los tests y mantiene el
// código desacoplado.
// ============================================================================

import { prisma } from "../config/prisma.js";

// Tipo del contexto: describe qué hay disponible dentro de cada resolver.
export interface AppContext {
  prisma: typeof prisma;dd
}

// Función que Apollo ejecuta en cada request para crear el contexto.
// (Aquí podrías, por ejemplo, leer el token del usuario desde los headers
//  y añadir `currentUser` al contexto).
export async function createContext(): Promise<AppContext> {
  return { prisma };
}
