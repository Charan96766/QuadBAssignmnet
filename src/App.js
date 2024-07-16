import './App.css';
import Todo from './components/Todo'; 
import TodoTasks from './components/TodoTasks';
function App() { 
  return (
    <div className="App"> 
      <div className='componentsDiv'> 
      <Todo /> 
      <TodoTasks/>
      </div>
      
    </div> 

  );
}

export default App;
