// with json-server

const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

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
        // request to db.json
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data); // { data: {firstName: 'fjksa'}}
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery
})