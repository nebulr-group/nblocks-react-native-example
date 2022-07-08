import React, { FunctionComponent } from "react";
import { SafeAreaView, View} from "react-native";
import Modal from "react-native-modal";
import {DefaultPaddingComponent} from "./DefaultPaddingComponent";

/**
 * NblocksModalComponent, shared reusable modal
 * Swipable support is experimental. Works 50% of the time
 * onCloseModal optional but required when half mode
 * @param param0 
 * @returns 
 */
const NblocksModalComponent:FunctionComponent<{
    visible: boolean,
    onCloseModal: () => void,
    mode: 'full' | 'half'
    swipable: boolean,
}> = ({visible, onCloseModal, mode, swipable, children}) => {

    return (
        <Modal 
            style={{flex: 1, justifyContent: 'flex-end', margin: 0 }}
            isVisible={visible} 
            onBackdropPress={() => onCloseModal()}
            swipeDirection={swipable ? ['up','down'] : []}
            onSwipeComplete={() => onCloseModal}
            backdropTransitionOutTiming={0}
        >
            <View style={{ flex: mode === 'half' ? 0.5 : 1, marginTop: 'auto' }}>
                <DefaultPaddingComponent style={{flex: 1}}>
                  <SafeAreaView style={{flex: 1}}>
                    {children}
                  </SafeAreaView>
                </DefaultPaddingComponent>
            </View>
          </Modal>
    )
}

export  {NblocksModalComponent};