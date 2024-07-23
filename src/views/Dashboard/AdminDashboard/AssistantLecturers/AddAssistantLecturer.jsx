import React,{useEffect} from 'react'
import { Breadcrumb, Spin } from 'antd'
import { useAuth } from '../../../../authContext/AuthProvider';
import AssistantLecturerForm from '../../../../components/dashboard/admin/assistant-lecturers/AssitantLecturerForm';
const BreadcrumbItems = [
    {
      title: <a href='/admin'>Admin</a>,
    },
    {
      title: <a href='/admin/assistant-lecturers'>All Assistant Lecturers</a>,
    },
    {
        title: 'Create Assistant Lecturer',
    }
  ];
const AddAssistantLecturer = () => {
  return (
    <div className='container py-4'>
    <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='page-title'>Add Assistant Lecture</h2>
        <Breadcrumb items={BreadcrumbItems} />
      </div>
    <AssistantLecturerForm formName="Add Assistant Lecture"></AssistantLecturerForm>
</div>
  )
}

export default AddAssistantLecturer