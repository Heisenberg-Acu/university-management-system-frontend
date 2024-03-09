import { React, useState } from 'react'
import { Menu, ConfigProvider } from 'antd'
const items = [
    {
        key: 'dashboard',
        label: (<a href='/admin/dashboard'>Dashboard</a>)
    },
    {
        key: 'students',
        label: (<a href='/admin/students'>Students</a>)
    },
    {
        key: 'lecturers',
        label: (<a href='/admin/lecturers'>Lecturers</a>)
    },
    {
        key: 'assistantLecturer',
        label: (<a href='/admin/assistant-lecturers'>Assistant Lecturers</a>)
    },
    {
        key: 'courses',
        label: (<a href='/admin/courses'>Courses</a>)
    },
    {
        key: 'rooms',
        label: (<a href='/admin/rooms'>Rooms</a>)
    },
    {
        key: 'classes',
        label: (<a href='/admin/classes'>Classes</a>)
    }
]
const AdminNavbar = () => {
    const currentUrl = window.location.href;
    const urlWords = currentUrl.split('/');
    const keys = ['students', 'lecturers', 'assistant-lecturers', 'courses', 'rooms', 'classes'];
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