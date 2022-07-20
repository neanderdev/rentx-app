import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
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

interface Params {
    user: {
        name: string;
        email: string;
        cnh: string;
    };
}

export function SignUpSecondStep() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { user } = route.params as Params;

    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert('Informe a senha e a confirmação');
        }

        if (password != passwordConfirm) {
            return Alert.alert('As senhas não são iguais');
        }

        // Enviar para API e cadastrar
        navigation.navigate('Confirmation', {
            title: 'Conta Criada!',
            message: `Agora é só fazer login\ne aproveitar.`,
            nextScreenRoute: 'SignIn',
        });
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
                            <Bullet />
                            <Bullet active />
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
                            2. Senha
                        </FormTitle>

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            value={password}
                            onChangeText={setPassword}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir senha'
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                        />
                    </Form>

                    <Button
                        title='Cadastrar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}