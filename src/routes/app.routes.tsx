import { Platform } from 'react-native'
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import HomeSvg from "@assets/home.svg";
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";

// Tipagem interna
type AppRoutes = {
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined;
}

//Tipagem para exportar, ao ser necessario usar as rotas
export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

// Fazendo assim o createBottomTabNavigator<AppRoutes>, ele mostra a
// tipagem disponivel, nome da rota... no momento de passar o dados para as screens
const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];


  return (
    <Navigator screenOptions={{
      headerShown: false, // Esconde o header
      tabBarShowLabel: false, // Esconde a labels 
      tabBarActiveTintColor: colors.green[500], // Cor do icone da tab Ativo 
      tabBarInactiveTintColor: colors.gray[200],  // Cor do icone da tab inativa
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        paddingVertical: sizes[4],
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6],

      }
    }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}

      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}

      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }} // isso aqui faz o botão não aparecer, porém a rota esta disponivel
      />
    </Navigator>
  )
}