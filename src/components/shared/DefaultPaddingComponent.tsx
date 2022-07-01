import React, { FunctionComponent } from "react";
import {  StyleSheet, View } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

/**
 * Applies Nblocks default padding to a screen.
 * No component should include padding
 * @param param0 
 * @returns 
 */
const DefaultPaddingComponent:FunctionComponent<{style?: any}> = ({children, style: customStyle}) => {
    const style = StyleSheet.flatten([brandingConfig.body, brandingConfig.defaultPadding]);
    return (
        <View style={[style, customStyle]}>
            {children}
        </View>
    )
}

export default DefaultPaddingComponent;