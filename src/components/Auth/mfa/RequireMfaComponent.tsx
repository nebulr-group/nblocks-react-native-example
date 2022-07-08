import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthRoutesStackParams } from "../../../routes/AuthRoutes";
import {TextInputComponent} from "../../shared/InputComponent";
import {NblocksButton} from "../../shared/NblocksButton";
import {BaseStyleComponent} from "../BaseStyleComponent";

const RequireMfaComponent:FunctionComponent = () => {

    const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();

    const {authService} = useSecureContext();

    const [mfaCode, setMfaCode] = useState("");

    const submitMfaCode = async(): Promise<void> => {
        await authService.commitMfaCode(mfaCode);
        navigation.navigate('ChooseUser');
    }

    return (
        <BaseStyleComponent title="Two-factor authentication required" subTitle="We just sent you a code. Enter the code receieved on your mobile.">
            <TextInputComponent 
                label="2FA code" 
                placeholder="Enter the 2FA code" 
                type="oneTimeCode" 
                value={mfaCode} 
                onChangeText={(val) => setMfaCode(val)} 
            />
            <NblocksButton 
                title="Use recover code?"
                onPress={() => navigation.navigate('ResetMfa')}
            />
            <NblocksButton 
                title="Submit"
                type="primary"
                onPress={() => submitMfaCode()}
                disabled={!mfaCode}
            />
        </BaseStyleComponent>
    );
}

export {RequireMfaComponent};