import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';

export function Routes() {

  const { colors } = useTheme();
  // Editando a Background de navagação.
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    // Usa o Box e aplico para garantir que quando navegar de uma tela para outra
    // Na transição pode dar um efeito de transição. e apresentar o branco
    // Passando o <Box> com o background que já apliquei a casa página isso não acontecerá, 
    // juntamente com o flex:1
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}