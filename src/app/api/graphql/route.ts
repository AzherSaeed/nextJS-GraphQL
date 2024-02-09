import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from "next/server";
import clientPromise from '@/app/mongoClient';

const resolvers = {
    Query: {
        books: async () => {
            try {
                const client = await clientPromise;
                const database = client.db('gql');
                const collection = database.collection('books');
                const books = await collection.find({}).toArray()
                return books;
            } catch (error) {
                throw new Error('Failed to fetch books');
            }
        },

    },
    Mutation: {
        createBook: async (_: any, { title, author }: { title: string, author: string }) => {
            try {
                const client = await clientPromise
                const database = client.db('gql');
                const collection = database.collection('books');
                const book = await collection.insertOne({ title, author });
                console.log(book);
                return { _id: book.insertedId, title, author };
            } catch (error) {
                throw new Error('Failed to create book');
            }
        },

    },
};

const typeDefs = gql`
type Book {
    _id: String!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String!, author: String!): Book
  }
  `;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };