import React from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
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

export function SignUpSecondStep() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
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
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir senha'
                        />
                    </Form>

                    <Button
                        title='Cadastrar'
                        color={theme.colors.success}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}