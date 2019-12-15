const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');

import 'dotenv/config';

const schema = gql`
type Book {
    title: String
    author: Author
  }

  type Author {
    books: [Book]
  }

  type Query {
    author: Author
  }
}`

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling'
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton'
    }
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const resolvers = {
    Query: {
        author(parent, args, context, info) {
            return find(authors, { id: args.id });
        },
    },
    Author: {
        books(author) {
            return filter(books, { author: author.name });
        },
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});