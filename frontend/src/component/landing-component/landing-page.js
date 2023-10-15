import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AddTodo from '../add-component/add-todo.js';

const LandingPage = () => {

    const [data, setData] = useState([]);
    const [dark, setDark] = useState('');
    const [showCompleted, setShowCompleted] = useState(true);

    useEffect(() => {
        axios({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/users/1/todos",
        }).then((response) => {
            setData(response.data);
            // console.log(response.data);
        })
    }, []);

    const darkClick = () => {
        if (dark == 'table-dark') {
            setDark('');
        } else {
            setDark('table-dark');
        }
    };

    const completedClick = () => {
        setShowCompleted(!showCompleted);
    }

    return (
        <>
            <AddTodo />
            <div className='d-flex justify-content-evenly mt-5'>
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
                        data.length > 0 ?
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
                                            <Link to='/update'><button className='btn btn-primary'><span className='bi bi-pen'></span></button></Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' value={list._id}><span className='bi bi-trash'></span></button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <strong>Data not found</strong>
                            </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default LandingPage;