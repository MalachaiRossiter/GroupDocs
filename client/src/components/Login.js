import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Login = (props) => {

    const {loggedIn, setLoggedIn} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        //Takes login cridentials and sends axios call to login, returns to dashboard if sucessful. Prints errors if not
        e.preventDefault();
        const loginDetails = ({email, password})
        console.log(loginDetails);
        axios.post('http://localhost:8000/api/user/login', loginDetails, {withCredentials: true})
        .then(res => {
            console.log(res);
            setLoggedIn(true);
            navigate('/dashboard');
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            console.log(errorResponse);
            // const errorArr = [];
            // for (const key of Object.keys(errorResponse)){
            //     errorArr.push(errorResponse[key].message)
            // }
            setErrors(errorResponse);
            console.log(errors);
        })
    }

    return(
        <div className="center-page">
            <div className="login-container">
                <div className='login-header'>
                    <h1>Log In</h1>
                    <p>to continue to your documents</p>
                    {/* {errors.map((err, index) => <p key={index} className="error">{err}</p>)} */}
                    {(errors) ? <p className="error"> {errors} </p> : null} 
                </div>
                <form onSubmit={onSubmitHandler} className="login-form">
                    <div className='form-row'>
                        <label>Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" className='submit-btn'/>
                </form>
                <p className='bottom-txt'>Don't have an account? <span><Link to={"/signUp"}>Sign Up!</Link></span></p>
            </div>
        </div>
    )
}
export default Login;