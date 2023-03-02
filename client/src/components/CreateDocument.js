import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import socket from './socket';

const CreateDocument = (props) => {
    
    const [title, setTitle] = useState("Your new Document");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('updateNewBody', (newBody) => {
            setBody(newBody);
        });
    }, []);

    const onBodyChange = (e) => {
        setBody(e.target.value);
        socket.emit('changeBody', e.target.value);
        console.log("Cleared");
    }

    // submit handler takes credentials and body of from and sends axios request to create document
    const onSubmitHandler = (e) => {
        e.preventDefault();
            axios.post(`http://localhost:8000/api/document`, {title, body}, {withCredentials: true})
            .then( res => {
                console.log(res.data);
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

    return (
        <div className='background'>
            <form onSubmit={onSubmitHandler} className="login-form">
                <div className='navbar-container'>
                    <div className='navbar'>
                        <div className='nav-left'>
                            <Link to={"/dashboard"}><h2 className='logo'>GroupDocs</h2></Link>
                            <input type="text" value={title} className='title-input' onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className='link-container'>
                        <input type="submit" className='submit-btn' value="Save"/>
                    </div>
                    </div>
                </div>
                <div className='writing-container'>
                    {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                        <textarea rows="15" value={body} onChange={onBodyChange}/>
                </div>
                </form>
        </div>
    )
} 
export default CreateDocument;