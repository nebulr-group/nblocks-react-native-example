import React, { FunctionComponent } from "react";
import { Text, StyleSheet } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const IngressComponent:FunctionComponent = ({children}) => {
    const style = StyleSheet.flatten([brandingConfig.textGlobal, brandingConfig.textIngress]);
    return (
        <Text style={style}>
            {children}
        </Text>
    )
}

export default IngressComponent;