import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from "yup";
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Form,
    Footer,
} from './styles';

export function SignIn() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const theme = useTheme();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                password: Yup.string().required('A senha é obrigatória'),
                email: Yup.string().required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
            });

            await schema.validate({ email, password });

            Alert.alert('Tudo certo');

            // Fazer login
            await signIn({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Error', error.message);
            } else {
                return Alert.alert(
                    'Erro na autentitacação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                );
            }
        }
    }

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />

                    <Header>
                        <Title>
                            Estamos {'\n'}
                            quase lá.
                        </Title>

                        <Subtitle>
                            Faça seu login para começar {'\n'}
                            uma expriência incrível.
                        </Subtitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={email}
                            onChangeText={setEmail}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />

                        <Button
                            title="Criar conta gratuita"
                            color={theme.colors.background_secondary}
                            light={true}
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}