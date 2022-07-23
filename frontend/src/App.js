import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [item, setItem] = useState([]);
  const [newTask, setNewTask] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5050/gettask').then(
      arr => setItem(arr.data)
    )
  },[])


  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5050/addtask', {todo: newTask}).then(
      (arr) => setItem(arr.data)
    )
  }

  const deleteHandler = id => {
    axios.delete(`http://localhost:5050/delete/${id}`).then(
      arr => setItem(arr.data)
    )
  }


  return (
    <div>
      <center>
        
        <form onSubmit={submitHandler}>
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <input type="submit" value='Submit' />
        </form><br/>

        {item.map((task) => <div key={task._id}>
          <h3 style={{display:"inline"}}>{task.todo}</h3><button onClick={() =>  deleteHandler(task._id)} >Delete</button>
        </div>)}
      </center>
    </div>
  )
}

export default App;
