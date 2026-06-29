// ============================================================================
// GRAPHQL · SCHEMA  (Ensamblador del esquema completo)
// ----------------------------------------------------------------------------
// Este archivo une las "piezas" de todos los módulos en un único esquema:
//   - typeDefs:  todos los fragmentos de esquema (rutas) juntos.
//   - resolvers: todos los controladores combinados.
//
// Así, cuando creas un módulo nuevo (ej: "order"), solo tienes que añadirlo
// aquí en dos sitios y el resto de la app ni se entera.
// ============================================================================

import { productTypeDefs } from "../modules/product/product.typeDefs.js";
import { productResolvers } from "../modules/product/product.resolver.js";
import { userTypeDefs } from "../modules/user/user.typeDefs.js";
import { userResolvers } from "../modules/user/user.resolver.js";

// Tipos base "vacíos". Cada módulo hace `extend type Query/Mutation` sobre
// estos. GraphQL necesita que Query y Mutation existan al menos una vez con
// un campo, por eso definimos un `_empty` de relleno.
const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// Array de typeDefs: Apollo acepta varios fragmentos y los fusiona.
export const typeDefs = [baseTypeDefs, productTypeDefs, userTypeDefs];

// Combinamos los resolvers de cada módulo en un único objeto.
// (Como cada módulo usa claves distintas dentro de Query/Mutation, no chocan).
export const resolvers = {
  Query: {
    ...productResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...productResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
