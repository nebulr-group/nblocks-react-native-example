import React, { FunctionComponent} from 'react';
import { Text } from 'react-native';

const NBLOCKS_USER_NO_NAME = "New account";

const SafeFullNameComponent:FunctionComponent<{tenantName: string | undefined, style?: any}> = ({tenantName, style}) => { 
  return(
    <Text style={style}>{tenantName ? tenantName : NBLOCKS_USER_NO_NAME}</Text>
  )
}

export {SafeFullNameComponent};