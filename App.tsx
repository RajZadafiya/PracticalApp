/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const START_TIME = 30

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    justifyContent: 'center',
    alignItems: "center"
  };

  const [timer, setTimer] = React.useState({ time: START_TIME, firstInteration: false });

  React.useEffect(() => {
    const tm = setInterval(() => {
      if (timer.time == 0) {
        clearInterval(tm)
        setTimer(prev => ({ ...prev, firstInteration: true }))
      } else {
        setTimer(prev => ({ ...prev, time: prev.time - 1 }))
      }
    }, 1000)

    if (timer.firstInteration) {
      clearInterval(tm)
    }

    return () => clearInterval(tm)
  }, [timer])

  const onResetPress = () => {
    setTimer({ firstInteration: false, time: 30 })
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text style={styles.textStyle}>{timer.time}</Text>
      <Button title='Reset' onPress={onResetPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 32,
    fontSize: 25,
    textAlign: 'center'
  },
});

export default App;
