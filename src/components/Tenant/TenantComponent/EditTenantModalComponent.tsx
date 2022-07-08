import { Picker } from "@react-native-picker/picker";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Tenant, useGetTenantQuery, useUpdateTenantMutation } from "../../../generated/graphql";
import {TextInputComponent} from "../../shared/InputComponent";
import {InputGroupComponent} from "../../shared/InputGroupComponent";
import {NblocksModalComponent} from "../../shared/NblocksModalComponent";
import {SubmitCancelButtonsComponent} from "../../shared/SubmitCancelButtonsComponent";
import {TextComponent} from "../../shared/TextComponent";
import {TitleComponent} from "../../shared/TitleComponent";

const EditTenantModalComponent:FunctionComponent<{
    visible: boolean;
    onCloseModal: () => void;
}> = ({visible, onCloseModal}) => {

    //TODO fixme
    const locales = [{label: "English", value: 'en'}, {label: "Svenska", value: 'sv'}]
    const [name, setName] = useState("");
    const [locale, setLocale] = useState("");

    const {data, loading, error, refetch} = useGetTenantQuery();
    const [updateTenantMutation, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateTenantMutation();

    useEffect(() => {
        if (data?.getTenant) {
            setName(data.getTenant.name);
            setLocale(data.getTenant.locale!);
        }
    }, [data]);

    const updateTenant = () => {
        updateTenantMutation({variables: {tenant: {name, locale}}});
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
                submitDisabled={name === data?.getTenant.name && locale === data?.getTenant.locale}
                onSubmit={() => updateTenant()} 
                onCancel={() => onCloseModal()}
            >
            </SubmitCancelButtonsComponent>
        </View>
    </NblocksModalComponent>
  );
}

export {EditTenantModalComponent};