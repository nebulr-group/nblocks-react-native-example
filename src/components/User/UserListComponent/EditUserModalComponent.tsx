import React, { FunctionComponent, useState } from "react";
import { Modal, Text, StyleSheet, View, Button, Switch, TextInput, ActivityIndicator } from "react-native";
import { ListUsersDocument, useDeleteUserMutation, User, UserInput, useUpdateUserMutation } from "../../../generated/graphql";
import SafeFullNameComponent from "../SafeFullNameComponent/SafeFullNameComponent";

const EditUserModalComponent:FunctionComponent<{
    user?:User, 
    visible: boolean, 
    onCloseModal: () => void
}> = ({user, visible, onCloseModal}) => {

    if (!user)
        return(null);

    const [enabled, setEnabled] = useState(user.enabled ? true : false);
    const [role, setRole] = useState<string>(user.role!);

    const [updateUserMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateUserMutation();
    const [deleteUserMutation,{ data: deleteData, loading: deleteLoading, error: deleteError}] = useDeleteUserMutation({refetchQueries: [{query: ListUsersDocument}]});

    const updateUser = () => {
        updateUserMutation({variables: {user: {...userToUserInput(user), ...{enabled, role}}}});
        onCloseModal();
    }

    const deleteUser = () => {
        deleteUserMutation({variables: {userId: user!.id}});
        onCloseModal();
    }

    if (updateLoading || deleteLoading) {
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
                    <TextInput
                    value={role}
                    onChangeText={(text) => {
                        setRole(text)
                    }}
                />
                </Text>
                
                <Button onPress={() => deleteUser()} title='Delete'></Button>

                <Button title="Save" onPress={() => updateUser()}></Button>
                <Button title="Cancel" onPress={() => onCloseModal()}></Button>
            </View>
        </Modal>
    )
}

export default EditUserModalComponent;

const userToUserInput = (user: User): UserInput => {
    return {id: user.id, role: user.role, enabled: user.enabled};
  }
  
const styles = StyleSheet.create({
    container: {
        marginTop: 300,
      height: 50,
      backgroundColor: '#FFFFFF',
    },
  });