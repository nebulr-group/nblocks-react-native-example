import React, { FunctionComponent, useEffect, useState } from 'react';
import { ActivityIndicator, Text, StyleSheet, View, FlatList, Button, Switch, LayoutAnimation } from 'react-native';
import { useListUsersQuery, User, useUpdateUserMutation, ListUsersDocument, useDeleteUserMutation, useCreateUsersMutation, UserInput } from '../../../generated/graphql';
import SafeFullNameComponent from '../SafeFullNameComponent/SafeFullNameComponent';
import AddUserModalComponent from './AddUserModalComponent';
import EditUserModalComponent from './EditUserModalComponent';

const UserListComponent:FunctionComponent = () => {

  const { data, loading, error } = useListUsersQuery();
  const [editUser, setEditUser ] = useState<User>();
  const [addUserModalVisible, setAddUserModalVisible ] = useState<boolean>(false);
    
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#32B768" size="large" />
      </View>
    );
  }

  const showEditUserModal = (user?: User) => {
    setEditUser(user);
  }

  const didCloseEditUserModal = () => {
    setEditUser(undefined);
  }
  
  const showAddUserModal = () => {
    setAddUserModalVisible(true);
  }

  const didCloseAddUserModal = () => {
    setAddUserModalVisible(false);
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.listUsers}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <UserItemComponent user={item} onEditUserClick={showEditUserModal}></UserItemComponent>}
        ItemSeparatorComponent={renderSeparator}
        >
      </FlatList>
      <Button title='Add user' onPress={() => showAddUserModal()}></Button>
      <EditUserModalComponent 
        user={editUser}
        visible={editUser ? true : false} 
        onCloseModal={didCloseEditUserModal}
        />
        <AddUserModalComponent visible={addUserModalVisible} onCloseModal={didCloseAddUserModal}/>
    </View>
  );
}

const renderSeparator = () => (
  <View
    style={{
      backgroundColor: 'black',
      height: 0.5,
    }}
  />
);

const UserItemComponent:FunctionComponent<{user:User, onEditUserClick: (user: User) => void;}> = ({user, onEditUserClick}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }
  return (
    <View>
      <Text style={styles.userItem} onPress={() => toggleExpand()}>
        <SafeFullNameComponent fullName={user.fullName?.toString()} />
        <Text>
          {expanded ? "▼" : "◀︎"}
        </Text>
        
      </Text>
      {
        expanded ? (
          <View>
            <Text>{user.username} ({user.role})</Text>
            <Button title='Edit' onPress={() => onEditUserClick(user)}></Button>
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
    padding: 10,
    height: 50,
    fontSize: 28
  },
});
