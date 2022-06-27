import { Picker } from "@react-native-picker/picker";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, StyleSheet, View, Button, Switch, ActivityIndicator, Alert, Platform } from "react-native";
import { ListUsersDocument, useDeleteUserMutation, useListUserRolesQuery, User, UserInput, useUpdateUserMutation } from "../../../generated/graphql";
import NblocksButton from "../../shared/NblocksButton";
import NblocksModalComponent from "../../shared/NblocksModalComponent";
import SubmitCancelButtonsComponent from "../../shared/SubmitCancelButtonsComponent";
import SafeFullNameComponent from "../SafeFullNameComponent/SafeFullNameComponent";

const EditUserModalComponent:FunctionComponent<{
    user?:User, 
    visible: boolean, 
    onCloseModal: () => void
}> = ({user, visible, onCloseModal}) => {

    const [enabled, setEnabled] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>("");
    
    const { data: listUserRolesData, loading: listUserRolesLoading, error } = useListUserRolesQuery();
    const [updateUserMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setEnabled(user!.enabled!);
            setSelectedRole(user!.role!);
        }
    }, [user])

    const updateUser = () => {
        updateUserMutation({variables: {user: userToUserInput(user!)}});
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

    if (updateLoading || listUserRolesLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator color="#32B768" size="large" />
          </View>
        );
    }

    return (
        <NblocksModalComponent mode='half' swipable={false} visible={visible} onCloseModal={() => onCloseModal()} >
            {user &&
                <View style={styles.container}>
                <Text>
                    Edit {user.email}
                </Text>
                <SafeFullNameComponent fullName={user!.fullName!}/> 
                <Text>
                    Enabled:
                    <Switch value={enabled} onValueChange={(newVal) => setEnabled(newVal)}></Switch>
                </Text>
                <Text>
                    Role: 
                </Text>
                <Picker
                    selectedValue={selectedRole}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedRole(itemValue)
                    }>
                    {listUserRolesData?.listUserRoles.map(role => (<Picker.Item key={role} label={role} value={role} />))}
                </Picker>

                <SubmitCancelButtonsComponent 
                    submitText="Save" 
                    cancelText="Cancel" 
                    onSubmit={() => updateUser()} 
                    onCancel={() => onCloseModal()}>
                </SubmitCancelButtonsComponent>

            </View>
            }
        </NblocksModalComponent>
    )
}

export default EditUserModalComponent;
  
const styles = StyleSheet.create({
    container: {
    },
  });