import React, { createContext, useContext, useState } from 'react';

interface TodoContextType {
  updateToDo: (text: string, id: number) => void;
  userText: string;
  setUserText: (value: React.SetStateAction<string>) => void;
  listItems: { id: number; text: string; checked: boolean }[];
  updateCheckBox: (id: number) => void;
  createTodo: (text: string, id: number) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userText, setUserText] = useState<string>('');
  const [listItems, setListItems] = useState<{ id: number; text: string; checked: boolean }[]>([]);

  const createTodo = (text: string, id: number) => {
    const newTodo = {
      id,
      text,
      checked: false
    }

    setListItems([...listItems, newTodo])
  }

  const updateToDo = (text: string, id: number) => {
    const updatedList = listItems.map(item =>
      item.id === id ? { ...item, text: text, id: id } : item
    );
    setListItems(updatedList);
  };

  const updateCheckBox = (id: number) => {
    const updatedList = listItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setListItems(updatedList);
  };

  return (
    <TodoContext.Provider value={{ updateToDo, userText, setUserText, listItems, updateCheckBox, createTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
