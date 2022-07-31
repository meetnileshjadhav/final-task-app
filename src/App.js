import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask';
import Header from './Components/Header';
import About from './Components/About';
import Footer from './Components/Footer';


function App() {
  const [showAddTask, setshowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  // Use Effect
  useEffect(() => {
    const getTasks= async () =>{
      const tasksFromServer= await fetchTasks();

      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks= async () =>{
    const res= await fetch('http://localhost:5000/tasks');
    const data= await res.json();

    return data;
  }

  // Fetch Task
  const fetchTask= async (id) =>{
    const res= await fetch(`http://localhost:5000/tasks/${id}`);
    const data= await res.json();

    return data;
  }

  // Delete Task
  const deleteTask= async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    });

    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder= async(id) =>{
    const taskToToggle= await fetchTask(id);
    const updateTask= {...taskToToggle, reminder: !taskToToggle.reminder};

    const res= await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask)
    });

    const data= await res.json();

    setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  // Task Add
  const addTask = async (task) => {
  const res= await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

    const data= await res.json();

    setTasks([...tasks, data]);

    // const id= Math.floor(Math.random() * 10000) + 1;
    // const newTask= {id, ...task};
    // setTasks([...tasks, newTask]);
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header title='Task Tracker' onAdd={() => setshowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
        <Routes>
          <Route path='/' element={
            <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : <h3 className='empty-list'>There are no tasks..</h3>}
            </>
          }/>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </div>

    </BrowserRouter>
  );
}

export default App;
