import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";


type AuthRoutes = {
  signIn: undefined; //undefined pq não tem parametros sendo passado 
  signUp: undefined;
}
// Para a tipagem criei o AuthRoutes para tipagem interna, mas para usar em outros lugar reutilizar
// Criei o AuthNavigatorRoutesProps, que  é igual  ao NativeStackNavigationProp, que passa a tipagem que criei
// Assim sendo acessivel em outros lugares quando importado.
// Semana: 3, Conjunto: Rotas Públicas Aula: Tipando as Rotas minuto: 
export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

// Fazendo assim o createNativeStackNavigator<AuthRoutes>, ele mostra a 
// tipagem disponivel, nome da rota... no momento de passar o dados para as screens
const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    // Usamos o navigator para criar um contexto de navegação, e salva neste 
    // contexto as rotas disponiveis. 
    // O screenOptions={{ headerShown: false }} tira o nome o cabeça com o nome da rota da parte superior da página
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="signIn"
        component={SignIn}
      />

      <Screen
        name="signUp"
        component={SignUp}
      />
    </Navigator >
  )
}