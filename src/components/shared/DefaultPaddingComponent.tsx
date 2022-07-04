import React, { FunctionComponent } from "react";
import {  ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

/**
 * Applies Nblocks default padding to a screen.
 * No component should include padding
 * @param param0 
 * @returns 
 */
const DefaultPaddingComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined
}> = ({children, style: customStyle}) => {
    const style = StyleSheet.flatten([brandingConfig.body, brandingConfig.defaultPadding]);
    return (
        <View style={[style, customStyle]}>
            {children}
        </View>
    )
}

export default DefaultPaddingComponent;