import React, { FunctionComponent } from "react";
import {  StyleSheet, View } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const DefaultPaddingComponent:FunctionComponent<{style?: any}> = ({children, style: customStyle}) => {
    const style = StyleSheet.flatten([brandingConfig.body, brandingConfig.defaultPadding]);
    return (
        <View style={[style, customStyle]}>
            {children}
        </View>
    )
}

export default DefaultPaddingComponent;