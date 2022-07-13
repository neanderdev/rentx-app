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
    Accessories,
    About,
} from './styles';

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

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

                <Accessories>
                    <Accessory name="380km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={forceSvg} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="5 pessoas" icon={peopleSvg} />
                </Accessories>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
                    na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>
        </Container>
    );
}