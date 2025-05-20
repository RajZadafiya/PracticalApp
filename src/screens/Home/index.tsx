import React from "react";
import { Button, Text, View } from "native-base";
import { RootStackScreenProps } from "interface";
import { useTtsPlayer } from "hooks/useTtsPlayer";
import { TextInput } from "react-native";
import * as Yup from 'yup';
import { FormikProps, useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "globals";

interface IHome {
    text: string;
}
const schema = Yup.object().shape({
    text: Yup.string().required('Please enter text'),
});

const Home = (props: RootStackScreenProps<'Home'>) => {
    const { navigation, route } = props;

    const { tryPlayText, tryStop } = useTtsPlayer();

    const initialValues: IHome = React.useMemo(() => ({
        text: '',
    }), []);


    React.useLayoutEffect(() => {
        const logoutUser = () => {
            AsyncStorage.removeItem(STORAGE_KEY)
            navigation.reset({
                index: 0,
                routes: [{ name: 'LogIn' }],
            });
        }
        navigation.setOptions({
            headerTitle: 'Home',
            headerShown: true,
            headerRight: () => (
                <Button
                    onPress={() => {
                        tryStop();
                        logoutUser()
                    }}
                    style={{ }}
                >
                    <Text>LogOut</Text>
                </Button>
            ),
        });
    }, [navigation, tryStop]);

    const onSubmit = React.useCallback(async (values: IHome) => {
        const { text } = values;
        try {
            await tryPlayText(text, 'en-US');
        } catch (error) {
            console.log('error: ', error);
        }
    }, [tryPlayText]);

    const formik: FormikProps<IHome> = useFormik<IHome>({
        initialValues,
        validationSchema: schema,
        validateOnChange: true,
        onSubmit,
    });

    const { handleSubmit, errors, handleBlur, handleChange, values } = formik;

    return (
        <View flex={1} justifyContent="center" alignItems="center">
            <TextInput
                placeholder="Enter text"
                value={values.text}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 10, width: '80%', height: 40, borderRadius: 20 }}
            />
            {errors?.text ? <Text color={'red.900'}>{errors?.text}</Text> : null}
            <Button
                onPress={() => handleSubmit()}
                style={{ marginBottom: 10 }}
            ><Text>Read Aloud</Text></Button>
        </View>
    )
}

export default Home;