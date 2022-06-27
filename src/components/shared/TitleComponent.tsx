import React, { FunctionComponent } from "react";
import { Text, StyleSheet } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const TitleComponent:FunctionComponent = ({children}) => {
    const style = StyleSheet.flatten([brandingConfig.textGlobal, brandingConfig.title]);
    return (
        <Text style={style}>
            {children}
        </Text>
    )
}

export default TitleComponent;