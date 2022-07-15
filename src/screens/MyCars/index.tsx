import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from "@expo/vector-icons";

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

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
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
                const response = await api.get('/schedules_byuser?user_id=1');

                setCars(response.data.car);
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
                    <Load />
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
                                                {item.startDate}
                                            </CarFooterDate>

                                            <AntDesign
                                                name="arrowright"
                                                size={20}
                                                color={theme.colors.title}
                                                style={{ marginHorizontal: 10 }}
                                            />

                                            <CarFooterDate>
                                                {item.endDate}
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