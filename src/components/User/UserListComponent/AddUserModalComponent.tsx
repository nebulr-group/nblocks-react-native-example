import React, { FunctionComponent, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { ListUsersDocument, useCreateUsersMutation } from "../../../generated/graphql";
import {ChipComponent} from "../../shared/ChipComponent";
import {TextInputComponent} from "../../shared/InputComponent";
import {NblocksModalComponent} from "../../shared/NblocksModalComponent";
import {SubmitCancelButtonsComponent} from "../../shared/SubmitCancelButtonsComponent";
import {SubTitleComponent} from "../../shared/SubTitleComponent";
import {TitleComponent} from "../../shared/TitleComponent";

const AddUserModalComponent:FunctionComponent<{
    visible: boolean, 
    onCloseModal: () => void
}> = ({visible, onCloseModal}) => {

    const [username, setUsername] = useState("");
    const [usernames, setUsernames] = useState<string[]>([]);
    const [createUserMutation, {loading}] = useCreateUsersMutation({refetchQueries: [{query: ListUsersDocument}]});

    const createUsers = () => {
        if (username != "")
            addUsername();
        createUserMutation({variables: {userNames: usernames}});
        resetAndCloseModal();
    }

    const addUsername = () => {
        if (username.trim().length > 0 && !usernames.includes(username)) {
            setUsernames([username, ...usernames]);
        }
        setUsername("");
    }

    const removeUsername = (username: string) => {
        setUsernames(usernames.filter((name) => name !== username));
    }

    const resetAndCloseModal = () => {
        setUsername("");
        setUsernames([]);
        onCloseModal();
    }

    if (loading) {
        return (
          <View>
            <ActivityIndicator color="#32B768" size="large" />
          </View>
        );
    }

    return (
        <NblocksModalComponent mode='half' swipable={false} visible={visible} onCloseModal={() => resetAndCloseModal()}>
            <View style={{flex: 1, alignContent: 'stretch'}}>
                <TitleComponent>Invite users</TitleComponent>
                
                <TextInputComponent
                    label="You can invite several users, just hit enter"
                    placeholder="Enter email address"
                    type="emailAddress"
                    value={username}
                    onSubmitEditing={() => addUsername()}
                    onChangeText={
                        (text) => {
                            setUsername(text)
                        }
                    }
                />

                <View style={{flex: 1}}>
                    {usernames.length > 0 &&
                        <View>
                            <SubTitleComponent>Ready to invite (Tap to remove):</SubTitleComponent>
                            <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
                                {usernames.map((name, index) => (
                                    <ChipComponent key={index} onPress={() => removeUsername(name)}>
                                        {name}
                                    </ChipComponent>)
                                )}
                            </View>
                        </View>
                    }
                </View>

                <View>
                    <SubmitCancelButtonsComponent
                        submitText="Invite" 
                        cancelText="Cancel" 
                        submitDisabled={username.trim().length === 0 && usernames.length === 0}
                        onSubmit={() => createUsers()} 
                        onCancel={() => resetAndCloseModal()}
                    >
                    </SubmitCancelButtonsComponent>
                </View>
            </View>
        </NblocksModalComponent>
    )
}

export {AddUserModalComponent};