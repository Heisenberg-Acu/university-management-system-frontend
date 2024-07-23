import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, ConfigProvider, Table, Modal, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const AssistantLecturersTableColumns = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber'
    },
    {
        title: 'Action',
        dataIndex: 'action',
    }
];

const AllAssistantLecturers = () => {
    const [assistantLecturers, setAssistantLecturers] = useState([]);
    const [selectedAssistantLecturerId, setSelectedAssistantLecturerId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const userToken = localStorage.getItem("token");
                const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/assistant-lecturers', {
                    headers: {
                        Authorization: userToken
                    }
                });
                console.log(response.data[0].roleDocument)
                const formattedAssistantLecturers = response.data.map(assistantLecturer => ({
                    key: assistantLecturer.roleDocument.assistantLecturerId,
                    name: assistantLecturer.fullName,
                    email: assistantLecturer.email,
                    phoneNumber: assistantLecturer.phoneNumber,
                    action: (
                        <div>
                            <button className='btn btn--red me-3' onClick={() => handleEdit(assistantLecturer.roleDocument.assistantLecturerId)}>
                                <FontAwesomeIcon icon={faPenToSquare}/>
                            </button>
                            <button className='btn btn--red' onClick={() => showDeleteConfirm(assistantLecturer.roleDocument.assistantLecturerId)}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </div>
                    )
                }));
                setAssistantLecturers(formattedAssistantLecturers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const showDeleteConfirm = (assistantLecturerId) => {
        setSelectedAssistantLecturerId(assistantLecturerId);
        setIsModalOpen(true);
    };

    const handleEdit = (assistantLecturerId) => {
        console.log('Editing assistant lecturer with ID:', assistantLecturerId);
    };

    const handleDelete = async () => {
        try {
            const userToken = localStorage.getItem('token');
            await axios.delete(`https://acu-eng.onrender.com/api/v1/admin/assistant-lecturer/${selectedAssistantLecturerId}`, {
                headers: { Authorization: userToken },
            });
            console.log(selectedAssistantLecturerId)
            const updatedAssistantLecturers = assistantLecturers.filter((assistantLecturer) => assistantLecturer.key !== selectedAssistantLecturerId);
            setAssistantLecturers(updatedAssistantLecturers);
            message.success('User deleted successfully');
            setIsModalOpen(false);
        } catch (error) {
            console.log(selectedAssistantLecturerId);
            message.success('Something went wrong');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <section className='container py-4'>
            <ConfigProvider>
                <section>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h2 className='page-title'>Assistant Lecturers</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/admin">Admin</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>All Assistant Lecturers</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </section>
                <section className='p-4 mt-5' style={{ backgroundColor: 'white', borderRadius: 12 }}>
                    <div className='d-flex justify-content-between'>
                        <h2 className='page-title'>Assistant Lecturers</h2>
                        <Link className='btn btn--red' to='/admin/assistant-lecturers/add-assistant-lecturer'>
                            <FontAwesomeIcon icon={faPlus} />
                        </Link>
                    </div>
                    <Table className='mt-5' columns={AssistantLecturersTableColumns} dataSource={assistantLecturers} />
                    <Modal
                        title='Delete Assistant Lecturer'
                        onOk={handleDelete}
                        onCancel={handleCancel}
                        open={isModalOpen}
                        okText='Delete'
                        cancelText='Cancel'
                    >
                        <p>Are you sure you want to delete this assistant lecturer?</p>
                    </Modal>
                </section>
            </ConfigProvider>
        </section>
    );
}

export default AllAssistantLecturers;
