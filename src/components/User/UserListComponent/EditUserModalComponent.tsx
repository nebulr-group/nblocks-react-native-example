import React, { FunctionComponent, useState } from "react";
import { Modal, Text, StyleSheet, View, Button, Switch, TextInput, ActivityIndicator, Alert, Platform } from "react-native";
import { ListUsersDocument, useDeleteUserMutation, useListUserRolesQuery, User, UserInput, useSendPasswordResetLinkMutation, useUpdateUserMutation } from "../../../generated/graphql";
import SafeFullNameComponent from "../SafeFullNameComponent/SafeFullNameComponent";

const EditUserModalComponent:FunctionComponent<{
    user?:User, 
    visible: boolean, 
    onCloseModal: () => void
}> = ({user, visible, onCloseModal}) => {

    if (!user)
        return(null);

    const [enabled, setEnabled] = useState(user.enabled ? true : false);
    const [selectedRole, setSelectedRole] = useState<string>(user.role!);
    
    const { data: listUserRolesData, loading: listUserRolesLoading, error } = useListUserRolesQuery();
    const [updateUserMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateUserMutation();
    const [sendPasswordResetLinkMutation, { data: sendPasswordResetLinkData, loading: sendPasswordResetLinkLoading, error: sendPasswordResetLinkError }] = useSendPasswordResetLinkMutation();
    const [deleteUserMutation,{ data: deleteData, loading: deleteLoading, error: deleteError}] = useDeleteUserMutation({refetchQueries: [{query: ListUsersDocument}]});

    const updateUser = () => {
        updateUserMutation({variables: {user: userToUserInput(user)}});
        onCloseModal();
    }

    const sendPasswordResetLink = () => {
        sendPasswordResetLinkMutation({variables: {userId: user.id}});
        onCloseModal();
    }

    const ensureDeleteUser = () => {
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
                    { text: "Delete", onPress: () => deleteUser() }
                ]
            );
        } else {
            deleteUser();
        }
        
    }

    const deleteUser = () => {
        deleteUserMutation({variables: {userId: user!.id}});
        onCloseModal();
    }

    const userToUserInput = (user: User): UserInput => {
        const obj:UserInput = {id: user.id};
        if (user.role !== selectedRole)
            obj.role = selectedRole;
        if (user.enabled !== enabled)
            obj.enabled = enabled;

        return obj;
    }

    if (updateLoading || deleteLoading || sendPasswordResetLinkLoading || listUserRolesLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator color="#32B768" size="large" />
          </View>
        );
    }

    return (
        <Modal 
        visible={visible}
        animationType="slide" 
        // transparent={true}
        >
            <View style={styles.container}>
                <Text>
                    Edit
                </Text>
                <SafeFullNameComponent fullName={user!.fullName!}/> 
                <Text>
                    Enabled:
                    <Switch value={enabled} onValueChange={(newVal) => setEnabled(newVal)}></Switch>
                </Text>
                <Text>
                    Role: 
                </Text>
                
                <Button title="Save" onPress={() => updateUser()}></Button>
                <Button title="Cancel" onPress={() => onCloseModal()}></Button>
                <Button onPress={() => ensureDeleteUser()} title='Delete'></Button>

            </View>
        </Modal>
    )
}

export default EditUserModalComponent;
  
const styles = StyleSheet.create({
    container: {
        marginTop: 300,
      height: 50,
      backgroundColor: '#FFFFFF',
    },
  });