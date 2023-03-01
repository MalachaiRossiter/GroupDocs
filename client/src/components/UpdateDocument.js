import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const UpdateDocument = (props) => {
    
    const {id} = useParams();

    const {loggedIn} = props;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/document/${id}`)
        .then((res) => {
            console.log(res.data);
            setTitle(res.data.title);
            setBody(res.data.body);
            console.log(id);
        })
        .catch((err) => console.log(err));
    }, []);

    const onSubmitHandler = (e) => {
        // Sends axios request with form body and cookie to the update blog controller
        e.preventDefault();
        axios.put(`http://localhost:8000/api/document/${id}`, {title, body}, {withCredentials: true})
            .then( res => {
                console.log(res.data);
                navigate(`/dashboard`);
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

    const deleteDocument = () => {
        // with the user document id, deletes the user document
        console.log("I made it this far");
        axios.delete(`http://localhost:8000/api/document/${id}`, {withCredentials: true})
        .then(res => {
            console.log(res);
            navigate('/dashboard');
        })
        .catch(err => {console.log(err)})
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
                        <button className='delete-btn' onClick={deleteDocument}>Delete</button>
                    </div>
                    </div>
                </div>
                <div className='writing-container'>
                    {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                    <textarea rows="15" value={body} onChange={(e) => setBody(e.target.value)}/>
                </div>
                </form>
        </div>
    )
} 
export default UpdateDocument;