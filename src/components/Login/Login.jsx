import Logo from '../../assets/logo.png'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';


const Login = () => {
    const [userCredentials, setUserCredentials] = useState({
      username: '',
      password: '',
    });

    const handleChange = (e) => {
      setUserCredentials({
        ...userCredentials,
        [e.target.name]: e.target.value,
      });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8081/employees/auth', userCredentials);
        Cookies.set('token', response.data.access_token);
        Cookies.set('position', response.data.position);
        window.location.href = '/';
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <div className="flex items-center justify-center h-screen bg-[#b9b9b9]">
        <div className="min-w-fit flex-col border bg-[#fff] px-6 py-14 shadow-md rounded-[4px] ">
          <div className="mb-8 flex justify-center">
            <img className="w-24" src={Logo} alt="" />
          </div>
          <div className="flex flex-col text-sm rounded-md">
            <input 
              onChange={handleChange}
              name='username'
            className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Username" />
            <input 
              onChange={handleChange}
              name='password'
              className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500" type="password" placeholder="Senha" />
          </div>
          <button 
          onClick={handleSubmit}
          className="mt-5 w-full border p-2 from-gray-800 bg-black font-bold text-[#00df9a] rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit">Sign in</button>
          <div className="mt-5 flex justify-between text-sm text-gray-600">
            <a href="#">Esqueceu sua senha?</a>
          </div>
          <div className="flex justify-center mt-5 text-sm">
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  