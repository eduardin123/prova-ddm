import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

export default function LoginScreen({ navigation }: { navigation: any }) {
  // Estados para armazenar os valores dos inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função que valida as credenciais e navega para a tela List
  const handleLogin = () => {
    if (email === 'admin@admin.com' && password === '1234') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas!');
    }
  };

  return (
    <View style={styles.container}>
      
<View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="E-mail"
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
  />
  <Ionicons name="mail-outline" size={20} color="#666" />
</View>

<View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Senha"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />
  <Ionicons name="lock-closed-outline" size={20} color="#666" />
</View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}