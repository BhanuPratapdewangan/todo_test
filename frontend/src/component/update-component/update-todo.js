import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DumiTodo from './dumi-todo.js';

const UpdateTodo = () => {

  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(true);
 
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = () => {
    setId(localStorage.getItem("id"));
    setTitle(localStorage.getItem("title"));
    setCompleted(localStorage.getItem("completed"));
  }

  // const btnUpdate = async() => {
  //   let userData = {
  //     id : id,
  //     title : title,
  //     completed : completed
  //   }
  //  await axios.put(`http://localhost:2200/updateTodo/${id}`, userData)
  //   .then(response => {
  //     alert("Data updated");
  //     console.log(response.status, response.data);
  //     navigate('/');
  //   }).catch(error => {
  //     console.error("Error occurred : ",error);
  //   })

  // }

  const btnUpdate = async() => {
     
    let data = await fetch(`http://localhost:2200/updateTodo/${id}`,{
      method:"put",
      body : JSON.stringify({title, completed}),
      headers : {'content-type' : 'application/json'}
    })

    if(!data.ok){
      throw new Error(`Failed to update data. Status : ${data.status}`);
    }

    let result = await data.json();
    console.log("Data updated", result);
    alert("Data updated...!");
    navigate('/get');

    console.log(title);
    console.log(completed);
  }
  return (
    <>
      <div className='container w-75 d-flex justify-content-between mt-5'>
        <input type='text' className='form-control w-25' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} ></input>
        <input type='checkbox' className='form-check-input' checked={completed} onChange={(e) => setCompleted(e.target.checked) }></input>

        <button className='btn btn-primary' onClick={btnUpdate}>UpdateTodo</button>

      </div>

    <DumiTodo/>
    </>
  )
}

export default UpdateTodo;