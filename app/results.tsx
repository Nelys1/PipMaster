import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, TrendingUp } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function ResultsScreen() {
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  
  const {
    optimalLotSize = '1.25',
    riskInDollars = '125.00',
    riskRewardRatio = '1.5'
  } = params;

  const handleNewCalculation = () => {
    router.back();
  };

  const handleSaveResult = () => {
    // Implementation for saving result
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Result</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={[styles.resultCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.resultHeader}>
            <TrendingUp size={24} color={theme.colors.primary} />
            <Text style={[styles.resultTitle, { color: theme.colors.text }]}>
              Calculation Result
            </Text>
          </View>

          <View style={[styles.lotSizeContainer, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.lotSizeLabel}>Optimal Lot Size</Text>
            <Text style={styles.lotSizeValue}>{optimalLotSize}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                Risk in $
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                ${riskInDollars}
              </Text>
            </View>

            <View style={[styles.detailRow, styles.lastDetailRow]}>
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                Risk/Reward Ratio
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {riskRewardRatio}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.newCalculationButton, { borderColor: theme.colors.border }]}
            onPress={handleNewCalculation}
          >
            <Text style={[styles.buttonText, { color: theme.colors.text }]}>
              New Calculation
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton, { backgroundColor: theme.colors.textSecondary }]}
            onPress={handleSaveResult}
          >
            <Text style={[styles.buttonText, styles.saveButtonText]}>
              Save Result
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    flex: 1,
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  lotSizeContainer: {
    backgroundColor: '#36454F',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  lotSizeLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  lotSizeValue: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 56,
  },
  detailsContainer: {
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newCalculationButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
  },
});