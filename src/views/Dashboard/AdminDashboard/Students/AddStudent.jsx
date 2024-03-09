import React from 'react'
import StudentForm from '../../../../components/dashboard/admin/students/StudentForm'
import { Breadcrumb } from 'antd'
const BreadcrumbItems = [
    {
      title: <a href='/admin'>Admin</a>,
    },
    {
      title: <a href='/admin/students'>All Students</a>,
    },
    {
        title: 'Create Student',
    }
  ];
const AddStudent = () => {
  return (
    <div className='container py-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2 className='page-title'>Add Students</h2>
            <Breadcrumb items={BreadcrumbItems} />
          </div>
        <StudentForm formName="Add Student"></StudentForm>
    </div>
  )
}

export default AddStudent