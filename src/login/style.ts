import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%', // O container ocupa 90% da largura da tela
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco semi-transparente
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row', // Alinha o Input e o Ícone na horizontal
    alignItems: 'center',
    width: '100%', // Força o campo a ocupar toda a largura do container
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  input: {
    flex: 1, // Faz o TextInput ocupar todo o espaço antes do ícone
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});