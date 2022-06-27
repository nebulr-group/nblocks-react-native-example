import React, { FunctionComponent } from "react";
import { Text, StyleSheet } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const SubTitleComponent:FunctionComponent = ({children}) => {
    const style = StyleSheet.flatten([brandingConfig.textGlobal, brandingConfig.subTitle]);
    return (
        <Text style={style}>
            {children}
        </Text>
    )
}

export default SubTitleComponent;