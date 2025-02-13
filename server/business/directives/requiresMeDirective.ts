import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { GraphQLError, GraphQLSchema } from "graphql";

export function applyMeDirective(schema: GraphQLSchema): GraphQLSchema {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: fieldConfig => {
        const requireMe = getDirective(schema, fieldConfig, "requireMe")?.[0];
        if (requireMe) {
          const { resolve } = fieldConfig;
          return {
            ...fieldConfig,
            resolve: async (source, args, context, info) => {
              const result = await resolve?.(source, args, context, info);
              if(!context.me) {
                  throw new GraphQLError("You need to be authenticated to perform this action", {
                      extensions: {
                          code: "FORBIDDEN"
                      }
                  });
              }
              return result;
            }
          }
        }
      }
  })
}