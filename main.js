const { ApolloServer } = require('apollo-server')
const typeDefs = require('./types')
const resolvers = require('./resolvers')

const PORT = process.env.PORT || 3010

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  introspection: true,
  playground: true,
  engine: true,
  context: {}
})

server.listen(PORT).then(() => {
  console.log('\x1b[32m%s\x1b[0m',`🚀  Server ready at ${PORT}`)
})