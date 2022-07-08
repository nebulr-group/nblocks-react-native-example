import React, { FunctionComponent, useState } from "react";
import { View, Image, Dimensions } from "react-native";
import { useAuth } from "../../../../hooks/auth-context";
import {FormattedDateComponent} from "../../../FormattedDate/FormattedDate";
import {IngressComponent} from "../../../shared/IngressComponent";
import {NblocksButton} from "../../../shared/NblocksButton";
import {SubTitleComponent} from "../../../shared/SubTitleComponent";
import {TextComponent} from "../../../shared/TextComponent";
import {TitleComponent} from "../../../shared/TitleComponent";
import {SafeFullNameComponent} from "../../SafeFullNameComponent/SafeFullNameComponent";
import {EditUserProfileModalComponent} from "./EditUserProfileModalComponent";

const UserProfileComponent:FunctionComponent = () => {

    //TODO fix this
    const placeholderLogo = "http://cdn.onlinewebfonts.com/svg/img_184513.png";

    // Most probably we should use getMe/updateMe to make sure data is non cached
    // Or return something else than cached currentUser from auth/currentUser
    const {currentUser} = useAuth();

    const [showEditModal, setShowEditModal] = useState(false);

  return (
    <View style={{flex: 1}}>
        <View style={{flex: 11, alignItems: 'center'}}>
            <Image
                style={{height: 100, width: Dimensions.get('window').width * (2/3), resizeMode: 'contain'}}
                source={{ uri: placeholderLogo }}
            />
            <View style={{alignItems: 'center'}}>
                <TitleComponent>
                    <SafeFullNameComponent fullName={currentUser.user?.fullName} />
                </TitleComponent>
                <SubTitleComponent>
                    {currentUser.user?.email}
                </SubTitleComponent>
                <IngressComponent>
                {currentUser.user?.role} @ {currentUser.user?.tenant.name}
                </IngressComponent>
                <TextComponent>
                    Added: <FormattedDateComponent date={new Date().toISOString()} length="short"/>
                </TextComponent>
            </View>
        </View>
        <View>
            <NblocksButton type="primary" title="Edit" onPress={() => setShowEditModal(true)}></NblocksButton>
        </View>

        <EditUserProfileModalComponent visible={showEditModal} onCloseModal={() => setShowEditModal(false)}></EditUserProfileModalComponent>
    </View>
  );
}

export {UserProfileComponent};