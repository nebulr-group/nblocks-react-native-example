import { Picker } from "@react-native-picker/picker";
import React, { FunctionComponent, useState } from "react";
import { View, Image, Dimensions, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";
import { Tenant, useGetCustomerPortalLazyQuery, useGetTenantQuery, useUpdateTenantMutation } from "../../../generated/graphql";
import FormattedDateComponent from "../../FormattedDate/FormattedDate";
import IngressComponent from "../../shared/IngressComponent";
import TextInputComponent from "../../shared/InputComponent";
import InputGroupComponent from "../../shared/InputGroupComponent";
import NblocksButton from "../../shared/NblocksButton";
import NblocksModalComponent from "../../shared/NblocksModalComponent";
import SubmitCancelButtonsComponent from "../../shared/SubmitCancelButtonsComponent";
import SubTitleComponent from "../../shared/SubTitleComponent";
import TextComponent from "../../shared/TextComponent";
import TitleComponent from "../../shared/TitleComponent";

const EditTenantModalComponent:FunctionComponent<{
    tenant: Tenant;
    visible: boolean;
    onCloseModal: () => void;
}> = ({tenant, visible, onCloseModal}) => {

    //TODO fixme
    const locales = [{label: "English", value: 'en'}, {label: "Svenska", value: 'sv'}]
    const [name, setName] = useState(tenant.name);
    const [locale, setLocale] = useState(tenant.locale!);

    const [updateTenantMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateTenantMutation();

    const updateTenant = () => {
        updateTenantMutation({variables: {name, locale}});
        onCloseModal();
    };

    if (updateLoading) {
        return (
          <View>
            <ActivityIndicator color="#32B768" size="large" />
          </View>
        );
    }

  return (
    <NblocksModalComponent mode="half" swipable={false} visible={visible} onCloseModal={() => onCloseModal()}>
        <View style={{flex: 1, alignContent: 'stretch'}}>
            <TitleComponent>
                Edit workspace
            </TitleComponent>
            <View style={{flex: 1}}>
                <TextInputComponent 
                    type='none' 
                    label="Name"
                    placeholder="Workspace name" 
                    value={name} 
                    onChangeText={(val) => setName(val)} />
                <InputGroupComponent style={{flexDirection: 'column'}}>
                    <TextComponent>Language</TextComponent>
                    <Picker
                        style={{flex: 1}}
                        selectedValue={locale}
                        onValueChange={(itemValue, itemIndex) =>
                            setLocale(itemValue)
                        }>
                    {locales.map(locale => (<Picker.Item key={locale.value} label={locale.label} value={locale.value} />))}
                    </Picker>
                </InputGroupComponent>
            </View>
            <SubmitCancelButtonsComponent 
                submitText="Save" 
                cancelText="Cancel"
                submitDisabled={name === tenant.name && locale === tenant.locale}
                onSubmit={() => updateTenant()} 
                onCancel={() => onCloseModal()}
            >
            </SubmitCancelButtonsComponent>
        </View>
    </NblocksModalComponent>
  );
}

export default EditTenantModalComponent;