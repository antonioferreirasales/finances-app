import { Platform } from 'react-native';
import { Home } from '@/screens/Home';
import { History } from '@/screens/History';
import { Profile } from '@/screens/Profile';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;
const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();
const iconSize = 24;

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          backgroundColor: colors.black[300],
          borderWidth: 0,
          height: Platform.OS === 'android' ? 70 : 96,
          marginBottom: 30,
          marginTop: 24,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={iconSize} color={color} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="finance"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle" size={iconSize} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
