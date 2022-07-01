import React, { FunctionComponent, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../../../../hooks/auth-context";
import { useSecureContext } from "../../../../hooks/secure-http-context";
import TextInputComponent from "../../../shared/InputComponent";
import NblocksModalComponent from "../../../shared/NblocksModalComponent";
import SubmitCancelButtonsComponent from "../../../shared/SubmitCancelButtonsComponent";
import TitleComponent from "../../../shared/TitleComponent";

const EditUserProfileModalComponent:FunctionComponent<{
    visible: boolean;
    onCloseModal: () => void;
}> = ({visible, onCloseModal}) => {

    const {authService} = useSecureContext();
    const {currentUser, updateUserProfile} = useAuth();

    //TODO fix this, introduce firstname, lastname in API response
    const [firstName, setFirstName] = useState(currentUser.user?.fullName ? currentUser.user?.fullName?.split(" ")[0] : "");
    const [lastName, setLastName] = useState(currentUser.user?.fullName ? currentUser.user?.fullName?.split(" ")[1] : "");
    
    //TODO fix this, how to expose to user?
    const [phoneNumber, setPhoneNumber] = useState("");

    const [updateLoading, setUpdateLoading] = useState(false);

    const updateProfile = () => {
        //TODO async?
        updateUserProfile({firstName, lastName, phoneNumber: phoneNumber ? phoneNumber : undefined});
        onCloseModal();
    }

    if (updateLoading) {
        return (
          <View>
            <ActivityIndicator color="#32B768" size="large" />
          </View>
        );
    }

  return (
    <NblocksModalComponent mode="half" swipable={false} visible={visible} onCloseModal={() => onCloseModal()}>
        <View style={{flex: 1, alignContent: 'stretch'}}>
            <TitleComponent>
                Edit user profile
            </TitleComponent>
            <View style={{flex: 1}}>
                <TextInputComponent 
                    type='name'
                    label="First name"
                    placeholder="John" 
                    value={firstName} 
                    onChangeText={(val) => setFirstName(val)} />
                <TextInputComponent 
                    type='name' 
                    label="Last name"
                    placeholder="Doe" 
                    value={lastName} 
                    onChangeText={(val) => setLastName(val)} />
                <TextInputComponent 
                    type='telephoneNumber' 
                    label="Phone number"
                    placeholder="+4612345678" 
                    value={phoneNumber} 
                    onChangeText={(val) => setPhoneNumber(val)} />
            </View>
            <SubmitCancelButtonsComponent 
                submitText="Save" 
                cancelText="Cancel"
                submitDisabled={(`${firstName} ${lastName}` === currentUser.user?.fullName) || !!phoneNumber}
                onSubmit={() => updateProfile()} 
                onCancel={() => onCloseModal()}
            >
            </SubmitCancelButtonsComponent>
        </View>
    </NblocksModalComponent>
  );
}

export default EditUserProfileModalComponent;