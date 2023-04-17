import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer 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`,
  },
});

export default client;
