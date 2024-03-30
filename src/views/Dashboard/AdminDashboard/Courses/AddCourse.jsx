import React from 'react'
import { Breadcrumb } from 'antd'
import CourseForm from '../../../../components/dashboard/admin/courses/CourseForm';
const BreadcrumbItems = [
    {
        title: <a href='/admin'>Admin</a>,
    },
    {
        title: <a href='/admin/courses'>All Courses</a>,
    },
    {
        title: 'Create Course',
    }
];
const AddCourse = () => {
    return (
        <div className='container py-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='page-title'>Add Course</h2>
                <Breadcrumb items={BreadcrumbItems} />
            </div>
            <CourseForm formName="Add Lecturer"></CourseForm>
        </div>
    )
}

export default AddCourse