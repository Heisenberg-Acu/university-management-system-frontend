import React from 'react'
import { Breadcrumb } from 'antd'
import RoomForm from '../../../../components/dashboard/admin/rooms/RoomForm';
const BreadcrumbItems = [
    {   
        title: <a href='/admin'>Admin</a>,
    },
    {
        title: <a href='/admin/rooms'>All Rooms</a>,
    },
    {
        title: 'Create Room',
    }
];
const AddRoom = () => {
    return (
        <div className='container py-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='page-title'>Add Room</h2>
                <Breadcrumb items={BreadcrumbItems} />
            </div>
            <RoomForm formName="Add Lecturer"></RoomForm>
        </div>
    )
}

export default AddRoom