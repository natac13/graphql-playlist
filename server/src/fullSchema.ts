export default `
type Book {
  title: String
}

type Query {
  book(id: ID!): Book
}

schema {
  query: Query
}
`
