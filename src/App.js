// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import './App.css';
import { motion } from 'framer-motion';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <motion.div
          initial={{ backgroundColor: "#f0f2f5" }}
          animate={{ backgroundColor: ["#f0f2f5", "#e0e7ff", "#f0f2f5"] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          style={{ minHeight: "100vh" }}
        >
          <div className="app">
            <h1>Comments</h1>
            <CommentForm />
            <CommentList />
          </div>
        </motion.div>
      </PersistGate>
    </Provider>
  );
}

export default App;