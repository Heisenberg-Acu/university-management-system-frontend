import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, ConfigProvider, Table, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const RoomsTableColumns = [
  {
      title: 'Classroom Name',
      dataIndex: 'name'
  },
  {
      title: 'Capacity',
      dataIndex: 'capacity'
  },
  {
      title: 'Available',
      dataIndex: 'available'
  },
  {
    title: 'Action',
    dataIndex: 'action'
},
];

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("token");
        const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/classrooms', {
          headers: {
            Authorization: userToken
          }
        });
        console.log(response)
        const formattedRooms = response.data.map(room => ({
          key: room._id,
          name: room.classroomName,
          capacity: room.capacity,
          available: room.available ? 'Available' : 'Not Available',
          action: (
            <div>
              <button className='btn btn--red me-3' onClick={() => handleEdit(room._id)}>
                <FontAwesomeIcon icon={faPenToSquare}/>
              </button>
              <button className='btn btn--red' onClick={() => showDeleteConfirm(room._id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
              </button>
            </div>
          )
        }));
        setRooms(formattedRooms);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const showDeleteConfirm = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const handleEdit = (roomId) => {
    console.log('Editing room with ID:', roomId);
  };

  const handleDelete = async () => {
    try {
      const userToken = localStorage.getItem('token');
      await axios.delete(`https://acu-eng.onrender.com/api/v1/admin/classroom/${selectedRoomId}`, {
        headers: { Authorization: userToken },
      });
      const updatedRooms = rooms.filter((room) => room.key !== selectedRoomId);
      setRooms(updatedRooms);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.response.data.message);
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
            <h2 className='page-title'>Rooms</h2>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/admin">Admin</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>All Rooms</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </section>
        <section className='p-4 mt-5' style={{ backgroundColor: 'white', borderRadius: 12 }}>
          <div className='d-flex justify-content-between'>
            <h2 className='page-title'>Rooms</h2>
            <Link className='btn btn--red' to='/admin/rooms/add-room'>
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <Table className='mt-5' columns={RoomsTableColumns} dataSource={rooms} />
          <Modal
            title='Delete Room'
            onOk={handleDelete}
            onCancel={handleCancel}
            open={isModalOpen}
            okText='Delete'
            cancelText='Cancel'
          >
            <p>Are you sure you want to delete this room?</p>
          </Modal>
        </section>
      </ConfigProvider>
    </section>
  );
}

export default AllRooms;
