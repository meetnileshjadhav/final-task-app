import './App.css';
import Header from './Components/Header';
import { useState} from 'react'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask';

function App() {
  const [showAddTask, setshowAddTask] = useState(false);

  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: "Doctors Appointment",
        day: "Feb 5th at 2:30pm",
        reminder: true
      },
      {
        id: 2,
        text: "Meeting at School",
        day: "Feb 6th at 1:30pm",
        reminder: false
      },
      {
        id: 3,
        text: "Party time",
        day: "Feb 6th at 9:30pm",
        reminder: true
      }
    ]
  )

  // Delete Task
  const deleteTask= (id) =>{
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder= (id) =>{
    setTasks(tasks.map(task => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  // Task Add
  const addTask = (task) => {
    const id= Math.floor(Math.random() * 10000) + 1;
    const newTask= {id, ...task};
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="container">
      <Header title='Task Tracker' onAdd={() => setshowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : <h3 className='empty-list'>There are no tasks..</h3>}
    </div>
  );
}

export default App;
