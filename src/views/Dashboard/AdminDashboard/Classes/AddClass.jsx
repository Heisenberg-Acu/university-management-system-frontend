import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import ClassForm from '../../../../components/dashboard/admin/classes/ClassForm';
import axios from 'axios';

const BreadcrumbItems = [
    {
        title: <a href='/admin'>Admin</a>,
    },
    {
        title: <a href='/admin/classes'>All Classes</a>,
    },
    {
        title: 'Create Class',
    }
];

const AddClass = () => {
    const [loading, setLoading] = useState(true);
    const [lecturers, setLecturers] = useState([]);
    const [assistantLecturers, setAssistantLecturers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                setLoading(true);

                const [lecturersResponse, assistantLecturersResponse, coursesResponse, classroomsResponse] = await Promise.all([
                    axios.get('https://acu-eng.onrender.com/api/v1/admin/lecturers', {
                        headers: { Authorization: userToken }
                    }),
                    axios.get('https://acu-eng.onrender.com/api/v1/admin/assistant-lecturers', {
                        headers: { Authorization: userToken }
                    }),
                    axios.get('https://acu-eng.onrender.com/api/v1/admin/courses', {
                        headers: { Authorization: userToken }
                    }),
                    axios.get('https://acu-eng.onrender.com/api/v1/admin/classrooms', {
                        headers: { Authorization: userToken }
                    })
                ]);

                const lecturersData = lecturersResponse.data.map(lecturer => ({
                    id: lecturer.roleDocument._id,
                    name: lecturer.fullName
                }));
                setLecturers(lecturersData);

                const assistantLecturersData = assistantLecturersResponse.data.map(assistantLecturer => ({
                    id: assistantLecturer.roleDocument._id,
                    name: assistantLecturer.fullName
                }));
                setAssistantLecturers(assistantLecturersData);

                const coursesData = coursesResponse.data.courses.map(course => ({
                    id: course._id,
                    title: course.courseTitle
                }));
                setCourses(coursesData);

                const classroomsData = classroomsResponse.data.map(classroom => ({
                    id: classroom._id,
                    name: classroom.classroomName
                }));
                setClassrooms(classroomsData);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div className='container py-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='page-title'>Add Class</h2>
                <Breadcrumb items={BreadcrumbItems} />
            </div>
            <ClassForm 
                lecturers={lecturers} 
                assistantLecturers={assistantLecturers}
                courses={courses} 
                classrooms={classrooms} 
            />
        </div>
    );
}

export default AddClass;
