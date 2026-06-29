// ============================================================================
// CONFIG · PRISMA
// ----------------------------------------------------------------------------
// Aquí centralizamos la conexión a la base de datos (Supabase/Postgres).
// La idea es crear UNA sola instancia de PrismaClient en toda la aplicación
// (patrón "singleton") y exportarla para que cualquier MODELO la reutilice.
//
// Si crearas un `new PrismaClient()` en cada archivo, abrirías muchas
// conexiones a la base de datos y acabarías agotando el pool. Por eso se
// instancia una única vez aquí.
// ============================================================================

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// OJO con la ruta: este archivo vive en src/config/, así que para llegar a
// la carpeta "generated" (que está en la raíz) subimos dos niveles (../../).
import { PrismaClient } from "../../generated/prisma/client.js";

// 1. Pool de conexiones de Postgres usando la URL directa de Supabase (.env)
const pool = new Pool({ connectionString: process.env.DIRECT_URL });

// 2. Adaptador que conecta ese pool de "pg" con Prisma
const adapter = new PrismaPg(pool);

// 3. Cliente de Prisma ya configurado: este es el objeto que usaremos para
//    hacer queries (prisma.products.findMany(), prisma.users.create(), etc.)
export const prisma = new PrismaClient({ adapter });
