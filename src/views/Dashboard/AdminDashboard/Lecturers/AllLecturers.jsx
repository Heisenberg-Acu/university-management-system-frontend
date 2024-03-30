import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, ConfigProvider, Table, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import LecturersSearch from '../../../../components/dashboard/admin/lecturers/LecturersSearch';
import axios from 'axios';

const BreadcrumbItems = [
  {
    title: <Link to='/admin'>Admin</Link>,
  },
  {
    title: 'All Lecturers',
  },
];

const LecturersTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const AllLecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/lecturers', {
        headers: {
          Authorization: userToken,
        },
      });
      const formattedLecturers = response.data.map(lecturer => ({
        key: lecturer.lecturerId,
        name: lecturer.userId.fullName,
        email: lecturer.userId.email,
        phoneNumber: lecturer.userId.phoneNumber,
        action: (
          <div>
            <button className='btn btn--red me-3' onClick={() => handleEdit(lecturer.lecturerId)}>
              <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
            <button className='btn btn--red' onClick={() => showDeleteConfirm(lecturer.lecturerId)}>
              <FontAwesomeIcon icon={faTrashCan}/>
            </button>
          </div>
        ),
      }));
      setLecturers(formattedLecturers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showDeleteConfirm = (lecturerId) => {
    setSelectedLecturerId(lecturerId);
    setIsModalOpen(true);
  };

  const handleEdit = (lecturerId) => {
    console.log('Editing lecturer with ID:', lecturerId);
  };

  const handleDelete = async () => {
    try {
      const userToken = localStorage.getItem('token');
      await axios.delete(`https://acu-eng.onrender.com/api/v1/admin/lecturer/${selectedLecturerId}`, {
        headers: { Authorization: userToken },
      });
      const updatedLecturers = lecturers.filter((lecturer) => lecturer.key !== selectedLecturerId);
      setLecturers(updatedLecturers);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
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
            <h2 className='page-title'>Lecturers</h2>
            <Breadcrumb items={BreadcrumbItems} />
          </div>
          <LecturersSearch />
        </section>
        <section className='p-4 mt-5' style={{ backgroundColor: 'white', borderRadius: 12 }}>
          <div className='d-flex justify-content-between'>
            <h2 className='page-title'>Lecturers</h2>
            <Link className='btn btn--red' to ='add-lecturer'><FontAwesomeIcon icon={faPlus} /></Link>
          </div>
          <Table className='mt-5' columns={LecturersTableColumns} dataSource={lecturers} />
          <Modal
            title='Delete Lecturer'
            onOk={handleDelete}
            onCancel={handleCancel}
            visible={isModalOpen}
            okText='Delete'
            cancelText='Cancel'
          >
            <p>Are you sure you want to delete this lecturer?</p>
          </Modal>
        </section>
      </ConfigProvider>
    </section>
  );
};

export default AllLecturers;
