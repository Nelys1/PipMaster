import { Tabs } from 'expo-router';
import { Chrome as Home, Calculator, User, Sun, Moon } from 'lucide-react-native';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
      <View style={{ position: 'absolute', top: 50, right: 20, zIndex: 1000 }}>
        <TouchableOpacity onPress={toggleTheme} style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.colors.card,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}>
          {theme.isDark ? (
            <Sun size={20} color={theme.colors.text} />
          ) : (
            <Moon size={20} color={theme.colors.text} />
          )}
        </TouchableOpacity>
      </View>
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#36454F',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calculator"
          options={{
            title: 'Calculator',
            tabBarIcon: ({ size, color }) => (
              <Calculator size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}