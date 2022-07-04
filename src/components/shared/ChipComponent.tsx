import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";
import TextComponent from "./TextComponent";

const ChipComponent:FunctionComponent<{
    style?:  ViewStyle | TextStyle | ImageStyle | undefined;
    onPress: (() => void);
}> = ({style: customStyle, onPress, children}) => {

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View
                style={[
                    brandingConfig.chip,
                    customStyle
                ]}
            >
                <TextComponent>{children}</TextComponent>
            </View>
        </TouchableOpacity>
    )
}

export default ChipComponent;