// ============================================================================
// PRODUCT · RESOLVER  (Controlador)
// ----------------------------------------------------------------------------
// El RESOLVER es el equivalente al CONTROLADOR en MVC. Es el punto de entrada
// de cada operación GraphQL: recibe la petición (parent, args, context),
// extrae los argumentos y se los entrega al SERVICIO.
//
// Regla de oro: el resolver debe ser "delgado". No mete lógica de negocio ni
// queries: solo orquesta. Cuanto menos código tenga, mejor.
// ============================================================================

import type { AppContext } from "../../graphql/context.js";
import { ProductService } from "./product.service.js";

export const productResolvers = {
  Query: {
    // products(search: String): [Product!]!
    products: (
      _parent: unknown,
      args: { search?: string },
      ctx: AppContext, // <- el context inyectado, trae `prisma`
    ) => {
      return ProductService.getProducts(ctx.prisma, args.search);
    },
  },

  Mutation: {
    // createProduct(title, price, description): Product!
    createProduct: (
      _parent: unknown,
      args: { title: string; price: number; description: string },
      ctx: AppContext,
    ) => {
      return ProductService.createProduct(ctx.prisma, args);
    },
  },
};
