import React, { FunctionComponent } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { brandingConfig, cancelColor, dangerColor, primaryColor } from "../../utils/BrandingConfig";

const NblocksButton:FunctionComponent<{onPress: () => any, title: string, type?: 'primary' | 'danger'}> = ({children, onPress, title, type}) => {

    return (
        <TouchableOpacity style={[brandingConfig.button, { backgroundColor: getBackgroundColor(type) }]} onPress={() => onPress()}>
            <Text style={brandingConfig.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const getBackgroundColor = (type?:'primary' | 'danger') => {
    switch (type) {
        case 'primary':
            return primaryColor;

        case 'danger':
            return dangerColor;
    
        default:
            return cancelColor;
    }
}

export default NblocksButton;