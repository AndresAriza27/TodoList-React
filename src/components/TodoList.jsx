import React, { useState, useEffect } from 'react';
import '../styles/TodoList.css'
import { AnimatePresence, motion } from 'framer-motion'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = event => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    const handleUnload = event => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [todos]);

  const handleInputChange = event => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
      <div className='todo'>  
      <div className="inpubtn">
        <motion.input
          className='intxt'
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Agregar una Nueva Tarea"
          initial={{ scale : 0.9, backgroundColor:"#385D8A", color: "rgb(20, 20, 20)"}}
          whileFocus={{backgroundColor : "#eeeeee", scale : 1, color : "rgb(20, 20, 20)"}}
          transition={{ duration : 0.3 }}
        />
        <motion.button 
        initial={{scale : 0.9, backgroundColor:"#02EAF0", opacity:0.8, color:"rgb(20, 20, 20)"}}
        whileTap={{scale:1, color:"rgb(20, 20, 20)", backgroundColor:"#eeeeee"}}
        onClick={handleAddTodo}
        >Agregar</motion.button>
      </div>
      <div className="tareas">
        <ul>
          <AnimatePresence>
          {todos.map(todo => (
            <motion.li 
            key={todo.id} 
            className='listitem'
            initial={{backgroundColor:"#385D8A",opacity:0.8, scale:0.7}}
            whileHover={{backgroundColor:"#385D8A",opacity:1, scale:1.2}}
            animate={{scale:1}}
            exit={{scale:0}}
            >
              <div className="checkbos">
                <motion.input
                type="checkbox"
                className='checbo'
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                />
              </div>
              <div className="textospan">
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.text}
                </span>
              </div>
              <div className="borrarbtn">
                <motion.button 
                initial={{scale:1}}
                whileTap={{scale:1.2, backgroundColor:"rgb(182, 0, 0)", color:"rgb(20, 20, 20)"}}
                onClick={() => handleDeleteTodo(todo.id)}>Quitar</motion.button>
              </div>
            </motion.li>
          ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;