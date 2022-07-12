import express from 'express'

const PORT = 4000

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

// const graphqlOptions: GraphqlOptions = {}

// app.use('/graphql', graphqlHTTP(graphqlOptions))

app.listen(PORT, () => {
  console.log(`Now listenging on post ${PORT}`)
})
