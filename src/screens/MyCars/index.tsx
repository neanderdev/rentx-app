import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';

import { api } from '../../services/api';

import { Car as ModelCar } from '../../database/model/Car';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/rentals');

                const dataFormatted = response.data.map((data: CarProps) => {
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                    };
                });

                setCars(dataFormatted);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

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
                    Seus agendamentos, {'\n'}
                    estão aqui.
                </Title>

                <Subtitle>
                    Conforto, segurança e praticidade.
                </Subtitle>
            </Header>

            {loading
                ? (
                    <LoadAnimation />
                )
                : (
                    <Content>
                        <Appointments>
                            <AppointmentsTitle>
                                Agendamentos feitos
                            </AppointmentsTitle>

                            <AppointmentsQuantity>
                                {cars.length}
                            </AppointmentsQuantity>
                        </Appointments>

                        <FlatList
                            data={cars}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <CarWrapper>
                                    <Car data={item.car} />

                                    <CarFooter>
                                        <CarFooterTitle>
                                            Período
                                        </CarFooterTitle>

                                        <CarFooterPeriod>
                                            <CarFooterDate>
                                                {item.start_date}
                                            </CarFooterDate>

                                            <AntDesign
                                                name="arrowright"
                                                size={20}
                                                color={theme.colors.title}
                                                style={{ marginHorizontal: 10 }}
                                            />

                                            <CarFooterDate>
                                                {item.end_date}
                                            </CarFooterDate>
                                        </CarFooterPeriod>
                                    </CarFooter>
                                </CarWrapper>
                            }
                        />
                    </Content>
                )
            }
        </Container>
    );
}