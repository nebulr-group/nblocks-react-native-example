import React, { FunctionComponent} from 'react';
import { Text } from 'react-native';
const NBLOCKS_USER_NO_NAME = "Invited user";

const SafeFullNameComponent:FunctionComponent<{fullName: string | undefined, style?: any}> = ({fullName, style}) => { 
  return(
    <Text style={style}>{fullName ? fullName : NBLOCKS_USER_NO_NAME}</Text>
  )
}

export {SafeFullNameComponent};