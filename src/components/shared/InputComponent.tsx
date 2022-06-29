import React, { FunctionComponent } from "react";
import { Text, StyleSheet, TextInput, View, KeyboardTypeOptions } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";
import InputGroupComponent from "./InputGroupComponent";
import TextComponent from "./TextComponent";

type InputType = 'none' | 'password' | 'oneTimeCode' | 'telephoneNumber' | 'emailAddress' | 'username';

const TextInputComponent:FunctionComponent<{
    type: InputType;
    label?: string;
    multiline?: boolean,
    placeholder: string;
    value: string;
    onChangeText: ((text: string) => void);
    onSubmitEditing?: (() => void);
    style?: any;
}> = ({type, label, multiline, placeholder, value, onChangeText, style: customStyle, onSubmitEditing}) => {
    const style = StyleSheet.flatten([brandingConfig.textGlobal, brandingConfig.textInput]);

    return (
        <InputGroupComponent style={[{flexDirection: 'column'},customStyle]}>
            {label && <TextComponent>{label}</TextComponent>}
            <TextInput
                onSubmitEditing={() => { onSubmitEditing ? onSubmitEditing() : undefined}}
                style={style}
                multiline={multiline}
                textContentType={type}
                keyboardType={getKeyboardType(type)}
                autoCapitalize={type === 'none' ? 'sentences' : 'none'}
                secureTextEntry={type === 'password'}
                value={value}
                placeholder={placeholder}
                onChangeText={(text) => onChangeText(text)}
            />
        </InputGroupComponent>
    )
}

// Must be outside component to be recalculated each time user taps another input
const getKeyboardType = (type: InputType):KeyboardTypeOptions | undefined => {
    switch (type) {
        case 'username':
        case 'emailAddress':
            return 'email-address'

        case 'oneTimeCode':
            return 'numeric'

        case 'telephoneNumber':
            return 'phone-pad'
    
        default:
            return undefined;
    }
}

export default TextInputComponent;