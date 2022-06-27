import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator, Text, StyleSheet, View, FlatList, Button, Switch, LayoutAnimation, Platform, Alert } from 'react-native';
import { ListUsersDocument, useDeleteUserMutation, useListUsersQuery, User, useSendPasswordResetLinkMutation} from '../../../generated/graphql';
import { useAuth } from '../../../hooks/auth-context';
import FormattedDateComponent from '../../FormattedDate/FormattedDate';
import DefaultPaddingComponent from '../../shared/DefaultPaddingComponent';
import NblocksButton from '../../shared/NblocksButton';
import SafeFullNameComponent from '../SafeFullNameComponent/SafeFullNameComponent';
import AddUserModalComponent from './AddUserModalComponent';
import EditUserModalComponent from './EditUserModalComponent';

const UserListComponent:FunctionComponent = () => {

  const { data, loading, error, refetch } = useListUsersQuery();
  const [editUser, setEditUser ] = useState<User>();
  const [addUserModalVisible, setAddUserModalVisible ] = useState<boolean>(false);
  const [deleteUserMutation,{ data: deleteData, loading: deleteLoading, error: deleteError}] = useDeleteUserMutation({refetchQueries: [{query: ListUsersDocument}]});
    
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

  const ensureDeleteUser = (user: User) => {
    if (Platform.OS !== 'web') {
        Alert.alert(
            "Delete user",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                { text: "Delete", onPress: () => deleteUser(user) }
            ]
        );
    } else {
        deleteUser(user);
    }
    
}

const deleteUser = (user: User) => {
    deleteUserMutation({variables: {userId: user!.id}});
}
  
  return (
    
    <View style={styles.container}>
      <DefaultPaddingComponent style={{flex: 1}}>
        <View style={{flex: 11}}>
          <FlatList
            refreshing={loading || deleteLoading}
            onRefresh={() => refetch({})}
            data={data?.listUsers}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <UserItemComponent user={item} onEditUserClick={showEditUserModal} onDeleteUserClick={(user) => ensureDeleteUser(user)}></UserItemComponent>}
            ItemSeparatorComponent={renderSeparator}
          >
          </FlatList> 
        </View>
        <View style={{flex: 1}}>
          <NblocksButton type='primary' title='Invite users' onPress={() => showAddUserModal()}></NblocksButton>
        </View>
      </DefaultPaddingComponent>
      <EditUserModalComponent 
        user={editUser}
        visible={editUser ? true : false} 
        onCloseModal={() => didCloseEditUserModal()}
        />
      <AddUserModalComponent 
        visible={addUserModalVisible} 
        onCloseModal={didCloseAddUserModal}
        />
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

const UserItemComponent:FunctionComponent<{user:User, onEditUserClick: (user: User) => void; onDeleteUserClick: (user: User) => void;}> = ({user, onEditUserClick, onDeleteUserClick}) => {
  
  const {currentUser} = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [sendPasswordResetLinkMutation, { data: sendPasswordResetLinkData, loading: sendPasswordResetLinkLoading, error: sendPasswordResetLinkError }] = useSendPasswordResetLinkMutation();

  const ensureSendPasswordResetLink = () => {
    if (Platform.OS !== 'web') {
        Alert.alert(
            "Resend invite",
            "Are you sure you want to resend an invitation link?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                { text: "Delete", onPress: () => sendPasswordResetLink() }
            ]
        );
    } else {
      sendPasswordResetLink();
    }
  }

  const sendPasswordResetLink = () => {
    sendPasswordResetLinkMutation({variables: {userId: user.id}});
  }

  const toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }
  return (
    <View>
      <Text style={styles.userItem} onPress={() => toggleExpand()}>
        <SafeFullNameComponent fullName={user.fullName?.toString()} />
        {currentUser.isSameUser(user) && (<Text>(You)</Text>)}
        <Text>
          {expanded ? "▼" : "◀︎"}
        </Text>
        
      </Text>
      {
        expanded ? (
          <View>
            

            <View style={{flexDirection: 'row'}}>
                <View style={{ flex: 1, padding: 10 }}>
                  <Text>
                    {user.username} ({user.role}) 
                  </Text>
                  <Text>
                    Added: <FormattedDateComponent date={user.createdAt!} length="short"/>
                  </Text>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                  <NblocksButton type="primary" title='Edit' onPress={() => onEditUserClick(user)}></NblocksButton>
                  <NblocksButton title="Resend invite" onPress={() => ensureSendPasswordResetLink()}></NblocksButton>
                  <NblocksButton title="Delete" type="danger" onPress={() => onDeleteUserClick(user)}></NblocksButton>
                </View>
            </View>

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
