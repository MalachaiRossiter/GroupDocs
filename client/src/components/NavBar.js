import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {

    const {loggedIn, setLoggedIn} = props;
    const navigate = useNavigate();

    const onClickHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/logout', {}, {withCredentials: true})
        .then (res => {
            console.log(res);
            setLoggedIn(false);
            navigate('/');
        })
        .catch((err) => {console.log(err)});
    }

    return (
        <div className='navbar-container'>
            <div className='navbar'>
                <Link to={"/"} className='logo'><h2 className='text-2xl bold'>DevBlog</h2></Link>
                    <div className='link-container'>
                        <Link onClick={onClickHandler} className='link-item'><h2>Logout</h2></Link>
                        <Link to={"/UserBlogs"} className='link-item signup'><h2>View Your Blogs</h2></Link>
                    </div>
            </div>
        </div>
    )
}
export default NavBar;