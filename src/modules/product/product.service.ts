// ============================================================================
// PRODUCT · SERVICE  (Servicio / Lógica de negocio)
// ----------------------------------------------------------------------------
// El SERVICIO es el "cerebro" del módulo. Aquí van las reglas de negocio:
// validaciones, transformaciones, cálculos, llamadas a varios modelos, etc.
//
// El servicio NO sabe nada de GraphQL (no conoce resolvers ni argumentos de
// la query) y tampoco escribe queries de Prisma a mano: para eso llama al
// MODELO. Así, si mañana cambias de base de datos, solo tocas el modelo.
// ============================================================================

import type { AppContext } from "../../graphql/context.js";
import { ProductModel, type CreateProductData } from "./product.model.js";

export const ProductService = {
  // Lista de productos (con búsqueda opcional).
  getProducts(prisma: AppContext["prisma"], search?: string) {
    // Aquí podrías añadir lógica: paginación, permisos, filtros extra...
    return ProductModel.findAll(prisma, search);
  },

  // Crear un producto, validando antes las reglas de negocio.
  createProduct(prisma: AppContext["prisma"], data: CreateProductData) {
    // Ejemplo de regla de negocio: el precio no puede ser negativo.
    if (data.price < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    return ProductModel.create(prisma, data);
  },
};
