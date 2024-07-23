import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer } from 'antd'
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import '../../styles/components/common/Navbar.css';
import Logo from '../../assets/common/logo.png'
import { useAuth } from '../../authContext/AuthProvider';
const Navbar = () => {
    const [open, setOpen] = useState(false);
    // const [placement, setPlacement] = useState('left');
    const { isLogged, logOut, user, role } = useAuth();
    const username = user ?  user.split(" ")[0]:'';
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    // const onChange = (e) => {
    //     setPlacement(e.target.value);
    // };

    const [isScrolled, setIsScrolled] = useState(false);
    const dashboardRedirct = () => {
        window.location.href='/'+role.toLowerCase()+'/dashboard';
    }
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const location = useLocation();
    const urlPage = location.pathname;

    return (
        <nav style={urlPage.length !== 1 ? { position: 'relative', backgroundColor: 'black' } : {}} className={`container-fluid navbar ${isScrolled ? 'fixed' : ''}`}>
            <div className="navbar-content container d-flex">
                <img className='logo p-0' src={Logo} alt="" style={{ maxHeight: '80%' }} />
                <ul className='nav-list '>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">Home</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">About Us</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">Departments</a>
                    </li>
                    {
                        isLogged ? (<li className='nav-item ms-4' style={{cursor:'pointer'}}><p className='nav-link' onClick={dashboardRedirct}><UserOutlined className='me-2'/>{username}</p></li>):(null)
                    }
                    {
                        isLogged ? (
                            <a href="/login" className="btn btn--red ms-2" onClick={(e) => { e.preventDefault(); logOut(); }}>
                                Logout
                            </a>
                        ) : (
                            <a href="/login" className="btn btn--red ms-5">
                                Login
                            </a>
                        )
                    }
                </ul>
                <Button className='nav-btn--collapse' type="text" onClick={showDrawer}>
                    <MenuOutlined />
                </Button>

            </div>
            <Drawer
                title='Faculty of Engineering'
              //  placement={placement}
                onClose={onClose}
                open={open}
                width={275}
            >
                <ul className='nav-list--vertical mb-3'>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">Home</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">About Us</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">Departments</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">Events</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">Student Activities</a>
                    </li>

                </ul>
                <Button className='btn nav-btn ms-5'>Login</Button>
            </Drawer>
        </nav>
    )
}

export default Navbar;
