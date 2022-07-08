import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/theme-context";

const NblocksButton:FunctionComponent<{onPress: () => any, title: string, type?: 'primary' | 'danger', disabled?: boolean}> = ({children, onPress, title, type, disabled}) => {

    const {styles, colors} = useTheme();
    
    const getBackgroundColor = () => {
        switch (type) {
            case 'primary':
                return colors.primaryColor;
    
            case 'danger':
                return colors.dangerColor;
        
            default:
                return colors.cancelColor;
        }
    }
    
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: getBackgroundColor()}]} disabled={disabled} onPress={() => onPress()}>
            <Text style={[styles.buttonText, {opacity: disabled ? 0.4 : 1}]}>{title}</Text>
        </TouchableOpacity>
    )
}

export  {NblocksButton};