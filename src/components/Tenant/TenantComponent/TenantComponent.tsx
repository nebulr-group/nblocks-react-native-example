import React, { FunctionComponent, useState } from "react";
import { View, Image, Dimensions, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";
import { useGetCustomerPortalLazyQuery, useGetTenantQuery, useUpdateTenantMutation } from "../../../generated/graphql";
import FormattedDateComponent from "../../FormattedDate/FormattedDate";
import IngressComponent from "../../shared/IngressComponent";
import NblocksButton from "../../shared/NblocksButton";
import NblocksModalComponent from "../../shared/NblocksModalComponent";
import SubmitCancelButtonsComponent from "../../shared/SubmitCancelButtonsComponent";
import SubTitleComponent from "../../shared/SubTitleComponent";
import TextComponent from "../../shared/TextComponent";
import TitleComponent from "../../shared/TitleComponent";
import EditTenantModalComponent from "./EditTenantModalComponent";

const TenantComponent:FunctionComponent = () => {

    //TODO fix this
    const placeholderLogo = "http://cdn.onlinewebfonts.com/svg/img_464047.png";

    const {data, loading, error, refetch} = useGetTenantQuery();
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
                    Added: <FormattedDateComponent date={data?.getTenant.createdAt} length="short"></FormattedDateComponent>
                </TextComponent>
            </View>
        </View>
        <View>
            <NblocksButton type="primary" title="Edit" onPress={() => setShowEditModal(true)}></NblocksButton>
            <NblocksButton title="Manage subscription" onPress={() => {getCustomerPortalQuery({}); setShowSubscriptionModal(true)}}></NblocksButton>
        </View>

        {data?.getTenant && <EditTenantModalComponent tenant={data?.getTenant} visible={showEditModal} onCloseModal={() => setShowEditModal(false)}></EditTenantModalComponent>}
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

export default TenantComponent;