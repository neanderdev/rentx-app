import React, { useState } from 'react';
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
import {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
} from '../../components/Calendar';

export function Scheduling() {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);

    function handleSchedulingDetails() {
        navigation.navigate('SchedulingDetails');
    }

    function handleBack() {
        navigation.goBack();
    }

    function handleChageDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);

        const interval = generateInterval(start, end);

        setMarkedDates(interval);
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
                    onPress={handleBack}
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
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChageDate}
                />
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