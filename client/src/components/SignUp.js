import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
const SignUp = (props) => {

    const {loggedIn, setLoggedIn} = props;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newAccount = ({username, email, password, confirmPassword})
        console.log(newAccount);
        axios.post('http://localhost:8000/api/user/', newAccount, {withCredentials:true}
        )
        .then(res => {
            console.log(res.data);
            setLoggedIn(true);
            navigate('/dashboard');
        })
        .catch((err) => {
            console.log(err)
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        });
    }

    return(
        <div className="full-container">
            <div className="login-container">
                <div className='login-header'>
                    <h1>Create Your Account!</h1>
                    {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                </div>
                <form onSubmit={onSubmitHandler} className="login-form">
                    <div className='form-row'>
                        <label>UserName</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Confirm Password</label>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <input type="submit" className='submit-btn'/>
                </form>
                <p className='bottom-txt'>Have an account already? <span><Link to={"/login"}>log in!</Link></span></p> 
            </div>
        </div>
    )
}
export default SignUp;