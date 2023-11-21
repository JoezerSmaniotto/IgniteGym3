import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import axios from 'axios';
import { api } from '@services/api'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';


type FormDataProps = {
  name: string,
  email: string,
  password: string
  password_confirm: string,
};


const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha  deve ter pelo menos 6 digitos.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere')
});


export function SignUp() {
  //useForm<FormDataProps>() por causa da tipagem, dentro na Controller na prop Name: já apresenta as opçoes disponiveis com base na tipagem que criei.
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  // Usamos o control é quem vai dizer para os inputs quem vai controlar
  // O Controller por sua vez é quem vai controlar os Inputs

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack(); // Retorna para a tela anterior.
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    // Rota / Obj de dados
    try {
      const response = await api.post('/user', { name, email, password })
      console.log(response.data);
    } catch (error) {
      // Verifica se o Erro vem do AXIOS -> Neste caso se tentar cadastrar
      // o mesmo e-mail irá apresentar mensagem de erro "Este e-mail já esta cadastrado."
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
        console.log(error)
      }
    }
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
      {/*Passa o {flexGrow: 1 } *para ocupar toda a tela.*/}
      {/* VStack=> Coloca uma coisa em baixo da outro */}
      <VStack flex={1} px={5} pb={16}>
        <Image // Usando Image com position="absolute" temos mais opções se usar-se o background-Image
          source={BackgroundImg}
          defaultSource={BackgroundImg} // Entende que a imagem é padrão, então carrega a imagem mais rápido
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
            Criar sua conta
          </Heading>

          <Controller
            control={control}
            name="name" // name é unico para cada input, pq é ele que diferencia cada input
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}// Para mudança de valores
                value={value} // Quando definimos o estado inicial
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Informe o e-mail',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />


          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)} // Faz isso para no neste ultimo input já poder enviar enviar sem precisar clicar no botão especifico, aqui seir ano botão de "OK" do teclado para disparar a função. 
                returnKeyType='send' // troca o botão OK do teclado pelo de enviar
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />


          <Button
            title='Criar a acessar'
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title='Voltar para o login'
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />

      </VStack>
    </ScrollView>
  );
}