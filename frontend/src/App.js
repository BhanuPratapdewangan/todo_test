
import './App.css';
import { BrowserRouter, Routes, Route, ErrorMessage } from 'react-router-dom';
import LandingPage from './component/landing-component/landing-page.js';
import NavTodo from './component/nav-component/nav-todo.js';
import AddTodo from './component/add-component/add-todo.js';
import UpdateTodo from './component/update-component/update-todo.js';
import GetTodo from './component/get-component/get-todo.js';
import FooterTodo from './component/footer-component/footer-todo.js';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavTodo/>
      {/* <LandingPage/> */}
      {/* <AddTodo /> */}
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/get' element={<GetTodo/>}></Route>
          <Route path='/add' element={<AddTodo/>}></Route>
          <Route path='/update' element={<UpdateTodo/>}></Route>
        </Routes>
        <FooterTodo />
      </BrowserRouter>
    </>
  );
}

export default App;
