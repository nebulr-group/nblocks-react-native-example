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

    const [password, setPassword] = useState("");

    //TODO implement this view
    return (
        <BaseStyleComponent title="Set a new Password" subTitle="Please enter the email address used to sign in to your account.">
            TODO!
            {/* <TextInputComponent label="Email address" placeholder="Enter email address" type="emailAddress" value={username} onChangeText={(val) => setUsername(val)} />
            <NblocksButton 
                title="Get a reset link"
                type="primary"
                onPress={() => resetPassword()}
                disabled={!username}
            /> */}
        </BaseStyleComponent>
    );
}

export {ResetPasswordComponent};