import { print } from 'graphql'
import path from 'path'
import fs from 'fs'

import { typeDefs } from '.'

const printedTypeDefs = print(typeDefs)

fs.writeFileSync(
  path.join(__dirname, '../schema/fullSchema.graphql'),
  printedTypeDefs
)

const stringOutput = fs.readFileSync(
  path.join(__dirname, '../schema/fullSchema.graphql'),
  'utf8'
)

const schema = `export default \`
${stringOutput}\`
`

fs.writeFileSync(path.join(__dirname, '../schema/fullSchema.ts'), schema)
