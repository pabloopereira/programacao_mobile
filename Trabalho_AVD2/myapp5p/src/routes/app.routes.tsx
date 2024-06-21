import { createBottomTabNavigator, BottomTabNavigationProp }
  from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

import { Cadastro } from '../pages/Cadastro'
import { Lista } from '../pages/Lista'
import { Resumo } from '../pages/Resumo'

type AppRoutes = {
  Cadastro: undefined;
  Lista: undefined;
  Resumo: undefined
}

export type AppNavigationRoutesProp =
  BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator screenOptions={{
      headerShown: false,
      // tabBarShowLabel: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: theme.colors.secondary,
      tabBarInactiveTintColor: theme.colors.text,
      tabBarStyle: {
        height: 88
      }
    }}>
      <Screen
        name='Cadastro'
        component={Cadastro}
        options={{
          tabBarLabel: 'cadastro',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='add'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='Lista'
        component={Lista}
        options={{
          tabBarLabel: 'Listagem',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='list'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='Resumo'
        component={Resumo}
        options={{
          tabBarLabel: 'cálculo',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='search'
              size={size}
              color={color}
            />
          )
        }}
      />

    </Navigator>
  )

}