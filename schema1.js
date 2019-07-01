// static without json-server

const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: '23', firsName: 'olex', age: 24 },
  { id: "45", firsName: 'bac', age: 55 }
]

const UseType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firsName: { type:  GraphQLString },
    age: { type:  GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UseType,
      args: { id: { type: GraphQLString } },
      resolve(parenValue, args) {
        // request to const users
        return _.find(users, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery
})