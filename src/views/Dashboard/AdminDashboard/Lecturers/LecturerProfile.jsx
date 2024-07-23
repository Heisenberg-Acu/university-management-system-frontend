import React, { useState, lazy, Suspense } from 'react';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import '../../../../styles/views/Dashboard/ProfileStyle.css';
import StudentList from '../../../../components/dashboard/lecturer/StudentList';

const LecturerProfileDetails = lazy(() => import('../../../../components/dashboard/admin/lecturers/LecturerProfileDetails'));

const LecturerClassList = lazy(() => import('../../../../components/dashboard/lecturer/LecturerClassList'));

const LecturerStudentsList = lazy(() => import('../../../../components/dashboard/lecturer/StudentList'));

const LecturerProfile = () => {
    const [activeItem, setActiveItem] = useState('details');
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
   
    return (
        <section className='container my-4'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='profile-card p-4'>
                        <ul className='settings-list'>
                            <li className={`settings-item mb-3 ${activeItem === 'details' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('details')}><UserOutlined className='me-3'/>Profile details</li>
                            <li className={`settings-item mb-3 ${activeItem === 'class-list' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('class-list')}><BookOutlined className='me-3'/>Classes list</li>
                            <li className={`settings-item ${activeItem === 'students-list' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('students-list')}><BookOutlined className='me-3'/>Students list</li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-9'>
                    <Suspense fallback={<div>
                        <Spin />
                    </div>}>
                        {activeItem === 'details' && <LecturerProfileDetails />}
                        {activeItem === 'class-list' && <LecturerClassList />}
                        {activeItem === 'students-list' && <StudentList />}

                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default LecturerProfile;
