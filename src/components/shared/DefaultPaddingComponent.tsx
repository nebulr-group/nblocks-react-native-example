import React, { FunctionComponent } from "react";
import {  ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/theme-context";

/**
 * Applies Nblocks default padding to a screen.
 * No component should include padding
 * @param param0 
 * @returns 
 */
const DefaultPaddingComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined
}> = ({children, style: customStyle}) => {
    const {styles} = useTheme();
    return (
        <View style={[styles.body, styles.defaultPadding, customStyle]}>
            {children}
        </View>
    )
}

export {DefaultPaddingComponent};