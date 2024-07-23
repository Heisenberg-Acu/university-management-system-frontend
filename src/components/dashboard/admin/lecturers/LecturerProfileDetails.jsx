import React from 'react'

import { useAuth } from '../../../../authContext/AuthProvider';
import { useParams } from 'react-router-dom';
import Profile from '../common/Profile'
const LecturerProfileDetails = () => {
    const { role } = useAuth();
    const { id } = useParams();

    const profileApi = role === 'Admin' ? `https://acu-eng.onrender.com/api/v1/admin/student/${id}` : 'https://acu-eng.onrender.com/api/v1/Lecturer/profile';
    return (
        <Profile profileApi={profileApi} />
    )
}

export default LecturerProfileDetails