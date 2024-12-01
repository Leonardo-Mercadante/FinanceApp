import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddExpenseScreen = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();

  const addExpense = async () => {
    if (name && amount) {
      const newExpense = { id: Date.now(), name, amount: parseFloat(amount) };
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
        expenses.push(newExpense);
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
        navigation.goBack();
      } catch (error) {
        console.error('Error saving expense:', error);
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nome da Despesa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Adicionar" onPress={addExpense} />
    </View>
  );
};

export default AddExpenseScreen;
