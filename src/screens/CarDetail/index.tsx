import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import {
    Container,
    Header,
    CarImage,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    About,
    Footer,
} from './styles';

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

interface Params {
    car: CarDTO;
}

export function CarDetail() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP,
            ),
        };
    });

    function handleConfirmRental() {
        navigation.navigate('Scheduling', {
            car
        });
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <Animated.View
                style={[headerStyleAnimation]}
            >
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>

                <CarImage>
                    <ImageSlider
                        imagesUrl={car.photos}
                    />
                </CarImage>
            </Animated.View>


            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight(),
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>

                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>

                        <Price>{`R$  ${car.rent.price}`}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}