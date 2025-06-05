import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? '#000' : '#fff',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: isDark ? '#fff' : '#000',
          marginBottom: 16,
        }}
      >
        Settings
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: isDark ? '#fff' : '#000' }}>
          Dark Mode
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
    </SafeAreaView>
  );
}
