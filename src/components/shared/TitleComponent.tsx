import React, { FunctionComponent } from "react";
import { Text, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/theme-context";

const TitleComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined;
    selectable?: boolean | undefined;
}> = ({children, style: customStyle, selectable}) => {
    const {styles} = useTheme();

    return (
        <Text style={[styles.textGlobal, styles.title, customStyle]} selectable={selectable}>
            {children}
        </Text>
    )
}

export {TitleComponent};