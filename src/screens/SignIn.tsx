import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn() {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
      {/*Passa o {flexGrow: 1 } *para ocupar toda a tela.*/}
      {/* VStack=> Coloca uma coisa em baixo da outro */}
      <VStack flex={1} bg={'gray.700'} px={5} pb={16}>
        <Image // Usando Image com position="absolute" temos mais opções se usar-se o background-Image
          source={BackgroundImg}
          alt="Background"
          resizeMode="contain" // O resizeMode como "contain" a imagem não estiva tanto.
          position="absolute" //usamos o absolute para tudo ficar em cima dela
        />

        <Center my={24}>  {/*o 24 é os tamanho do theme, seria 96px */}
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>

        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse a conta
          </Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none" //Mantem as letrar em minusculo
          />
          <Input
            placeholder="Senha"
            secureTextEntry // Input se nha 
          />

          <Button
            title='Acessar'

          />
        </Center>

        <Center mt={24}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily='body'
          >
            Não tem acesso?
          </Text>

          <Button
            title='Criar conta'
            variant="outline"
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}