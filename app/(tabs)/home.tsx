import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calculator, Clock, Settings } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/hooks/useTheme';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('userName') || 'Trader';
      setUserName(name);
    } catch (error) {
      setUserName('Trader');
    }
  };

  const navigateToCalculator = () => {
    router.push('/calculator-form');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
            Welcome back, {userName}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Access</Text>
          
          <TouchableOpacity 
            style={[styles.quickAccessItem, { backgroundColor: theme.colors.card }]}
            onPress={navigateToCalculator}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
              <Calculator size={24} color="#FFFFFF" />
            </View>
            <View style={styles.itemContent}>
              <Text style={[styles.itemTitle, { color: theme.colors.text }]}>
                Lot Size Calculator
              </Text>
              <Text style={[styles.itemDescription, { color: theme.colors.textSecondary }]}>
                Determine optimal lot sizes for your trades.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickAccessItem, { backgroundColor: theme.colors.card }]}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.secondary }]}>
              <Clock size={24} color="#FFFFFF" />
            </View>
            <View style={styles.itemContent}>
              <Text style={[styles.itemTitle, { color: theme.colors.text }]}>
                Trade History
              </Text>
              <Text style={[styles.itemDescription, { color: theme.colors.textSecondary }]}>
                Review your past calculations and outcomes.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickAccessItem, { backgroundColor: theme.colors.card }]}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.accent }]}>
              <Settings size={24} color="#FFFFFF" />
            </View>
            <View style={styles.itemContent}>
              <Text style={[styles.itemTitle, { color: theme.colors.text }]}>
                App Settings
              </Text>
              <Text style={[styles.itemDescription, { color: theme.colors.textSecondary }]}>
                Configure your preferences and account.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 80,
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});