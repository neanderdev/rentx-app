import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

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

import { getPlataformDate } from '../../utils/getPlataformDate';

import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
} from '../../components/Calendar';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling() {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const route = useRoute();
    const { car } = route.params as Params;

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    function handleSchedulingDetails() {
        if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
            Alert.alert('Seleciona o intervalo para alugar.');
        } else {
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates),
            });
        }
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

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
        });
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

                        <DateValue
                            selected={!!rentalPeriod.startFormatted}
                        >
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>
                            ATÉ
                        </DateTitle>

                        <DateValue
                            selected={!!rentalPeriod.endFormatted}
                        >
                            {rentalPeriod.endFormatted}
                        </DateValue>
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