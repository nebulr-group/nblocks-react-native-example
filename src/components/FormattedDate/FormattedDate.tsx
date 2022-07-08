import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import { format } from 'date-fns'

const FormattedDateComponent: FunctionComponent<{date: string, length: 'short' | 'long'}> = ({date, length}) => {
  return (
    <Text>
      {format(Date.parse(date ? date : new Date().toISOString()), length === 'short' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:ii:ss')}
    </Text>
  );
}

export {FormattedDateComponent};