
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";
import { Provider } from 'react-redux';

const initialStore = {
  userTaskDetails: [],
};

const userManuplatationReducer = (latestStore = initialStore, action) => {
  switch (action.type) { 
    case "initializeTasks":
            return {
                ...latestStore,
                userTaskDetails: action.data
            };
    case "addTask": 
      return { 
        ...latestStore,
        userTaskDetails: [...latestStore.userTaskDetails, action.data]
      };
    case "updateTask":
      const updatedTasks = [...latestStore.userTaskDetails];
      updatedTasks[action.data.index] = action.data.value;
      return {
        ...latestStore,
        userTaskDetails: updatedTasks
      };
    case "deleteTask":
    const filteredTasks = latestStore.userTaskDetails.filter((_, id) => id !== action.index);
    localStorage.setItem("userTasks", JSON.stringify(filteredTasks));
    return {
        ...latestStore,
        userTaskDetails: filteredTasks
    };
    default:
      return latestStore;
  }
};

const store = createStore(userManuplatationReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
