import { Picker } from "@react-native-picker/picker";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useListUserRolesQuery, User, useUpdateUserMutation } from "../../../generated/graphql";
import {NblocksModalComponent} from "../../shared/NblocksModalComponent";
import {SubmitCancelButtonsComponent} from "../../shared/SubmitCancelButtonsComponent";
import {TitleComponent} from "../../shared/TitleComponent";

const EditUserModalComponent:FunctionComponent<{
    user?:User;
    visible: boolean;
    onCloseModal: () => void;
}> = ({user, visible, onCloseModal}) => {

    const [selectedRole, setSelectedRole] = useState<string>("");
    
    const { data: listUserRolesData, loading: listUserRolesLoading, error } = useListUserRolesQuery();
    const [updateUserMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setSelectedRole(user!.role!);
        }
    }, [user])

    const updateUser = () => {
        updateUserMutation({variables: {user: {id: user!.id, role: selectedRole}}});
        onCloseModal();
    }

    if (updateLoading || listUserRolesLoading) {
        return (
          <View>
            <ActivityIndicator color="#32B768" size="large" />
          </View>
        );
    }

    return (
        <NblocksModalComponent mode='half' swipable={false} visible={visible} onCloseModal={() => onCloseModal()} >
            <View style={{flex: 1, alignContent: 'stretch'}}>
                <TitleComponent>Change role</TitleComponent>
                <Picker
                    style={{flex: 1}}
                    selectedValue={selectedRole}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedRole(itemValue)
                    }>
                    {listUserRolesData?.listUserRoles.map(role => (<Picker.Item key={role} label={role} value={role} />))}
                </Picker>

                <View>
                    <SubmitCancelButtonsComponent
                        submitText="Save" 
                        cancelText="Cancel" 
                        submitDisabled={selectedRole === user?.role}
                        onSubmit={() => updateUser()} 
                        onCancel={() => onCloseModal()}
                    >
                    </SubmitCancelButtonsComponent>
                </View>
            </View>
        </NblocksModalComponent>
    )
}

export  {EditUserModalComponent};
  