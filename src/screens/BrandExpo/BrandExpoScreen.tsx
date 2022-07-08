import { Picker } from '@react-native-picker/picker';
import React, { FunctionComponent, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TextInput, Switch } from 'react-native';
import {AccessControllComponent} from '../../components/Auth/AccessControllComponent';
import {FormattedDateComponent} from '../../components/FormattedDate/FormattedDate';
import {ChipComponent} from '../../components/shared/ChipComponent';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';
import {DividerComponent} from '../../components/shared/DividerComponent';
import {IngressComponent} from '../../components/shared/IngressComponent';
import {TextInputComponent} from '../../components/shared/InputComponent';
import {InputGroupComponent} from '../../components/shared/InputGroupComponent';
import {NblocksButton} from '../../components/shared/NblocksButton';
import {NblocksModalComponent} from '../../components/shared/NblocksModalComponent';
import {SubmitCancelButtonsComponent} from '../../components/shared/SubmitCancelButtonsComponent';
import {SubTitleComponent} from '../../components/shared/SubTitleComponent';
import {TextComponent} from '../../components/shared/TextComponent';
import {TitleComponent} from '../../components/shared/TitleComponent';
import { useTheme } from '../../hooks/theme-context';
import { DialogueService } from '../../utils/AlertService';

const BrandExpoScreen: FunctionComponent<{}> = () => {

    const [halfModalVisible, setHalfModalVisible] = useState(false);
    const [fullModalVisible, setFullModalVisible] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [pickerSelect, setPickerSelect] = useState("Porsche");
    const {styles} = useTheme();
    
      return (
        <ScrollView style={[styles.body, {flex: 1}]}>
          <DefaultPaddingComponent>
            
              <TitleComponent>
                This is a title
              </TitleComponent>

              <SubTitleComponent>
                This is a sub title
              </SubTitleComponent>

              <IngressComponent>
                This is a text ingress
              </IngressComponent>

              <TextComponent>
              This is normal text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque massa vel velit fermentum, sed vestibulum augue egestas. Aenean blandit nisl ac mi tempor, a vestibulum mi malesuada. Cras hendrerit, massa et semper interdum, lacus turpis rutrum arcu, in sagittis nisl dui at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae turpis ex. Praesent tellus est, placerat quis hendrerit in, gravida id libero. Vivamus posuere a magna sed posuere. Maecenas sagittis porttitor malesuada. Phasellus auctor purus vel volutpat posuere. Nam quis ipsum quis ipsum sollicitudin dapibus. Donec gravida viverra nulla, in porttitor tortor gravida at. Aenean nunc nibh, convallis non commodo tincidunt, porta iaculis odio. Pellentesque non sem fringilla, posuere neque ac, mattis nulla.
              </TextComponent>

              <DividerComponent/>

              <SubTitleComponent>
                Forms
              </SubTitleComponent>

              <TextInputComponent
                type='password'
                label='Password input'
                placeholder='Enter password'
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
              />

              <TextInputComponent
                type='emailAddress'
                label='Email address input'
                placeholder='Enter email address'
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
              />

              <TextInputComponent
                type='telephoneNumber'
                label='Phone number input'
                placeholder='Enter phone number'
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
              />

              <TextInputComponent
                type='none'
                placeholder='Multiline that grows'
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
              />

              <InputGroupComponent>
                <TextComponent style={{flex: 1}}>Enabled:</TextComponent>
                <Switch value={true} onValueChange={(enabled) => {}}></Switch>
              </InputGroupComponent>

              <Picker
                  selectedValue={pickerSelect}
                  onValueChange={(itemValue, itemIndex) =>
                      setPickerSelect(itemValue)
                  }>
                  {["BMW", "Porsche", "Volvo", "Bentley", "Mercedes"].map(brand => (<Picker.Item key={brand} label={brand} value={brand} />))}
              </Picker>
              
              <SubTitleComponent>
                Chips
              </SubTitleComponent>

              <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
                  {["BMW", "Porsche", "Volvo", "Bentley", "Mercedes"].map((brand, index) => (
                      <ChipComponent key={index} onPress={() => {}}>
                          {brand}
                      </ChipComponent>)
                  )}
              </View>

              <SubTitleComponent>
                Buttons
              </SubTitleComponent>

              <NblocksButton title='Default btn' onPress={() => {}}></NblocksButton>
              <NblocksButton title='Primary btn' onPress={() => {}} type='primary'></NblocksButton>
              <NblocksButton title='Danger btn' onPress={() => {}} type='danger'></NblocksButton>
              <NblocksButton title='Default disabled' disabled={true} onPress={() => {}}></NblocksButton>
              <NblocksButton title='Primary disabled' disabled={true} onPress={() => {}} type='primary'></NblocksButton>
              <NblocksButton title='Danger disabled' disabled={true} onPress={() => {}} type='danger'></NblocksButton>

              <SubTitleComponent>
                Button pairs
              </SubTitleComponent>

              <SubmitCancelButtonsComponent cancelText='Cancel' submitText='Submit' onCancel={() => {}} onSubmit={() => {}} />
              
              <SubTitleComponent>
                Dates
              </SubTitleComponent>

              <TextComponent numberOfLines={2}>
                <FormattedDateComponent date={new Date().toISOString()} length="short" /> (short)
              </TextComponent>

              <TextComponent numberOfLines={2}>
                <FormattedDateComponent date={new Date().toISOString()} length="long" /> (long)
              </TextComponent>

              <DividerComponent/>

              <SubTitleComponent>
                Dialogues
              </SubTitleComponent>

              <NblocksButton type='primary' title='Show confirmation dialogue' onPress={() => DialogueService.showConfirmation("Confirm", "This is a confirmation dialogue. Click Cancel or OK", "Ok", () => {})}></NblocksButton>
              
              <SubTitleComponent>
                Modals
              </SubTitleComponent>

              <NblocksButton type='primary' title='Open (half) modal #1' onPress={() => setHalfModalVisible(true)}></NblocksButton>
              <NblocksButton type='primary' title='Open (full) modal #2' onPress={() => setFullModalVisible(true)}></NblocksButton>

              <SubTitleComponent>
                Table
              </SubTitleComponent>
              {/* <UserListComponent></UserListComponent> */}

              <SubTitleComponent>
                Loading
              </SubTitleComponent>
              <View>
                <ActivityIndicator color="#32B768" size="large" />
              </View>

              <SubTitleComponent>
                UI helpers
              </SubTitleComponent>
              <AccessControllComponent roles={['OWNER']}>
                <TextComponent>AccessControllComponent : This text is only visible if you're an Owner</TextComponent>
              </AccessControllComponent>

          </DefaultPaddingComponent>

          <NblocksModalComponent visible={halfModalVisible} mode='half' onCloseModal={() => setHalfModalVisible(false)} swipable={false}>
            <View style={{flex: 1, alignContent: 'stretch'}}>
              <TitleComponent>
                Half modal
              </TitleComponent>
              <TextComponent style={{flex: 1}}>
                This is a "half" modal. Tap the outer area to close or use buttons...
              </TextComponent>
              <SubmitCancelButtonsComponent
                  submitText="Close" 
                  cancelText="Cancel"
                  onSubmit={() => setHalfModalVisible(false)} 
                  onCancel={() => setHalfModalVisible(false)}
              >
              </SubmitCancelButtonsComponent>
            </View>
          </NblocksModalComponent>

          <NblocksModalComponent visible={fullModalVisible} mode='full' onCloseModal={() => {}} swipable={false}>
            <View style={{flex: 1, alignContent: 'stretch'}}>
              <TitleComponent>
                This is a full modal
              </TitleComponent>
              <TextComponent style={{flex: 1}}>
                This is a "full" modal. Tap the buttons...
              </TextComponent>
              <SubmitCancelButtonsComponent 
                submitText="Save" 
                cancelText="Cancel" 
                onSubmit={() => setFullModalVisible(false)} 
                onCancel={() => setFullModalVisible(false)}>
              </SubmitCancelButtonsComponent>
            </View>
          </NblocksModalComponent>

        </ScrollView>
      )
}

export {BrandExpoScreen};