import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignUp()
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleSignUpSubmit = (e)=>{
        e.preventDefault();

        if (password !== retypePassword) {
            alert('Passwords do not match');
            return;
        }

        const user = {
            user_name: username, 
            password: password, 
            email: email
        };
        axios.post(`${process.env.REACT_APP_API_URL}/signup/`,user)
        .then(response=>{
            console.log(process.env.REACT_APP_API_URL); 
            alert('Sign Up successful');
            navigate('/');
        })
        .catch((error)=>{
            console.error('There was an error while signing up. Please try again...',error);
        })
    }

    return(
        <div className="sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
            <table className="table sign-up-table">
                <thead>
                    <tr>
                        <td colSpan="2"><h1>Sign Up</h1></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="form-label">Email</td>
                        <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td className="form-label">Username</td>
                        <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td className="form-label">Password</td>
                        <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td className="form-label">Retype Password</td>
                        <td><input type="password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="sign-up-btn-container"><button className="btn" type="submit">Submit</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
}