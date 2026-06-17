import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

const CadastroScreen = () => {
  const navigation = useNavigation();
  
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [sala, setSala] = useState('');

  const handleSalvar = async () => {
    if (!nome || !descricao || !sala) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      const savedEquipamentos = await AsyncStorage.getItem('@equipamentos');
      const equipamentos = savedEquipamentos ? JSON.parse(savedEquipamentos) : [];

      const newEquipamento = {
        id: Math.random().toString(36).slice(2, 11),
        nome,
        descricao,
        sala,
      };

      const updatedEquipamentos = [...equipamentos, newEquipamento];
      await AsyncStorage.setItem('@equipamentos', JSON.stringify(updatedEquipamentos));

      Alert.alert('Sucesso', 'Equipamento cadastrado!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Houve um problema ao salvar localmente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Equipamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do equipamento (Ex: Projetor)"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descrição detalhada (Ex: Entrada HDMI, 110v)"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Sala onde está alocado (Ex: Lab 3)"
        value={sala}
        onChangeText={setSala}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Equipamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroScreen;