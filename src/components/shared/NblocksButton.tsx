import React, { FunctionComponent } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { brandingConfig, cancelColor, dangerColor, primaryColor } from "../../utils/BrandingConfig";

const NblocksButton:FunctionComponent<{onPress: () => any, title: string, type?: 'primary' | 'danger', disabled?: boolean}> = ({children, onPress, title, type, disabled}) => {

    const getBackgroundColor = () => {
        switch (type) {
            case 'primary':
                return primaryColor;
    
            case 'danger':
                return dangerColor;
        
            default:
                return cancelColor;
        }
    }
    
    return (
        <TouchableOpacity style={[brandingConfig.button, { backgroundColor: getBackgroundColor()}]} disabled={disabled} onPress={() => onPress()}>
            <Text style={[brandingConfig.buttonText, {opacity: disabled ? 0.4 : 1}]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default NblocksButton;