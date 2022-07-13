import React from 'react';

import {
    Container,
    Header,
    CarImage,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
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

            <Content>
                <Details>
                    <Description>
                        <Brand>Audi</Brand>

                        <Name>R8</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>

                        <Price>R$ 120</Price>
                    </Rent>
                </Details>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
                    na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>
        </Container>
    );
}