import React from 'react';

import {
    Container,
    Header,
    CarImage,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

export function CarDetail() {
    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />
            </Header>

            <CarImage>
                <ImageSlider
                    imagesUrl={["https://purepng.com/public/uploads/large/purepng.com-audi-r8audicars-961524670148fabn4.png"]}
                />
            </CarImage>
        </Container>
    );
}