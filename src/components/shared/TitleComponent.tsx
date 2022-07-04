import React, { FunctionComponent } from "react";
import { Text, StyleSheet, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const TitleComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined;
    selectable?: boolean | undefined;
}> = ({children, style: customStyle, selectable}) => {
    const style = StyleSheet.flatten([brandingConfig.textGlobal, brandingConfig.title]);
    return (
        <Text style={[style, customStyle]} selectable={selectable}>
            {children}
        </Text>
    )
}

export default TitleComponent;