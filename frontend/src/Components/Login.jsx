import React,{useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/Actions/authenticationAction";
import { useNavigate } from "react-router-dom";


export default function Login()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = (e)=>{
        e.preventDefault();

        const user = {
            user_name: username, 
            password: password
        };

        axios.post(`${process.env.REACT_APP_API_URL}/login/`, user, { withCredentials: true })
        .then((response)=>{
            console.log(response);
            const token = response.data.token;
            dispatch(setToken(token));
            alert('Login Successful');
            navigate('/profile');
        })
        .catch((error)=>{
            console.log('Login failed',error);
        })
    }

    return(
        <div className="login-container">
        <form onSubmit={handleLoginSubmit}>
            <table className="table sign-up-table">
                <thead>
                    <tr>
                        <td colSpan="2"><h1>Login</h1></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="form-label">Email</td>
                        <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td className="form-label">Password</td>
                        <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="login-btn-container">
                            <button className="btn" type="submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
}