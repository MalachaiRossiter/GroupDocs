import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

import NavBar from './NavBar';

const UserDocuments = (props) => {
    const {loggedIn, setLoggedIn} = props;

    const [documentList, setDocumentList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Gets creator Document on page load
        axios.post('http://localhost:8000/api/document/creator', {}, {withCredentials: true})
        .then(res => {
            setDocumentList(res.data);
        })
        .catch((err) => {console.log(err);})
    }, []
    )



    return (
        <div className="">
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div className="display-container">
                    {
                        documentList && documentList.map((document, index) => (
                            <Link to={`/document/edit/${document._id}`}  key={index}>
                                <div className={'document-container'}>
                                    <h1>{document.title}</h1>
                                    <p className=''>{document.body}</p>
                                </div>
                            </Link>
                        ))
                    }
            </div>
        </div>
    )
}
export default UserDocuments;