import React, { useEffect, useState } from 'react'
import '../add-component/add-component.css';
import '../add-component/add-todo.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {

  // const [add, setAdd] = useState({ id: 0, title: '', completed: false });
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  const AddClick = () => {
    // e.preventDefault();
    const userData = {
      id: id,
      title: title,
      completed: completed
    }

    let result = axios.post("http://localhost:2200/addTodo", userData)
      .then(response => {
        console.log(response.status, response.data);
        alert("Add successfully...!");
        navigate('/get');
      })

    if(result){
      setId(0);
      setTitle('');
      setCompleted(false);
    }

  }

  // const AddClick = async() => {
    
  //   let result = await fetch("http://localhost:2200/addTodo",{
  //     method:"POST",
  //     body: JSON.stringify({id, title, completed}),
  //     headers : {'content-type': 'application/json'}
  //   })

  //   result = await result.json();
  //   if(result){
  //     alert("Add successfully...!");
  //     console.log(result);

  //     setId(0);
  //     setTitle('');
  //     setCompleted(false);

  //     navigate('/');
  //   } else {
  //     alert("Some error");
  //   }
  // }

  return (
    <>
      <div className='container w-75 d-flex justify-content-between mt-5 addTodo'>
        <input type='number' className='form-control w-25' value={id} placeholder='Enter Id' onChange={e => setId(e.target.value)} ></input>
        <input type='text' className='form-control w-25' value={title} placeholder='Enter title' onChange={e => setTitle(e.target.value)} ></input>
        <input type='checkbox' className='form-check-input' value={completed} onChange={e => setCompleted(e.target.checked)} ></input>

        <button className='btn btn-primary' onClick={AddClick}>Add Todo</button>


        {/* <form onSubmit={AddClick} className='d-flex justify-content-between mt-5'>
          <input
            type="number"
            name="id"
            className='form-control w-25'
            value={add.id}
            onChange={(e) => setAdd(e.target.value)}
          />
          <input
            type="text"
            name="title"
            className='form-control w-50'
            value={add.title}
            onChange={(e) => setAdd(e.target.value)}
          />
          <input
            type="checkbox"
            name="completed"
            className='form-check-input'
            value={add.completed}
            onChange={(e) => setAdd(e.target.checked)}
          />
          <button type="submit" className='btn btn-primary'>Add Todo</button>
        </form> */}
        
      </div>

    </>
  )
}

export default AddTodo;