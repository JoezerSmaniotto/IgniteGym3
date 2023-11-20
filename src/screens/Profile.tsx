import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import *  as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FileInfo } from "expo-file-system";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("http://github.com/joezersmaniotto.png");

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,// tipo se arquivos que podem ser selecionado, se imagem, video ou ambos
        quality: 1, // Qualidade de imagem, 1 é alta qualidade, maior proximo a 0 qualidade mais baixa.
        aspect: [4, 4], // Colocar uma imagem quadrada
        allowsEditing: true, // Usuário poder editar a imagem assim que ele selecionar, podendo recortar, girar, ... a imagem, para a região  que ele quer usar da imagem.

      });
      //console.log(photoSelected);

      if (photoSelected.canceled) return; // Se o usuário seleciona e volta, tratamos para não fazer nada, pq o usuário abandonou a seleção

      if (photoSelected.assets[0].uri) {// garante que existe a URI para atualizar a imagem
        //const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) as FileInfo // Ver isso e criou tipagem pq não reconhecia a tipagem o "size"
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) { // size em bytes converter para megaBytes
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma até 5MB.",
            placement: 'top',// Local aonde aparece o toast, padrão e´ no bottom
            bgColor: 'red.500'// Cor do background, padrão é branco.
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false) // Finaliza o loading de carregamento da imagem, no caso Skeleton
    }

  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
              <Skeleton
                h={PHOTO_SIZE}
                w={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
              :
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8} >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            bg="gray.600"
          />

          <Input
            bg="gray.600"
            placeholder='E-mail'
            value="joezer@gmail.com"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
            Alterar senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder='Senha antiga'
            secureTextEntry // Coloca as bolinhas na senha 
          />
          <Input
            bg="gray.600"
            placeholder='Nova senha'
            secureTextEntry // Coloca as bolinhas na senha 
          />
          <Input
            bg="gray.600"
            placeholder='Confirme a nova senha'
            secureTextEntry // Coloca as bolinhas na senha 
          />

          <Button
            title='Atualizar'
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}