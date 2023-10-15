import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const DumiTodo = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:2200/todoList",
        }).then((response) => {
            setData(response.data);
            // console.log(response.data);
        })
    }, []);

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
    }
    return (
        <>
            <table className='table table-hover container w-75 mt-5' >
                <thead>
                    <tr>Todo List</tr>
                </thead>
                <tbody>
                    {
                        data.map(list =>
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
                    }
                </tbody>
            </table>
        </>
    )
}

export default DumiTodo;