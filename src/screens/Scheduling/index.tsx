import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';

import ArrowSvg from "../../assets/arrow.svg";

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling() {
    const theme = useTheme();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleSchedulingDetails() {
        navigation.navigate('SchedulingDetails');
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <BackButton
                    color={theme.colors.shape}
                    onPress={() => { }}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do alugel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>
                            DE
                        </DateTitle>

                        <DateValue selected={false}>13/07/2022</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>
                            ATÉ
                        </DateTitle>

                        <DateValue selected={false}>20/07/2022</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleSchedulingDetails}
                />
            </Footer>
        </Container>
    );
}