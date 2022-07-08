import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../../hooks/app-context";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthRoutesStackParams } from "../../../routes/AuthRoutes";
import {TextInputComponent} from "../../shared/InputComponent";
import {SubmitCancelButtonsComponent} from "../../shared/SubmitCancelButtonsComponent";
import {BaseStyleComponent} from "../BaseStyleComponent";

const LoginComponent:FunctionComponent = () => {

    const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();
    const { t } = useTranslation('nblocks');

    const {authService} = useSecureContext();

    const {name} = useApp();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authenticate = async(): Promise<void> => {
        try {
            const response = await authService.authenticate(username, password);

            setUsername("");
            setPassword("");
            
            switch (response.mfaState) {
                case 'DISABLED':
                  navigation.navigate('ChooseUser');
                  break;
        
                case 'REQUIRED':
                    navigation.navigate('RequireMfa');
                  break;
        
                case 'SETUP':
                    navigation.navigate('SetupMfa');
                  break;
              }
        } catch (error) {
            console.log("catched", error);
        }
      }

    return (
        <BaseStyleComponent title={`Login to ${name}`} subTitle="Continue with the email address you used to sign up.">
            <TextInputComponent label="Email address" placeholder="Enter email address" type="emailAddress" value={username} onChangeText={(val) => setUsername(val)} />
            <TextInputComponent label="Password" placeholder="Enter password" type="password" value={password} onChangeText={(val) => setPassword(val)} />
            <SubmitCancelButtonsComponent 
                cancelText={t('FORGOT_PASSWORD')} 
                onCancel={() => navigation.navigate("ResetPassword")} 
                submitText={t('LOGIN')} 
                onSubmit={() => authenticate()}
                submitDisabled={!username || !password}
            />
        </BaseStyleComponent>
    );
}

export {LoginComponent};