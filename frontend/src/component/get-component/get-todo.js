import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const GetTodo = () => {

    const [data, setData] = useState([]);
    const [dark, setDark] = useState('');
    const [showCompleted, setShowCompleted] = useState(true);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:2200/todoList",
        }).then((response) => {
            setData(response.data);
            // console.log(response.data);
        })
    }, [data]);

    const setLocalStorage = (id, title, completed) => {
        localStorage.setItem("id", id);
        localStorage.setItem("title", title);
        localStorage.setItem("completed", completed);
    }

    const btnDelete = (id) => {
        var flag = window.confirm("Are you sure | we want to delete");
        if (flag) {
            axios({
                method: "delete",
                url: `http://localhost:2200/deleteTodo/${id}`
            }).then(() => {
                alert("Data deleted");
            })
        }
    };

    const darkClick = () => {
        if (dark === 'table-dark') {
            setDark('');
        } else {
            setDark('table-dark');
        }

    }

    const completedClick = () => {
        setShowCompleted(!showCompleted);
    }
    return (
        <>
            <div className='container d-flex justify-content-evenly mt-5'>
                <div className='form-switch'>
                    <input type='checkbox' className='form-check-input' onClick={darkClick} /> Dark Mode
                </div>
                <div className='form-switch'>
                    <input type='checkbox' className='form-check-input' onClick={completedClick} /> Completed
                </div>
            </div>
            <table className={`table table-hover ${dark} container w-75 mt-5`} >
                <thead>
                    <tr>Todo List</tr>
                </thead>
                <tbody>
                    {
                        data.map(list => {
                            if (!showCompleted && !list.completed) {
                                return null;
                            }
                            return (
                                <tr key={list.id}>
                                    <td>{list.id}</td>
                                    <td>{list.title}</td>
                                    <td>{(list.completed) === true ? <input type='checkbox' className='form-check-input' disabled checked style={{ backgroundColor: "green", color: "white" }} /> : <input type='checkbox' className='form-check-input' disabled style={{ backgroundColor: "", color: "white" }} />}</td>
                                    <td>
                                        <Link to='/update'><button className='btn btn-primary' onClick={() => setLocalStorage(list._id, list.title, list.completed)}><span className='bi bi-pen'></span></button></Link>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' value={list._id} onClick={() => btnDelete(list._id)}><span className='bi bi-trash'></span></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default GetTodo