import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_300Light } from '@expo-google-fonts/roboto';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/hooks/useTheme';

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Roboto_300Light,
  });
  const { theme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(async () => {
        try {
          const userToken = await AsyncStorage.getItem('userToken');
          if (userToken) {
            router.replace('/(tabs)/home');
          } else {
            router.replace('/auth');
          }
        } catch (error) {
          router.replace('/auth');
        }
        setIsReady(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isReady) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: "#1E2128" }]}>
      <LinearGradient
        colors={['#F3F4F6', '#B9BFCA']}
        style={[styles.circle, styles.topCircle]}
      />
      
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>PipMaster</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>Smart Risk. Smarter Trades.</Text>
      
      <LinearGradient
        colors={['#F3F4F6', '#B9BFCA']}
        style={[styles.circle, styles.bottomCircle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2128',
  },
  topCircle: {
    position: 'absolute',
    top: 155,
    left: 41,
    width: 112,
    height: 112,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: 155,
    right: 42,
    width: 112,
    height: 112,
  },
  circle: {
    borderRadius: 9999,
  },
  logoContainer: {
    position: 'absolute',
    top: 344,
    left: 154,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    top: 424,
    left: 115,
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    position: 'absolute',
    top: 475,
    left: 84,
    fontFamily: 'Roboto_300Light',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '300',
    color: '#FFFFFF',
  },
});