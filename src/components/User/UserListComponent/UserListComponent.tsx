import React, { FunctionComponent, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Switch } from 'react-native';
import { ListUsersDocument, useDeleteUserMutation, useListUsersQuery, User, useSendPasswordResetLinkMutation, useUpdateUserMutation} from '../../../generated/graphql';
import { useAuth } from '../../../hooks/auth-context';
import { useTheme } from '../../../hooks/theme-context';
import { DialogueService } from '../../../utils/AlertService';
import { FormattedDateComponent} from '../../FormattedDate/FormattedDate';
import {DividerComponent} from '../../shared/DividerComponent';
import {NblocksButton} from '../../shared/NblocksButton';
import {SafeFullNameComponent} from '../SafeFullNameComponent/SafeFullNameComponent';
import {AddUserModalComponent} from './AddUserModalComponent';
import {EditUserModalComponent} from './EditUserModalComponent';

const UserListComponent:FunctionComponent = () => {

  const { data, loading, error, refetch } = useListUsersQuery();
  const [editUser, setEditUser ] = useState<User>();
  const [addUserModalVisible, setAddUserModalVisible ] = useState<boolean>(false);
  const [deleteUserMutation,{ data: deleteData, loading: deleteLoading, error: deleteError}] = useDeleteUserMutation({refetchQueries: [{query: ListUsersDocument}]});

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
    DialogueService.showConfirmation("Delete user", "Are you sure you want to delete this user?", "Delete", () => deleteUser(user));
  }

  const deleteUser = (user: User) => {
      deleteUserMutation({variables: {userId: user!.id}});
  }

  const renderUserItem = (user: User) => {
    return (
      <UserItemComponent user={user} onEditUserClick={(user) => showEditUserModal(user)} onDeleteUserClick={(user) => ensureDeleteUser(user)}></UserItemComponent>
    )
  }
  
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 11}}>
        <FlatList
          refreshing={loading || deleteLoading}
          onRefresh={() => refetch({})} 
          data={data?.listUsers}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => renderUserItem(item) }
          ItemSeparatorComponent={() => <DividerComponent/>} 
        >
        </FlatList> 
      </View>
      <View style={{flex: 1}}>
        <NblocksButton type='primary' title='Invite users' onPress={() => showAddUserModal()}></NblocksButton>
      </View>
      <EditUserModalComponent 
      user={editUser}
      visible={editUser ? true : false} 
      onCloseModal={() => didCloseEditUserModal()}
      />
      <AddUserModalComponent 
        visible={addUserModalVisible} 
        onCloseModal={() => didCloseAddUserModal()}
      />
    </View>
  );
}

const UserItemComponent:FunctionComponent<{user:User, onEditUserClick: (user: User) => void, onDeleteUserClick: (user: User) => void}> = ({user, onEditUserClick, onDeleteUserClick}) => {
  
  const {styles} = useTheme();
  const {currentUser} = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [sendPasswordResetLinkMutation, { data: sendPasswordResetLinkData, loading: sendPasswordResetLinkLoading, error: sendPasswordResetLinkError }] = useSendPasswordResetLinkMutation();
  const [updateUserMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateUserMutation();
  
  const ensureSendPasswordResetLink = () => {
    DialogueService.showConfirmation("Resend invite", "Are you sure you want to resend an invitation link?", "Invite", () => sendPasswordResetLink());
  }

  const sendPasswordResetLink = () => {
    sendPasswordResetLinkMutation({variables: {userId: user.id}});
  }

  const updateUser = (enabled: boolean) => {
    updateUserMutation({variables: {user: {id: user!.id, enabled: enabled}}});
  }

  const toggleExpand=()=>{
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  const renderExpanedContent = (user: User) => {
    return (
      <View>
          <View>
            <Text>
              Email: {user.username}
            </Text>
            <Text>
              Added: <FormattedDateComponent date={user.createdAt!} length="short"/>
            </Text>
            <View style={{flexDirection: 'row', alignContent: 'space-between', alignItems: 'center'}}>
              <Text style={{flex: 1}}>
                Active:
              </Text>
              <Switch disabled={currentUser.isSameUser(user)} value={user.enabled!} onValueChange={(newVal) => updateUser(newVal)}></Switch>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <NblocksButton title="Resend invite" onPress={() => ensureSendPasswordResetLink()}></NblocksButton>
            <NblocksButton type="primary" title='Change role' disabled={currentUser.isSameUser(user)} onPress={() => onEditUserClick(user)}></NblocksButton>
            <NblocksButton title="Delete" type="danger" disabled={currentUser.isSameUser(user)} onPress={() => onDeleteUserClick(user)}></NblocksButton>
          </View>
      </View>
    )
  }

  return (
    <View>
      <TouchableOpacity onPress={() => toggleExpand()}>
        <View style={{height: 50, flexDirection: 'row', alignContent: 'space-between', alignItems: "center"}}>
          <View style={{flex: 10}}>
            <SafeFullNameComponent style={styles.subTitle} fullName={user.fullName?.toString()} />
            <Text>{user.role}</Text>
          </View>
          <View>
            <Text>
              {expanded ? "▼" : "◀︎"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {
        expanded && renderExpanedContent(user)
      }
    </View>
  )
}

export {UserListComponent};
