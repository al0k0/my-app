import { Tabs } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // apna custom theme context
import type { RouteProp } from '@react-navigation/native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export default function TabsLayout() {
  const { theme } = useTheme(); // apna custom theme context se theme lo
  const isDark = theme === 'dark';

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={({ route }: { route: RouteProp<Record<string, object | undefined>, string> }) =>
          ({
            headerShown: false,
            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ color, size }) => {
              let iconName = '';

              if (route.name === 'index') {
                iconName = 'home';
              } else if (route.name === 'settings') {
                iconName = 'settings';
              }

              return <MaterialIcons name={iconName as any} size={size} color={color} />;
            },
          } satisfies BottomTabNavigationOptions)
        }
      />
    </NavigationThemeProvider>
  );
}
