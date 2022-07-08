import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/theme-context";
import {TextComponent} from "./TextComponent";

const ChipComponent:FunctionComponent<{
    style?:  ViewStyle | TextStyle | ImageStyle | undefined;
    onPress: (() => void);
}> = ({style: customStyle, onPress, children}) => {

    const {styles} = useTheme();
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View
                style={[
                    styles.chip,
                    customStyle
                ]}
            >
                <TextComponent>{children}</TextComponent>
            </View>
        </TouchableOpacity>
    )
}

export {ChipComponent};