import React from 'react'
import { Breadcrumb } from 'antd'
import ClassForm from '../../../../components/dashboard/admin/classes/ClassForm';
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
    return (
        <div className='container py-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='page-title'>Add Class</h2>
                <Breadcrumb items={BreadcrumbItems} />
            </div>
            <ClassForm formName="Add Class"></ClassForm>
        </div>
    )
}

export default AddClass