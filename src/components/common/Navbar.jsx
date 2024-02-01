import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import { Button, ConfigProvider, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons';
import '../../styles/components/common/Navbar.css';
import Logo from '../../assets/common/logo.png'
const Navbar = ({style}) => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
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
    console.log();
    return (
        <nav style={urlPage.length !== 1 ? {position:'relative', backgroundColor:'black'} : {}} className={`container-fluid navbar ${isScrolled ? 'fixed' : ''}`}>
            <div className="navbar-content container d-flex">
                <img className='logo p-0' src={Logo} alt="" style={{maxHeight:'80%'}}/>
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
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBgContainer: '#D50B1B',
                                colorPrimaryHover: '#ffffff',
                                colorPrimaryActive: '#ffffff'
                            },
                            components: {
                                Button: {
                                    colorText: '#ffffff',
                                    borderRadius: 4
                                }
                            },
                        }}
                    >
                        <Button className='btn nav-btn ms-5'>Login</Button>
                    </ConfigProvider>
                </ul>
                <Button className='nav-btn--collapse' type="text" onClick={showDrawer}>
                    <MenuOutlined />
                </Button>

            </div>
            <Drawer
                title='Facualty of Engineering'
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
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: '#D50B1B',
                            colorPrimaryHover: '#ffffff',
                            colorPrimaryActive: '#ffffff'
                        },
                        components: {
                            Button: {
                                colorText: '#ffffff',
                                borderRadius: 4
                            }
                        },
                    }}
                >
                    <Button className='btn nav-btn ms-5'>Login</Button>
                </ConfigProvider>
            </Drawer>
        </nav>

    )
}

export default Navbar