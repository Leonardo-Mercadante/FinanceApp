import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ExpenseListScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };
    loadExpenses();
  }, []);

  const calculateBalance = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <View>
      <Text>Saldo Atual: R${calculateBalance()}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}: R${item.amount}</Text>
          </View>
        )}
      />
      <Button
        title="Adicionar Despesa"
        onPress={() => navigation.navigate('AddExpense')}
      />
    </View>
  );
};

export default ExpenseListScreen;
