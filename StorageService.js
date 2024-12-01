import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveExpense = async (expense) => {
  try {
    const storedExpenses = await AsyncStorage.getItem('expenses');
    const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    expenses.push(expense);
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expense:', error);
  }
};

export const loadExpenses = async () => {
  try {
    const storedExpenses = await AsyncStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};
