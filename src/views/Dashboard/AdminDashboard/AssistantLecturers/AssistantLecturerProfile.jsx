import React, { useState, lazy, Suspense } from 'react';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import '../../../../styles/views/Dashboard/ProfileStyle.css';

const AssistantLecturerProfileDetails = lazy(() => import('../../../../components/dashboard/admin/assistant-lecturers/AssistantLecturerProfileDetails'));

const AssistantLecturerClassList = lazy(() => import('../../../../components/dashboard/assistant-lecturer/AssistantLecturerClassList'));
const AssistantStudentsList = lazy(() => import('../../../../components/dashboard/assistant-lecturer/StudentList'));

const AssistantLecturerProfile = () => {
    const [activeItem, setActiveItem] = useState('details');
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
   
    return (
        <section className='container my-4'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='profile-card' style={{backgroundColor:'transparent'}}>
                        <img src="https://placehold.co/600x400" alt="" width={'100%'} style={{borderRadius:8}}/>
                    </div>
                    <div className='mt-4 profile-card p-4'>
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
                        {activeItem === 'details' && <AssistantLecturerProfileDetails />}
                        {activeItem === 'class-list' && <AssistantLecturerClassList />}
                        {activeItem === 'students-list' && <AssistantStudentsList />}
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default AssistantLecturerProfile;
