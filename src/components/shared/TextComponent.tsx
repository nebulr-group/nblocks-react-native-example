import React, { FunctionComponent } from "react";
import { ImageStyle, Text, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/theme-context";

const TextComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined;
    numberOfLines?: number
}> = ({style: customStyle, numberOfLines, children}) => {

    const {styles} = useTheme();
    
    return (
        <Text 
        numberOfLines={numberOfLines}
        style={[styles.textGlobal, customStyle]}>
            {children}
        </Text>
    )
}

export {TextComponent};