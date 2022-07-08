import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/theme-context";

const InputGroupComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined | any[];
}> = ({style: customStyle, children}) => {

    const {styles} = useTheme();

    return (
        <View style={[styles.inputGroup, customStyle]}>
            {children}
        </View>
    )
}

export  {InputGroupComponent};