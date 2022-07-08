import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { useApp } from "../../../hooks/app-context";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthRoutesStackParams } from "../../../routes/AuthRoutes";
import {TextInputComponent} from "../../shared/InputComponent";
import {NblocksButton} from "../../shared/NblocksButton";
import {BaseStyleComponent} from "../BaseStyleComponent";

const ResetPasswordComponent:FunctionComponent = () => {

    const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();

    const {authService} = useSecureContext();

    const [username, setUsername] = useState("");

    const resetPassword = async(): Promise<void> => {
        try {
            await authService.sendResetPasswordLink(username);
            navigation.navigate('Login');
        } catch (error) {
            console.log("catched", error);
        }
      }

    return (
        <BaseStyleComponent title="Reset Password" subTitle="Please enter the email address used to sign in to your account.">
            <TextInputComponent label="Email address" placeholder="Enter email address" type="emailAddress" value={username} onChangeText={(val) => setUsername(val)} />
            <NblocksButton 
                title="Get a reset link"
                type="primary"
                onPress={() => resetPassword()}
                disabled={!username}
            />
        </BaseStyleComponent>
    );
}

export {ResetPasswordComponent};