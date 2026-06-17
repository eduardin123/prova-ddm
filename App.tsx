import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

// Importações corrigidas para aestrutura /src
import LoginScreen from './src/login';
import ListScreen from './src/lista';
import CadastroScreen from './src/cadastro';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação por Abas (Bottom Tabs)
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'List') iconName = 'list';
          else if (route.name === 'Novo') iconName = 'add-circle';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
<Tab.Screen 
  name="List" 
  component={ListScreen} 
  options={({ navigation }) => ({
    title: 'Minhas Tarefas',
    headerRight: () => (
    <TouchableOpacity 
       onPress={() => navigation.dispatch(StackActions.replace('Login'))}
       style={{ marginRight: 15 }}
      >
     <Ionicons name="log-out-outline" size={24} color="#F44336" />
    </TouchableOpacity>
),
  })} 
/>

      {/* Aba "falsa" que apenas dispara o Modal do Stack */}
      <Tab.Screen 
        name="Novo" 
        component={ListScreen} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Impede a mudança de aba
            navigation.navigate('Cadastro'); // Abre o Modal que está no Stack
          },
        })}
        options={{ title: 'Cadastrar' }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tela de Login sem cabeçalho */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        {/* Home que contém as abas inferiores */}
        <Stack.Screen 
          name="Home" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />

        {/* Cadastro configurado como Modal no Stack */}
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ 
            presentation: 'modal',
            headerTitle: 'Nova Tarefa' 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}