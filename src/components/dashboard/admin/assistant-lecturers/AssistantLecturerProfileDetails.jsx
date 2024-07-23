import React from 'react'

import { useAuth } from '../../../../authContext/AuthProvider';
import { useParams } from 'react-router-dom';
import Profile from '../common/Profile'

const AssistantLecturerProfileDetails = () => {
    const { role } = useAuth();
    const { id } = useParams();

    const profileApi = role === 'Admin' ? `https://acu-eng.onrender.com/api/v1/admin/AssistantLecturer/${id}` : 'https://acu-eng.onrender.com/api/v1/AssistantLecturer/profile';

    return (
        <Profile profileApi={profileApi}/>
    )
}

export default AssistantLecturerProfileDetails