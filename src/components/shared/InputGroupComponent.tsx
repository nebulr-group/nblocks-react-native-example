import React, { FunctionComponent } from "react";
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";

const InputGroupComponent:FunctionComponent<{
    style?: ViewStyle | TextStyle | ImageStyle | undefined | any[];
}> = ({style: customStyle, children}) => {

    const style = StyleSheet.flatten([brandingConfig.inputGroup]);

    return (
        <View style={[style, customStyle]}>
            {children}
        </View>
    )
}

export default InputGroupComponent;