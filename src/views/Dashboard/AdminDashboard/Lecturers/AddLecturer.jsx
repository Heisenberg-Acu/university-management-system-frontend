import React, { startTransition } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom';
import LecutrerForm from '../../../../components/dashboard/admin/lecturers/LecturerForm';
const BreadcrumbItems = [
  {
    title: <Link to='/admin'>Admin</Link>,
  },
  {
    title: <Link to='/admin/lecturers'>All Lecturers</Link>,
  },
  {
    title: 'Create Lecturer',
  }
];
const AddLecturer = () => {
  return (
    <div className='container py-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='page-title'>Add Lecturer</h2>
        <Breadcrumb items={BreadcrumbItems} />
      </div>
      <LecutrerForm formName="Add Lecturer"></LecutrerForm>
    </div>
  )
}

export default AddLecturer