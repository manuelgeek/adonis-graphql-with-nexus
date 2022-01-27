import { makeSchema } from 'nexus'
import * as types from '../../graphql'
import { join } from 'path'
import { validatePlugin } from 'nexus-validate'

export const schema = makeSchema({
  // GraphQL types that will be used to construct your GraphQL schema.
  types,
  outputs: {
    // Output path to where nexus should write the generated TypeScript definition types derived from your schema. This is mandatory to benefit from Nexus' type-safety.
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    // Output path to where nexus should write the SDL (schema definition language) version of your GraphQL schema.
    schema: join(__dirname, '..', 'schema.GraphQL'),
  },
  contextType: {
    // Path to the module where the context type is exported
    module: join(__dirname, 'context.ts'),
    // Name of the export in that module
    export: 'Context',
  },
  plugins: [validatePlugin()],
})
