import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Grid from './components/Grid/Grid';


const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1 className='app-title'>Andrei Dochkin Project</h1>
        <Grid />
      </div>
    </Provider>
  );
};

export default App;
