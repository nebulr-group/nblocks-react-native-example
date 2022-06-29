import React, { FunctionComponent, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { brandingConfig } from "../../utils/BrandingConfig";
import DividerComponent from "./DividerComponent";

type Item = {id: string} & any;

//TODO look for generics https://xebia.com/blog/generic-listitem-in-react-native-using-typescript/
const NblocksTable:FunctionComponent<{items: Item[], renderItem(item: Item): JSX.Element, onRefresh: () => void, loading: boolean }> = ({items, renderItem, loading, onRefresh}) => {
    
    return (
        <FlatList
            refreshing={loading}
            onRefresh={() => onRefresh()} 
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => renderItem(item) }
            ItemSeparatorComponent={() => <DividerComponent/>} 
          >
        </FlatList>
    )
}

const ItemComponent:FunctionComponent<{renderExpanded(): JSX.Element}> = ({renderExpanded, children}) => {
  
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand=()=>{
      //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    }
  
    return (
      <View>
        <TouchableOpacity onPress={() => toggleExpand()}>
          <View style={{height: 50, flexDirection: 'row', alignContent: 'space-between', alignItems: "center"}}>
            <View style={{flex: 10}}>
                <Text style={brandingConfig.subTitle}>
                    {children}
                </Text>
            </View>
            <View>
              <Text>
                {expanded ? "▼" : "◀︎"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {
          expanded && renderExpanded()
        }
      </View>
    )
  }

  const ExpandedContentComponent:FunctionComponent = ({children}) => {
    return (
      <View>
          {children}
      </View>
    )
  }

export default NblocksTable;
export {ItemComponent, ExpandedContentComponent}