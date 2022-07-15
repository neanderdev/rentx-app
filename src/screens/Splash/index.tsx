import { Inter_100Thin } from '@expo-google-fonts/inter';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import {
    Container
} from './styles';

export function Splash() {
    return (
        <Container>
            <Animated.View style={styles.box} />

            <Button title='Mover' onPress={() => { }} />
        </Container>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: Inter_100Thin,
        backgroundColor: 'red',
    }
});