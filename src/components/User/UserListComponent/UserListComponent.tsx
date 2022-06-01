import React from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { useListUsersQuery } from '../../../generated/graphql';

const UserListComponent = () => {

  const { data, loading } = useListUsersQuery();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#32B768" size="large" />
      </View>
    );
  }
  
  return (
    <Text>{JSON.stringify(data?.listUsers)}</Text>
  );
}

export default UserListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
