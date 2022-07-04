import React, { FunctionComponent } from "react";
import { ImageStyle, Text, TextStyle, ViewStyle } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const TextComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined;
    numberOfLines?: number
}> = ({style: customStyle, numberOfLines, children}) => {

    return (
        <Text 
        numberOfLines={numberOfLines}
        style={[brandingConfig.textGlobal, customStyle]}>
            {children}
        </Text>
    )
}

export default TextComponent;