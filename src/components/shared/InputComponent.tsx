import React, { FunctionComponent } from "react";
import { TextInput, KeyboardTypeOptions, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/theme-context";
import {InputGroupComponent} from "./InputGroupComponent";
import {TextComponent} from "./TextComponent";

type InputType = 'none' | 'givenName' | 'password' | 'oneTimeCode' | 'telephoneNumber' | 'emailAddress' | 'username';

const TextInputComponent:FunctionComponent<{
    type: InputType;
    label?: string;
    multiline?: boolean,
    placeholder: string;
    value: string;
    onChangeText: ((text: string) => void);
    onSubmitEditing?: (() => void);
    style?: ViewStyle | TextStyle | ImageStyle;
}> = ({type, label, multiline, placeholder, value, onChangeText, style: customStyle, onSubmitEditing}) => {
    const {styles} = useTheme();

    return (
        <InputGroupComponent style={[{flexDirection: 'column'},customStyle]}>
            {label && <TextComponent>{label}</TextComponent>}
            <TextInput
                onSubmitEditing={() => { onSubmitEditing ? onSubmitEditing() : undefined}}
                style={[styles.textGlobal, styles.textInput]}
                multiline={multiline}
                textContentType={type}
                keyboardType={getKeyboardType(type)}
                autoCapitalize={getCapitalize(type)}
                secureTextEntry={type === 'password'}
                value={value}
                placeholder={placeholder}
                onChangeText={(text) => onChangeText(text)}
            />
        </InputGroupComponent>
    )
}

const getCapitalize = (type: InputType): "none" | "sentences" | "words" | "characters" | undefined => {
    switch (type) {
        case 'none':
            return 'sentences';

        case 'givenName':
            return 'words';
    
        default:
            return 'none';
    }
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

export  {TextInputComponent};