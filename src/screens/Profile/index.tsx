import React from 'react';
import { useTheme } from 'styled-components';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
} from './styles';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {

  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton
            color={theme.colors.shape}
            onPress={handleBack}
          />

          <HeaderTitle>
            Editar Perfil
          </HeaderTitle>

          <LogutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: "https://avatars.githubusercontent.com/u/62663706?v=4" }} />

          <PhotoButton onPress={() => { }}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}