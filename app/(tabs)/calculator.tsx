// import { View, Text, StyleSheet } from 'react-native';
// import { useTheme } from '@/hooks/useTheme';

// export default function CalculatorScreen() {
//   const { theme } = useTheme();

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <Text style={[styles.text, { color: theme.colors.text }]}>
//         Calculator Tab - This redirects to the calculator form
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//   },
// });
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ChevronLeft, ChevronDown, Info } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

const currencyPairs = [
  'Volatility 75 Index',
  'Volatility 50 Index', 
  'Volatility 25 Index',
  'Volatility 10 Index',
  'Boom 1000 Index',
  'Crash 1000 Index',
  'Step Index 200',
  'Step Index 500',
];

export default function CalculatorScreen() {
  const { theme } = useTheme();
  const [accountBalance, setAccountBalance] = useState('25000');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [entryPrice, setEntryPrice] = useState('1.08050');
  const [stopLoss, setStopLoss] = useState('1.07900');
  const [riskAmount, setRiskAmount] = useState('1.0');
  const [riskType, setRiskType] = useState<'$' | '%'>('$');

  const handleCalculate = () => {
    if (!accountBalance || !selectedIndex || !entryPrice || !stopLoss || !riskAmount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const balance = parseFloat(accountBalance);
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);
    const risk = parseFloat(riskAmount);

    if (balance <= 0 || entry <= 0 || stop <= 0 || risk <= 0) {
      Alert.alert('Error', 'Please enter valid positive numbers');
      return;
    }

    // Calculate risk amount in dollars
    const riskInDollars = riskType === '%' ? (balance * risk) / 100 : risk;
    
    // Calculate pip difference
    const pipDifference = Math.abs(entry - stop);
    
    // Calculate lot size (simplified formula for demo)
    const optimalLotSize = riskInDollars / (pipDifference * 10);
    
    // Calculate risk/reward ratio
    const riskRewardRatio = 1.5; // Default assumption

    // Navigate to results with calculated values
    router.push({
      pathname: '/results',
      params: {
        optimalLotSize: optimalLotSize.toFixed(2),
        riskInDollars: riskInDollars.toFixed(2),
        riskRewardRatio: riskRewardRatio.toString(),
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Calculator</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Account Balance */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Account Balance ($)</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border 
              }]}
              value={accountBalance}
              onChangeText={setAccountBalance}
              keyboardType="numeric"
              placeholder="25000"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity style={styles.infoButton}>
              <Info size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Select Index */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Select Index</Text>
          <TouchableOpacity
            style={[styles.dropdown, { 
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border 
            }]}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={[
              styles.dropdownText,
              { color: selectedIndex ? theme.colors.text : theme.colors.textSecondary }
            ]}>
              {selectedIndex || 'Select a currency pair'}
            </Text>
            <ChevronDown size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          {showDropdown && (
            <View style={[styles.dropdownList, { 
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border 
            }]}>
              {currencyPairs.map((pair, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedIndex(pair);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, { color: theme.colors.text }]}>
                    {pair}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Entry Price */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Entry Price</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border 
              }]}
              value={entryPrice}
              onChangeText={setEntryPrice}
              keyboardType="numeric"
              placeholder="1.08050"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity style={styles.infoButton}>
              <Info size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stop Loss */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Stop Loss (SL)</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border 
              }]}
              value={stopLoss}
              onChangeText={setStopLoss}
              keyboardType="numeric"
              placeholder="1.07900"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity style={styles.infoButton}>
              <Info size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Risk Amount */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Risk Amount</Text>
          <View style={styles.riskContainer}>
            <View style={styles.riskTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.riskTypeButton,
                  styles.leftButton,
                  riskType === '$' && [styles.activeRiskType, { backgroundColor: theme.colors.primary }]
                ]}
                onPress={() => setRiskType('$')}
              >
                <Text style={[
                  styles.riskTypeText,
                  riskType === '$' && styles.activeRiskTypeText
                ]}>$</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.riskTypeButton,
                  styles.rightButton,
                  riskType === '%' && [styles.activeRiskType, { backgroundColor: theme.colors.primary }]
                ]}
                onPress={() => setRiskType('%')}
              >
                <Text style={[
                  styles.riskTypeText,
                  riskType === '%' && styles.activeRiskTypeText
                ]}>%</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.riskInput, { 
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border 
              }]}
              value={riskAmount}
              onChangeText={setRiskAmount}
              keyboardType="numeric"
              placeholder="1.0"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        {/* Calculate Button */}
        <TouchableOpacity
          style={[styles.calculateButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  infoButton: {
    marginLeft: 12,
    padding: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownList: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskTypeButtons: {
    flexDirection: 'row',
    marginRight: 12,
  },
  riskTypeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  leftButton: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  rightButton: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  activeRiskType: {
    backgroundColor: '#36454F',
  },
  riskTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#565D6D',
  },
  activeRiskTypeText: {
    color: '#FFFFFF',
  },
  riskInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  calculateButton: {
    height: 56,
    backgroundColor: '#36454F',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});