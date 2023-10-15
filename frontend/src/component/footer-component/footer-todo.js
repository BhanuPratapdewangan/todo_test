import React from 'react'
import '../footer-component/footer-todo.css';
const FooterTodo = () => {
  return (
    <>
        <div className='container footer' style={{backgroundColor:"rgb(92, 92, 252)", color:"white"}}>
            <h4>Connect to the social network</h4>
            <div className='link'>
                <a href='https://github.com/BhanuPratapdewangan' rel='github'>Github</a>
                <a href='https://www.linkedin.com/in/iambhanupratap77/' rel='linkdin'>Linkdin</a>
            </div>
        </div>
    </>
  )
}

export default FooterTodo;