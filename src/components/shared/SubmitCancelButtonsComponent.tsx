import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import {NblocksButton} from "./NblocksButton";

const SubmitCancelButtonsComponent:FunctionComponent<
{  
    submitText: string, 
    onSubmit: () => void, 
    cancelText: string, 
    onCancel: () => void, 
    submitDisabled?: boolean, 
    style?: ViewStyle | TextStyle | ImageStyle | undefined }> = ({
        submitText, 
        onSubmit, 
        cancelText, 
        onCancel, 
        submitDisabled, 
        style: customStyle
    }) => {
    return (
        <View style={[{flexDirection: 'row'}, customStyle]}>
            <View style={{ flex: 1, paddingRight: 5 }}>
                <NblocksButton title={cancelText} onPress={() => onCancel()}></NblocksButton>
            </View>
            <View style={{ flex: 1, paddingLeft: 5 }}>
                <NblocksButton type="primary" disabled={submitDisabled} title={submitText} onPress={() => onSubmit()}></NblocksButton>
            </View>
        </View>
    )
}

export  {SubmitCancelButtonsComponent};