import React, { FunctionComponent } from "react";
import { Text } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const TextComponent:FunctionComponent<{
    style?: any;
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