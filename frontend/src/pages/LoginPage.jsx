import { useContext, useState } from 'react'
import loginImg from '../assets/login.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';


const LoginPage = () => {

    const [register, setRegister] = useState(false);
    const [data, setData] = useState({name:"", email:"", password:""});
    const {url} = useContext(MainContext);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value});
    };


    const onLogin = async()=>{
        let newUrl = url;
        if(register){
            newUrl += "/users/register"
        }else{
            newUrl += "/users/login"
        }

        try{
            const response = await axios.post(newUrl, data);
        sessionStorage.setItem("token", response.data.token);
        if(response.data.sucess){
            console.log("login success", response.data.token);
            navigate('/');
        }else{
            console.log("login failed");
        }
        }catch(error){
            console.log("login failed", error);
            alert("login failed please try again");
        }

    };


  return (
    <div className="flex flex-col items-start justify-center w-full md:items-center md:h-screen">
        <div className='flex flex-col items-center justify-center w-full h-auto gap-4 md:flex-row md:w-[95%]'>
            <div className='flex items-center justify-center w-full md:w-2/4 '>
                <img src={loginImg} alt="" className='object-cover w-full h-72 md:h-3/4 xl:h-2/4' />
            </div>
            <div className='flex flex-col items-center justify-center w-full gap-4 md:w-2/4 '>
                <div className='flex flex-col items-start justify-center w-[90%] gap-4 xl:gap-8 p-4'>
                    <div className={`w-full mx-auto ${register ? 'block' : 'hidden'}`}>
                        <p className='xl:text-lg'>name</p>
                        <input type="text" className='w-full p-2 border rounded outline-green-900 xl:p-3'
                        name='name'
                        value={data.name} 
                        onChange={handleChange}/>
                    </div>
                    <div className='w-full mx-auto'>
                        <p className='xl:text-lg'>Email</p>
                        <input type="email" className='w-full p-2 border rounded outline-green-900 xl:p-3'
                        name='email'
                        value={data.email}
                        onChange={handleChange} />
                    </div>
                    <div className='w-full mx-auto'>
                        <p className='xl:text-lg'>Password</p>
                        <input type="password" className='w-full p-2 border rounded outline-green-900 xl:p-3'
                        name='password'
                        value={data.password} 
                        onChange={handleChange}/>
                    </div>
                </div>
                <div className='w-5/6 p-2 mb-4 text-center text-white bg-green-900 rounded-md cursor-pointer xl:text-lg xl:p-3' onClick={onLogin}>{!register ? "login": "register"}</div>
                <div className={`${!register ? 'flex' : 'hidden'} items-center justify-center w-full gap-2`}>
                    <p>{"DON'T HAVE A ACCOUNT?"}</p>
                    <p className='text-lg text-green-900 cursor-pointer' onClick={()=>{setRegister(!register)}}>REGISTER</p>
                </div>
                <div className={`${register ? 'flex' : 'hidden'} items-center justify-center w-full gap-2`}>
                    <p>{"ALREADY HAVE A ACCOUNT?"}</p>
                    <p className='text-lg text-green-900 cursor-pointer'onClick={()=>{setRegister(!register)}}>LOGIN</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
