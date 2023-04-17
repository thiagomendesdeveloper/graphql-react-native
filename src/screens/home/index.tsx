import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import client from '../../lib/apollo';

interface Repository {
  id: string;
  name: string;
  description: string;
}

interface Data {
  viewer: {
    repositories: {
      nodes: Repository[];
    };
  };
}

const GET_MOVIES = gql`
  query {
    viewer {
      repositories(first: 20) {
        nodes {
          id
          name
          description
        }
      }
    }
  }
`;

export default function Home() {
  const {data} = useQuery<Data>(GET_MOVIES, {
    client,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Repositorios</Text>
      </View>
      <FlatList
        data={data?.viewer.repositories.nodes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text>{item.id}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  container: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
  },
  name: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
  },
});
