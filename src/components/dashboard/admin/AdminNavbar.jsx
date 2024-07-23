import { React, useState } from 'react'
import {Link}  from 'react-router-dom';
import { Menu, ConfigProvider } from 'antd'
const items = [
    {
        key: 'dashboard',
        label: (<Link to='/admin'>Dashboard</Link>)
    },
    {
        key: 'students',
        label: (<Link to='/admin/students'>Students</Link>)
    },
    {
        key: 'lecturers',
        label: (<Link to='/admin/lecturers'>Lecturers</Link>)
    },
    {
        key: 'assistant-lecturers',
        label: (<Link to='/admin/assistant-lecturers'>Assistant Lecturers</Link>)
    },
    {
        key: 'courses',
        label: (<Link to='/admin/courses'>Courses</Link>)
    },
    {
        key: 'rooms',
        label: (<Link to='/admin/rooms'>Rooms</Link>)
    },
    {
        key: 'classes',
        label: (<Link to='/admin/classes'>Classes</Link>)
    },
    {
        key: 'exams',
        label: (<Link to='/admin/exams'>Exams</Link>)
    }
]
const AdminNavbar = () => {
    const currentUrl = window.location.href;
    const urlWords = currentUrl.split('/');
    const keys = ['students', 'lecturers', 'assistant-lecturers', 'courses', 'rooms', 'exams', 'classes'];
    let defaultKey = 'dashboard';
    for (let i in keys) {
        urlWords.forEach((word) => {
            if (word === keys[i]) {
                defaultKey = keys[i];
            }
        });
    }
    const [activeLink, setActiveLink] = useState(defaultKey);
    const onClick = (e) => {
        console.log('click ', e);
        setActiveLink(e.key);
    };
    return (
        <div style={{ backgroundColor: 'white' }} className='container-fluid'>
            <div className='container'>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                colorPrimary: '#D50B1B'
                            },
                        },
                    }}>
                    <Menu onClick={onClick} selectedKeys={[activeLink]} mode="horizontal" items={items} />
                </ConfigProvider>
            </div>

        </div>
    )
}

export default AdminNavbar