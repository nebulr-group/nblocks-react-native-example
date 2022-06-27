import React, { FunctionComponent, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FormattedDateComponent from '../../components/FormattedDate/FormattedDate';
import DefaultPaddingComponent from '../../components/shared/DefaultPaddingComponent';
import IngressComponent from '../../components/shared/IngressComponent';
import NblocksButton from '../../components/shared/NblocksButton';
import NblocksModalComponent from '../../components/shared/NblocksModalComponent';
import SubmitCancelButtonsComponent from '../../components/shared/SubmitCancelButtonsComponent';
import SubTitleComponent from '../../components/shared/SubTitleComponent';
import TitleComponent from '../../components/shared/TitleComponent';
import UserListComponent from '../../components/User/UserListComponent/UserListComponent';

const BrandExpoScreen: FunctionComponent<{}> = () => {

    const [halfModalVisible, setHalfModalVisible] = useState(false);
    const [fullModalVisible, setFullModalVisible] = useState(false);

      return (
        <ScrollView style={{flex: 1}}>
          <DefaultPaddingComponent>

            <View>
              <TitleComponent>
                This is a title
              </TitleComponent>

              <SubTitleComponent>
                This is a sub title
              </SubTitleComponent>

              <IngressComponent>
                This is a text ingress
              </IngressComponent>

              <Text>
              This is normal text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque massa vel velit fermentum, sed vestibulum augue egestas. Aenean blandit nisl ac mi tempor, a vestibulum mi malesuada. Cras hendrerit, massa et semper interdum, lacus turpis rutrum arcu, in sagittis nisl dui at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae turpis ex. Praesent tellus est, placerat quis hendrerit in, gravida id libero. Vivamus posuere a magna sed posuere. Maecenas sagittis porttitor malesuada. Phasellus auctor purus vel volutpat posuere. Nam quis ipsum quis ipsum sollicitudin dapibus. Donec gravida viverra nulla, in porttitor tortor gravida at. Aenean nunc nibh, convallis non commodo tincidunt, porta iaculis odio. Pellentesque non sem fringilla, posuere neque ac, mattis nulla.
              </Text>

              <SubTitleComponent>
                Buttons
              </SubTitleComponent>
              <NblocksButton title='Default btn' onPress={() => {}}></NblocksButton>
              <NblocksButton title='Primary btn' onPress={() => {}} type='primary'></NblocksButton>
              <NblocksButton title='Danger btn' onPress={() => {}} type='danger'></NblocksButton>

              <SubTitleComponent>
                Dates
              </SubTitleComponent>

              <Text numberOfLines={2}>
                <FormattedDateComponent date={new Date().toISOString()} length="short" /> (short)
              </Text>

              <Text numberOfLines={2}>
                <FormattedDateComponent date={new Date().toISOString()} length="long" /> (long)
              </Text>

              <SubTitleComponent>
                Modals
              </SubTitleComponent>

              <NblocksButton type='primary' title='Open (half) modal #1' onPress={() => setHalfModalVisible(true)}></NblocksButton>
              <NblocksButton type='primary' title='Open (full) modal #2' onPress={() => setFullModalVisible(true)}></NblocksButton>

              <SubTitleComponent>
                Table
              </SubTitleComponent>
              {/* <UserListComponent></UserListComponent> */}
            </View>

            <NblocksModalComponent visible={halfModalVisible} mode='half' onCloseModal={() => setHalfModalVisible(false)} swipable={false}>
              <DefaultPaddingComponent>
                <TitleComponent>
                  This is a half modal
                </TitleComponent>
                <Text>
                  Tap the outer area to close
                </Text>
              </DefaultPaddingComponent>
            </NblocksModalComponent>

            <NblocksModalComponent visible={fullModalVisible} mode='full' onCloseModal={() => {}} swipable={false}>
              <DefaultPaddingComponent>
                <View>
                  <TitleComponent>
                    This is a full modal
                  </TitleComponent>
                  
                  <SubmitCancelButtonsComponent 
                    submitText="Save" 
                    cancelText="Cancel" 
                    onSubmit={() => setFullModalVisible(false)} 
                    onCancel={() => setFullModalVisible(false)}>
                  </SubmitCancelButtonsComponent>

                </View>
              </DefaultPaddingComponent>
            </NblocksModalComponent>

          </DefaultPaddingComponent>
        </ScrollView>
      )
}

export default BrandExpoScreen;