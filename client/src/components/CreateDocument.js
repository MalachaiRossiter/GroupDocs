import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDocument = (props) => {
    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

        // submit handler takes credentials and body of from and sends axios request to create blog
    const onSubmitHandler = (e) => {
        e.preventDefault();
            axios.post(`http://localhost:8000/api/document`, {title, body}, {withCredentials: true})
            .then( res => {
                console.log(res.data);
                navigate('/');
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

    return (
        <div className="display-container">
            <div className="blog-container blog-single">
                <h1>Create A New Blog!</h1>
                {errors.map((err, index) => <p key={index} className="errors">{err}</p>)}
                <form onSubmit={onSubmitHandler} className="login-form">
                    <div className='form-row'>
                        <label>Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Body</label>
                        <textarea rows="15" onChange={(e) => setBody(e.target.value)}/>
                    </div>
                    <input type="submit" className='submit-btn'/>
                </form>
            </div>
        </div>
    )
} 
export default CreateDocument;