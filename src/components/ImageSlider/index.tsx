import React from 'react';
import { FlatList } from 'react-native';

import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage,
} from './styles';

interface ImageSliderProps {
    imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
    return (
        <Container>
            <ImageIndexes>
                {imagesUrl.map((_, index) => (
                    <ImageIndex
                        key={String(index)}
                        active={true}
                    />
                ))}
            </ImageIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={key => key}
                renderItem={({ item }) =>
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                }
                horizontal
                showsHorizontalScrollIndicator={false}
            />

        </Container>
    );
}