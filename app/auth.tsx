import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EyeOff } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store user token
      await AsyncStorage.setItem('userToken', 'demo_token_123');
      await AsyncStorage.setItem('userName', 'John');

      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.screenContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              styles.loginTab,
              activeTab === 'login' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('login')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'login'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              styles.signupTab,
              activeTab === 'signup' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('signup')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'signup'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { color: '#1F2937', borderColor: theme.colors.border },
            ]}
            placeholder="Your email address"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.passwordContainer,
              { borderColor: theme.colors.border },
            ]}
          >
            <TextInput
              style={[styles.passwordInput, { color: '#1F2937' }]}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <EyeOff size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text
            style={[styles.forgotText, { color: theme.colors.textSecondary }]}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleAuth}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading
              ? 'Loading...'
              : activeTab === 'login'
              ? 'Login'
              : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {/* Continue with */}
        <Text
          style={[styles.continueText, { color: theme.colors.textSecondary }]}
        >
          or continue with
        </Text>

        {/* Social Buttons */}
        {/* Google Button */}
        <TouchableOpacity
          style={[
            styles.socialButton,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Ionicons
            name="logo-google"
            size={20}
            color={theme.colors.text}
            style={styles.icon}
          />
          <Text style={[styles.socialButtonText, { color: theme.colors.text }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Apple Button */}
        <TouchableOpacity
          style={[
            styles.socialButton,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Ionicons
            name="logo-apple"
            size={20}
            color={theme.colors.text}
            style={styles.icon}
          />
          <Text style={[styles.socialButtonText, { color: theme.colors.text }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1E2128',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 342,
    height: 612,
    backgroundColor: '#FAFAFB',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 32,
    padding: 6,
  },
  tabButton: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  loginTab: {},
  signupTab: {},
  activeTab: {
    backgroundColor: '#36454F',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#565D6D',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeButton: {
    padding: 12,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    color: '#565D6D',
  },
  loginButton: {
    height: 48,
    backgroundColor: '#36454F',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#565D6D',
    marginBottom: 16,
  },
  socialButton: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    marginRight: 0,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
});
