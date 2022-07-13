import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from "../../assets/logo.svg";

import { Car } from '../../components/Car';

import {
    Container,
    HeaderContent,
    Header,
    TotalCars,
    CarList,
} from './styles';

export function Home() {
    const carData = {
        brand: 'Audi',
        name: 'R8',
        rent: {
            period: 'Ao dia',
            price: 120,
        },
        thumbnail: "https://purepng.com/public/uploads/large/purepng.com-audi-r8audicars-961524670148fabn4.png",
    };

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(100)}
                        height={RFValue(12)}
                    />

                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <CarList
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={carData} />}
            />
        </Container>
    );
}