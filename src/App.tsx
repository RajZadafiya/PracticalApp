/**
 * @format
 */
import React from 'react';
import { StatusBar, Text, TextInput, useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppProviders from './AppProvider';
import NavContainer from 'navigation';

function SubApp() {

    const currentTheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <StatusBar
                barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <NavContainer />
        </NativeBaseProvider>
    );
}

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
    defaultProps?: { allowFontScaling?: boolean };
}

function App() {
    const disableScaling = () => {
        (Text as unknown as TextWithDefaultProps).defaultProps =
            (Text as unknown as TextWithDefaultProps).defaultProps || {};
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
            false;
        (TextInput as unknown as TextInputWithDefaultProps).defaultProps =
            (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (
            TextInput as unknown as TextInputWithDefaultProps
        ).defaultProps!.allowFontScaling = false;
    };

    React.useEffect(() => {
        disableScaling();
    }, []);

    const style = { flex: 1 };

    return (
        <GestureHandlerRootView style={style}>
            <AppProviders>
                <SubApp />
            </AppProviders>
        </GestureHandlerRootView>
    );
}

export default App;
