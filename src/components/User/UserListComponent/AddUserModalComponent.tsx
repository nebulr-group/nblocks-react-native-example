import React, { FunctionComponent, useState } from "react";
import { Modal, Text, StyleSheet, View, Button, TextInput, ActivityIndicator } from "react-native";
import { ListUsersDocument, useCreateUsersMutation } from "../../../generated/graphql";

const AddUserModalComponent:FunctionComponent<{
    visible: boolean, 
    onCloseModal: () => void
}> = ({visible, onCloseModal}) => {

    //const [usernames, setUsernames] = useState<string[]>([]);
    const [usernames, setUsernames] = useState("");
    const [createUserMutation, {loading}] = useCreateUsersMutation({refetchQueries: [{query: ListUsersDocument}]});

    const createUsers = () => {
        createUserMutation({variables: {userNames: usernames.split(",")}});
        onCloseModal();
    }

    if (loading) {
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
                    Invite users
                </Text>
                <Text>
                    You can invite several users, just hit enter.
                </Text>
                <TextInput
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    value={usernames}
                    placeholder="Email address"
                    onChangeText={(text) => {
                        setUsernames(text)
                    }}
                />
                
                <Button title="Invite" onPress={() => createUsers()}></Button>
                <Button title="Cancel" onPress={() => onCloseModal()}></Button>
            </View>
        </Modal>
    )
}

export default AddUserModalComponent;
  
const styles = StyleSheet.create({
    container: {
    marginTop: 300,
      height: 50,
      backgroundColor: '#FFFFFF',
    },
  });