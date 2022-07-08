import React, { FunctionComponent, useState } from "react";
import { View, Image, Dimensions } from "react-native";
import WebView from "react-native-webview";
import { useApp } from "../../hooks/app-context";
import {IngressComponent} from "../shared/IngressComponent";
import {NblocksButton} from "../shared/NblocksButton";
import {NblocksModalComponent} from "../shared/NblocksModalComponent";
import {SubTitleComponent} from "../shared/SubTitleComponent";
import {TextComponent} from "../shared/TextComponent";

const BaseStyleComponent:FunctionComponent<{title: string, subTitle: string}> = ({children, title, subTitle}) => {

    const {name, logo, privacyPolicyUrl} = useApp();
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    return (
        <View style={{flex: 1, alignContent: 'space-between'}}>
            <View style={{alignItems: 'center'}}>
                <Image
                    style={{height: 100, width: Dimensions.get('window').width * (2/3), resizeMode: 'contain'}}
                    source={{ uri: logo }}
                />
                <SubTitleComponent>{title}</SubTitleComponent>
                <IngressComponent>{subTitle}</IngressComponent>
            </View>
            <View style={{flex: 1}}>
                {children}
            </View>
            <View style={{alignItems: 'center'}}>
                <TextComponent>
                    @{new Date().getFullYear()} {name} All rights reserved
                </TextComponent>
                <NblocksButton title="Privacy policy" onPress={() => setShowPrivacyPolicy(true)} />
            </View>
            <NblocksModalComponent mode="full" visible={showPrivacyPolicy} swipable={false} onCloseModal={() => setShowPrivacyPolicy(false)}>
                <WebView style={{flex: 1}} source={{uri: privacyPolicyUrl}}>
                </WebView>
                <NblocksButton title="Close" type="primary" onPress={() => setShowPrivacyPolicy(false)}></NblocksButton>
            </NblocksModalComponent>
        </View>
    );
}

export {BaseStyleComponent};