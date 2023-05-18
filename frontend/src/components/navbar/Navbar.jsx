import React from 'react';
import'./style.css' ;
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../../pages';

const Navbar = ({user,setUser}) => {
    const navigate = useNavigate();

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.setItem('user',null);
        setUser(null);
        navigate('/');
    }
    return (
        <div>
            <nav className='navbar' >
                <div>
                    {user ? <>
                        <Link className='navbar__task' to={'/home'}>
                        <h1>Welcome {user.name}</h1>
                    </Link>
                    </> :
                    <>
                    <Link className='navbar__task' to={'/'}>
                        <h1>Task Board</h1>
                    </Link>
                    </>
                    }
                </div>
                <div className='nav-link-container'>
                    {user ?<>
                        <Link onClick={handleLogout} to={'/logout'}>
                            Logout
                        </Link>
                    </> : <>
                        <Link to={'/login'}>
                        Login
                    </Link>
                    <Link to={'/signup'}>
                        Signup
                    </Link>
                    </>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar