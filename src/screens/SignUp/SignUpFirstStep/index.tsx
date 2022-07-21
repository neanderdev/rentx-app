import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import * as Yup from "yup";

import { useAuth } from '../../../hooks/auth';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
} from './styles';

export function SignUpFirstStep() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    const { user } = useAuth();
    console.log(user);

    function handleBack() {
        navigation.goBack();
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                email: Yup.string().required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                name: Yup.string().required('Nome é obrigatório'),
            });

            const data = { name, email, driverLicense };

            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', { user: data });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Error', error.message);
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton
                            onPress={handleBack}
                        />

                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>
                        Crie sua {'\n'}
                        conta
                    </Title>

                    <Subtitle>
                        Faça-se seu cadastro {'\n'}
                        forma rápida e fácil
                    </Subtitle>

                    <Form>
                        <FormTitle>
                            1. Dados
                        </FormTitle>

                        <Input
                            iconName='user'
                            placeholder='Nome'
                            value={name}
                            onChangeText={setName}
                        />

                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            value={driverLicense}
                            onChangeText={setDriverLicense}
                        />
                    </Form>

                    <Button
                        title='Próximo'
                        onPress={handleNextStep}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}