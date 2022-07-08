import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { useTheme } from "../../hooks/theme-context";

const DividerComponent:FunctionComponent = ({children}) => {
    const {styles} = useTheme();
    return (
        <View
            style={styles.divider}
        />
    )
}

export {DividerComponent};