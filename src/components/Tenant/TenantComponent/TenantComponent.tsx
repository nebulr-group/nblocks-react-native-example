import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Image, Dimensions, ActivityIndicator, Switch } from "react-native";
import WebView from "react-native-webview";
import { useGetCustomerPortalLazyQuery, useGetTenantQuery, useUpdateTenantMutation } from "../../../generated/graphql";
import {FormattedDateComponent} from "../../FormattedDate/FormattedDate";
import {IngressComponent} from "../../shared/IngressComponent";
import {InputGroupComponent} from "../../shared/InputGroupComponent";
import {NblocksButton} from "../../shared/NblocksButton";
import {NblocksModalComponent} from "../../shared/NblocksModalComponent";
import {SubmitCancelButtonsComponent} from "../../shared/SubmitCancelButtonsComponent";
import {SubTitleComponent} from "../../shared/SubTitleComponent";
import {TextComponent} from "../../shared/TextComponent";
import {TitleComponent} from "../../shared/TitleComponent";
import {EditTenantModalComponent} from "./EditTenantModalComponent";

const TenantComponent:FunctionComponent = () => {

    //TODO fix this
    const placeholderLogo = "http://cdn.onlinewebfonts.com/svg/img_464047.png";

    const {data, loading, error, refetch} = useGetTenantQuery();
    const [updateTenantMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateTenantMutation();
    const [getCustomerPortalQuery, { loading: queryLoading, error: queryError, data: queryData }] = useGetCustomerPortalLazyQuery();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

    const renderCustomerPortalViewView = () => {
        if (queryLoading)
            return (<ActivityIndicator color="#32B768" size="large" />)
        else
            return (
                //TODO fix this
                <WebView style={{flex: 1}} source={{uri: "https://google.com"}}>
                </WebView>
            )
    }

    const updateTenant = (mfa: boolean) => {
        updateTenantMutation({variables: {tenant: {mfa}}});
    }

  return (
    <View style={{flex: 1}}>
        <View style={{flex: 11, alignItems: 'center'}}>
            <Image
                style={{height: 100, width: Dimensions.get('window').width * (2/3), resizeMode: 'contain'}}
                source={{ uri: data?.getTenant.logo ? data?.getTenant.logo : placeholderLogo }}
            />
            <View style={{alignItems: 'center'}}>
                <TitleComponent>
                    {data?.getTenant.name}
                </TitleComponent>
                <SubTitleComponent>
                    {data?.getTenant.plan}
                </SubTitleComponent>
                <IngressComponent>
                    Lang: {data?.getTenant.locale}
                </IngressComponent>
                <TextComponent>
                    Added: <FormattedDateComponent date={data?.getTenant.createdAt!} length="short"></FormattedDateComponent>
                </TextComponent>
                <InputGroupComponent style={{alignItems:"center"}}>
                    <TextComponent>2FA: </TextComponent>
                    <Switch value={data?.getTenant.mfa!} onValueChange={(val) => updateTenant(val)}></Switch>
                </InputGroupComponent>
            </View>
        </View>
        <View>
            <NblocksButton type="primary" title="Edit" onPress={() => setShowEditModal(true)}></NblocksButton>
            <NblocksButton title="Manage subscription" onPress={() => {getCustomerPortalQuery({}); setShowSubscriptionModal(true)}}></NblocksButton>
        </View>

        <EditTenantModalComponent visible={showEditModal} onCloseModal={() => setShowEditModal(false)}></EditTenantModalComponent>
        <NblocksModalComponent mode="full" swipable={false} visible={showSubscriptionModal} onCloseModal={() => setShowSubscriptionModal(false)}>
            <View style={{flex: 1, alignContent: 'stretch'}}>
                <TitleComponent>
                Manage subscription
                </TitleComponent>
                {renderCustomerPortalViewView()}
                <SubmitCancelButtonsComponent 
                submitText="Save" 
                cancelText="Cancel" 
                onSubmit={() => setShowSubscriptionModal(false)} 
                onCancel={() => setShowSubscriptionModal(false)}>
                </SubmitCancelButtonsComponent>
            </View>
        </NblocksModalComponent>
    </View>
  );
}

export {TenantComponent};