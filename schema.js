const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: 23, firsName: 'olex'},
  { id: 45, firsName: 'bac'}
]

const UseType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
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
        return _.find(users, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery
})