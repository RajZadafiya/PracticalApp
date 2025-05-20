import React from "react";
import { RootStackScreenProps } from "interface";
import { Button, Text, View } from "native-base";
import * as Yup from 'yup';
import { FormikProps, useFormik } from "formik";
import { STORAGE_KEY } from "globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";

interface ILogIn {
    email: string;
    password: string;
}
const schema = Yup.object().shape({
    email: Yup.string().email().required('Please enter email'),
    password: Yup.string().required('Please enter password').test('len', 'Password must be at least 6 characters', val => val?.length >= 6),
});

const LogIn = (props: RootStackScreenProps<'LogIn'>) => {
    const { navigation, route } = props;
    const initialValues: ILogIn = React.useMemo(() => ({
        email: 'test@example.com',
        password: '123456',
    }), []);

    const onSubmit = React.useCallback(async (values: ILogIn) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, 'true');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (error) {
            console.log('error: ', error);
        }
    }, []);

    const formik: FormikProps<ILogIn> = useFormik<ILogIn>({
        initialValues,
        validationSchema: schema,
        validateOnChange: true,
        onSubmit,
    });

    const { handleSubmit, errors, handleBlur, handleChange, values } = formik;

    return (
        <View flex={1} justifyContent="center" alignItems="center">
            <Text fontSize={50} color={'black'} >LogIn</Text>

            <TextInput
                placeholder="Enter email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 10, width: '80%', height: 40, borderRadius: 20, marginTop: 30 }}
            />
            {errors?.email ? <Text color={'red.900'}>{errors?.email}</Text> : null}

            <TextInput
                placeholder="Enter password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 10, width: '80%', height: 40, borderRadius: 20 }}
            />
            {errors?.password ? <Text color={'red.900'}>{errors?.password}</Text> : null}
            <Button
                onPress={() => handleSubmit()}
                style={{ marginBottom: 10 }}
            ><Text>LogIn</Text></Button>
        </View>
    )
}

export default LogIn;