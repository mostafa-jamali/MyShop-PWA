import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './Redux/store';

import './App.css';
import Container from './Container';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Container />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
