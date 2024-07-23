import React, { useState, lazy, Suspense } from 'react';
import { UserOutlined, BookOutlined, PlusSquareOutlined, FormOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import '../../../../styles/views/Dashboard/ProfileStyle.css';
import GraduationReport from '../../../../components/dashboard/student/GraduationReport';
import { useAuth } from '../../../../authContext/AuthProvider';
const StudentProfileDetails = lazy(() => import('../../../../components/dashboard/admin/students/StudentProfileDetails'));
const StudentRegistration = lazy(() => import('../../../../components/dashboard/student/Registration'));
const StudentTable = lazy(() => import('../../../../components/dashboard/student/StudentTable'));
const StudentGraduationReport = lazy(() => import('../../../../components/dashboard/student/GraduationReport'));
const OpenClass =  lazy (() => import('../../../../components/dashboard/admin/students/OpenCourse'))

const StudentProfile = () => {
    const [activeItem, setActiveItem] = useState('details');
    const {role} = useAuth();
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
   
    return (
        <section className='container my-4'>
            <div className='row'>
                <div className='col-md-3'>
                    {/* <div className='profile-card' style={{backgroundColor:'transparent'}}>
                        <img src="https://placehold.co/600x400" alt="" width={'100%'} style={{borderRadius:8}}/>
                    </div> */}
                    <div className='profile-card p-4'>
                        <ul className='settings-list'>
                            <li className={`settings-item mb-3 ${activeItem === 'details' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('details')}><UserOutlined className='me-3'/>Profile details</li>
                            {
                                role === 'Student' &&
                                <li className={`settings-item mb-3 ${activeItem === 'registration' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('registration')}><FormOutlined className='me-3'/>Registration</li>

                            }

                            <li className={`settings-item mb-3 ${activeItem === 'table' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('table')}><FormOutlined className='me-3'/>Table</li>

                            <li className={`settings-item mb-3 ${activeItem === 'graduation-reports' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('graduation-reports')}><BookOutlined className='me-3'/>Graduation Reports</li>
                            {
                                role === 'Admin' &&
                                <li className={`settings-item mb-3 ${activeItem === 'open-class' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('open-class')}><PlusSquareOutlined className='me-3'/>Open Class</li>
                            }

                            {/* <li className={`settings-item ${activeItem === 'trainingHours' ? 'settings-item-active' : ''}`} onClick={() => handleItemClick('trainingHours')}><ClockCircleOutlined className='me-3'/> Training Hours</li> */}
                        </ul>
                    </div>
                </div>
                <div className='col-md-9'>
                    <Suspense fallback={<div>
                        <Spin />
                    </div>}>
                        {activeItem === 'details' && <StudentProfileDetails />}
                        {activeItem === 'registration' && <StudentRegistration></StudentRegistration> }
                        {activeItem === 'table' && <StudentTable></StudentTable> }
                        {activeItem === 'graduation-reports' && <GraduationReport></GraduationReport>}
                        {activeItem === 'open-class' && <OpenClass />}
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default StudentProfile;
