import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthRoutesStackParams } from "../../../routes/AuthRoutes";
import {TextInputComponent} from "../../shared/InputComponent";
import {NblocksButton} from "../../shared/NblocksButton";
import {SubTitleComponent} from "../../shared/SubTitleComponent";
import {TextComponent} from "../../shared/TextComponent";
import {TitleComponent} from "../../shared/TitleComponent";
import {BaseStyleComponent} from "../BaseStyleComponent";

const SetupMfaComponent:FunctionComponent = () => {

    const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();

    const {authService} = useSecureContext();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [mfaCode, setMfaCode] = useState("");
    const [backupCode, setBackupCode] = useState("");

    const [step, setStep] = useState(0);

    const submitPhoneNumber = async(): Promise<void> => {
        await authService.startMfaUserSetup(phoneNumber);
        setStep(1);
    }

    const submitMfaCode = async(): Promise<void> => {
        const backupCode = await authService.finishMfaUserSetup(mfaCode);
        setBackupCode(backupCode);
        setStep(2);
    }

    switch (step) {
        case 0:
            return (
                <BaseStyleComponent title="Two-factor authentication required" subTitle="Enter your phone number to set it up.">
                    <TextInputComponent 
                        label="Phone number" 
                        placeholder="Enter phone number" 
                        type="telephoneNumber" 
                        value={phoneNumber} 
                        onChangeText={(val) => setPhoneNumber(val)} 
                    />
                    <NblocksButton 
                        title="Submit"
                        type="primary"
                        onPress={() => submitPhoneNumber()}
                        disabled={!phoneNumber}
                    />
                </BaseStyleComponent>
            );
        
        case 1:
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
                        title="Submit"
                        type="primary"
                        onPress={() => submitMfaCode()}
                        disabled={!mfaCode}
                    />
                </BaseStyleComponent>
            );

        case 2:
            return (
                <BaseStyleComponent title="Two-factor authentication required" subTitle="Everything set! This is your 2FA recovery code. Keep this safe and use it if you lost your mobile device.">
                    <View style={{borderColor: 'black', borderWidth: 1, borderStyle: 'dotted', padding: 15, margin: 5, alignItems: 'center'}}>
                        <TitleComponent selectable={true}>
                            {backupCode}
                        </TitleComponent>
                    </View>
                    <NblocksButton 
                        title="Next"
                        type="primary"
                        onPress={() => navigation.navigate('ChooseUser')}
                    />
                </BaseStyleComponent>
            );
    
        default:
            return (null);
    }
}

export {SetupMfaComponent};