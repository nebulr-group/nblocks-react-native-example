import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const DividerComponent:FunctionComponent = ({children}) => {
    return (
        <View
            style={brandingConfig.divider}
        />
    )
}

export default DividerComponent;