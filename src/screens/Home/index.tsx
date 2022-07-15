import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from 'styled-components';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from "../../assets/logo.svg";

import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
    Container,
    HeaderContent,
    Header,
    TotalCars,
    CarList,
} from './styles';

export function Home() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const theme = useTheme();

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonSTyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ],
        };
    });

    const onGestureHandler = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            /* PARA VOLTAR PARA AONDE ESTAVA (PADRÃO) */
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        },
    });

    function handleCarDetail(car: CarDTO) {
        navigation.navigate('CarDetail', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars');

                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        });

        return () => BackHandler.removeEventListener('hardwareBackPress', () => {
            return true
        });
    }, []);

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

                    {
                        !loading &&
                        <TotalCars>
                            {`Total de ${cars.length} carros`}
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {loading
                ? <Load />
                : <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Car
                            data={item}
                            onPress={() => handleCarDetail(item)}
                        />
                    }
                />
            }

            <PanGestureHandler onGestureEvent={onGestureHandler}>
                <Animated.View
                    style={[
                        myCarsButtonSTyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22,
                        }
                    ]}
                >
                    <ButtonAnimated
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                        onPress={handleOpenMyCars}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});