import React, { FunctionComponent } from "react";
import { Text } from "react-native";
import { useTheme } from "../../hooks/theme-context";

const IngressComponent:FunctionComponent = ({children}) => {
    const {styles} = useTheme();
    return (
        <Text style={[styles.textGlobal, styles.textIngress]}>
            {children}
        </Text>
    )
}

export {IngressComponent};