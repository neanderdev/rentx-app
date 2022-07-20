import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

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

    function handleBack() {
        navigation.goBack();
    }

    return (
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
            </Form>
        </Container>
    );
}