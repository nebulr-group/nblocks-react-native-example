import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthRoutesStackParams } from "../../../routes/AuthRoutes";
import {TextInputComponent} from "../../shared/InputComponent";
import {NblocksButton} from "../../shared/NblocksButton";
import {BaseStyleComponent} from "../BaseStyleComponent";

const ResetMfaComponent:FunctionComponent = () => {

    const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();

    const {authService} = useSecureContext();

    const [backupCode, setBackupCode] = useState("");

    const resetMfaCode = async(): Promise<void> => {
        await authService.resetUserMfaSetup(backupCode);
        navigation.navigate('SetupMfa');
    }

    return (
        <BaseStyleComponent title="Recover MFA" subTitle="Use your recovery code which you obtained when setting up. Lost your code? Speak with your system admin.">
            <TextInputComponent 
                label="Recover code" 
                placeholder="Enter the recover code" 
                type="password" 
                value={backupCode} 
                onChangeText={(val) => setBackupCode(val)} 
            />
            <NblocksButton 
                title="Recover"
                type="primary"
                onPress={() => resetMfaCode()}
                disabled={!backupCode}
            />
        </BaseStyleComponent>
    );
}

export {ResetMfaComponent};