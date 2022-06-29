import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const InputGroupComponent:FunctionComponent<{
    style?: any;
}> = ({style: customStyle, children}) => {

    const style = StyleSheet.flatten([brandingConfig.inputGroup]);

    return (
        <View style={[style, customStyle]}>
            {children}
        </View>
    )
}

export default InputGroupComponent;