import React, { FunctionComponent } from "react";
import { View } from "react-native";
import NblocksButton from "./NblocksButton";

const SubmitCancelButtonsComponent:FunctionComponent<{submitText: string, onSubmit: () => void, cancelText: string, onCancel: () => void}> = ({children, submitText, onSubmit, cancelText, onCancel}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 1, padding: 10 }}>
                <NblocksButton title={cancelText} onPress={() => onCancel()}></NblocksButton>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <NblocksButton type="primary" title={submitText} onPress={() => onSubmit()}></NblocksButton>
            </View>
        </View>
    )
}

export default SubmitCancelButtonsComponent;