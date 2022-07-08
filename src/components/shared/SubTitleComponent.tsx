import React, { FunctionComponent } from "react";
import { Text } from "react-native";
import { useTheme } from "../../hooks/theme-context";

const SubTitleComponent:FunctionComponent = ({children}) => {
    const {styles} = useTheme();
    return (
        <Text style={[styles.textGlobal, styles.subTitle]}>
            {children}
        </Text>
    )
}

export {SubTitleComponent};