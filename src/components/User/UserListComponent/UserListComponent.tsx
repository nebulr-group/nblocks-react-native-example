import React, { FunctionComponent, useEffect, useState } from 'react';
import { ActivityIndicator, Text, StyleSheet, View, FlatList, Button, Switch } from 'react-native';
import { useListUsersQuery, User, useUpdateUserMutation, ListUsersDocument, useDeleteUserMutation, useCreateUsersMutation, UserInput } from '../../../generated/graphql';
import SafeFullNameComponent from '../SafeFullNameComponent/SafeFullNameComponent';

const UserListComponent:FunctionComponent = () => {

  const { data, loading, error } = useListUsersQuery();

  const [createUserMutation] = useCreateUsersMutation({refetchQueries: [{query: ListUsersDocument}]});

  const createUser = (userNames: string[]) => {
    createUserMutation({variables: {userNames: userNames}})
  }
    
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#32B768" size="large" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.listUsers}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <UserItemComponent user={item}></UserItemComponent>}
        >
      </FlatList>
      <Button title='Add user' onPress={() => createUser(['o.soderlund@gmail.com'])}></Button>
    </View>
  );
}

const UserItemComponent:FunctionComponent<{user:User}> = ({user}) => {
  const [expanded, setExpanded] = useState(false);

  const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation({refetchQueries: [{query: ListUsersDocument}]});

  const toggleEnabled = (value: boolean) => {
   updateUserMutation({variables: {user: {...userToUserInput(user), ...{enabled: value}}}}) 
  }

  const deleteUser = () => {
    deleteUserMutation({variables: {userId: user.id}}); 
  }

  return (
    <View>
      <Text style={styles.userItem} onPress={() => setExpanded(!expanded)}>
        <SafeFullNameComponent fullName={user.fullName?.toString()} /> - {user.username} ({user.role})
      </Text>
      {
        expanded ? (
          <View>
            <Button onPress={() => deleteUser()} title='Delete'></Button>
            <Text>
              Enabled
              <Switch value={user.enabled ? true : false} onValueChange={(newVal) => toggleEnabled(newVal)}></Switch>
            </Text>
            <Text>
              Role
              <Switch value={user.enabled ? true : false} onValueChange={(newVal) => toggleEnabled(newVal)}></Switch>
            </Text>
          </View>
        ) : (null)
      }
    </View>
  )
}

export default UserListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  userItem: {
    minHeight: 50,
    fontSize: 28
  },
});

const userToUserInput = (user: User): UserInput => {
  return {id: user.id, role: user.role, enabled: user.enabled};
}
