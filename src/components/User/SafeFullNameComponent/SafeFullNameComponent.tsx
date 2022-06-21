import React, { FunctionComponent} from 'react';
import { Text, StyleSheet } from 'react-native';
const NBLOCKS_USER_NO_NAME = "Invited user";

const SafeFullNameComponent:FunctionComponent<{fullName: string | undefined}> = ({fullName}) => { 
  return(
    <Text style={styles.container}>{fullName ? fullName : NBLOCKS_USER_NO_NAME}</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});

export default SafeFullNameComponent;