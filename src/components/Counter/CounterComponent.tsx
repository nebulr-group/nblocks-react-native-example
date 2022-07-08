import React, { FunctionComponent, useState } from 'react';
import { Button, Text, View } from 'react-native';

const CounterComponent: FunctionComponent<{}> = ({}) => {
  const [count, setCount] = useState(0);

  const onPressButton = () => {
    setCount(count + 1);
  }

  return (
    <View>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => onPressButton()}
        title="Click me!"
      />
    </View>
  );
}

export  {CounterComponent};