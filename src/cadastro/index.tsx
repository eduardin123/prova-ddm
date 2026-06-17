import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

const CadastroScreen = () => {
  const navigation = useNavigation();
  
  // Criamos os 3 campos que o professor pediu: nome, descricao e sala
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [sala, setSala] = useState('');

  const handleSalvar = async () => {
    // Validação: verifica se TODOS os 3 campos estão preenchidos
    if (!nome || !descricao || !sala) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      // 1. Busca os equipamentos já salvos. Se não existir nada, começa com uma lista vazia []
      const savedEquipamentos = await AsyncStorage.getItem('@equipamentos');
      const equipamentos = savedEquipamentos ? JSON.parse(savedEquipamentos) : [];

      // 2. Cria o novo objeto do equipamento com os novos campos
      const newEquipamento = {
        id: Math.random().toString(36).slice(2, 11), // Gera um ID único
        nome,
        descricao,
        sala,
      };

      // 3. Adiciona o novo equipamento na lista antiga
      const updatedEquipamentos = [...equipamentos, newEquipamento];

      // 4. Salva a lista atualizada de volta no AsyncStorage
      await AsyncStorage.setItem('@equipamentos', JSON.stringify(updatedEquipamentos));

      Alert.alert('Sucesso', 'Equipamento cadastrado!');
      navigation.goBack(); // Volta para a tela anterior (Lista)
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Houve um problema ao salvar localmente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Equipamento</Text>

      {/* Campo 1: Nome do Equipamento */}
      <TextInput
        style={styles.input}
        placeholder="Nome do equipamento (Ex: Projetor)"
        value={nome}
        onChangeText={setNome}
      />

      {/* Campo 2: Descrição Detalhada */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descrição detalhada (Ex: Entrada HDMI, 110v)"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      {/* Campo 3: Sala Alocada */}
      <TextInput
        style={styles.input}
        placeholder="Sala onde está alocado (Ex: Lab 3)"
        value={sala}
        onChangeText={setSala}
      />

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Equipamento</Text>
      </TouchableOpacity>

      {/* Botão Cancelar */}
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