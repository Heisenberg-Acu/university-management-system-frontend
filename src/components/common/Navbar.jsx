import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ConfigProvider, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons';
import '../../styles/components/common/Navbar.css';
import Logo from '../../assets/common/logo.png'
import { useAuth } from '../../authContext/AuthProvider';
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const { isLogged, logOut, user } = useAuth();
    console.log(user);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    const [isScrolled, setIsScrolled] = useState(false);

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
                        <a className='nav-link' href="">About Us</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="">Departments</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="">Events</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="">Student Activities</a>
                    </li>
                   
                    <li className='nav-item'>
                        <a className='nav-link' href="">Student Activities</a>
                    </li>
                    {
                        isLogged ? (<li className='nav-item'><a className='nav-link' href="/admin/dashboard">{user}</a></li>):(null)
                    }
                    {
                        isLogged ? (
                            <a href="/login" className="btn btn--red ms-5" onClick={(e) => { e.preventDefault(); logOut(); }}>
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
                placement={placement}
                onClose={onClose}
                open={open}
                width={275}
            >
                <ul className='nav-list--vertical mb-3'>
                    <li className='nav-item'>
                        <a className='nav-link' href="/">Home</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="">About Us</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="">Departments</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="">Events</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="">Student Activities</a>
                    </li>

                </ul>
                <Button className='btn nav-btn ms-5'>Login</Button>
            </Drawer>
        </nav>
    )
}

export default Navbar;
