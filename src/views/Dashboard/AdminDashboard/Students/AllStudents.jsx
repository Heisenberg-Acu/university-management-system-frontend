import React, { useEffect, useState, startTransition } from 'react';
import { Breadcrumb, ConfigProvider, Table, Modal } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import StudentsSearch from '../../../../components/dashboard/admin/students/StudentsSearch';
import axios from 'axios';
import '../../../../styles/views/Dashboard/CommonStyle.css';

const BreadcrumbItems = [
  {
    title: <a href='/admin'>Admin</a>,
  },
  {
    title: 'All Students',
  },
];
const StudentsTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Level',
    dataIndex: 'level',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    axios.get('https://acu-eng.onrender.com/api/v1/admin/students', {
      headers: { Authorization: userToken }
    })
      .then(response => {
        const formattedStudents = response.data.map(apiStudent => ({
          name: apiStudent.userId.fullName,
          id: apiStudent.studentId,
          email: apiStudent.userId.email,
          department: apiStudent.department,
          level: apiStudent.level,
          action: (
            <div className='d-flex'>
              <button className='btn btn--red me-3' onClick={() => startTransition(() => {
                navigate(`/admin/students/edit-student/${apiStudent.studentId}`);
              })}>
                <FontAwesomeIcon icon={faPenToSquare} /></button>
              <button className='btn btn--red' onClick={() => showDeleteConfirm(apiStudent.studentId)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          ),
        }));
        setStudents(formattedStudents);
      }).catch(error => {

      })
  }, []);
  const showDeleteConfirm = (studentId) => {
    setSelectedStudentId(studentId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const userToken = localStorage.getItem('token');
      console.log(selectedStudentId);
      await axios.delete(`https://acu-eng.onrender.com/api/v1/admin/student/${selectedStudentId}`, {
        headers: { Authorization: userToken },
      });
      const updatedStudents = students.filter((student) => student.id !== selectedStudentId);
      setStudents(updatedStudents);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container py-4'>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeBorderColor: '#D50B1B',
              hoverBorderColor: '#D50B1B',
            },
          },
        }}
      >
        <section>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2 className='page-title'>Students</h2>
            <Breadcrumb items={BreadcrumbItems} />
          </div>
          <StudentsSearch></StudentsSearch>
        </section>

        <section className='p-4 mt-5' style={{ backgroundColor: 'white', borderRadius: 12 }}>
          <div className='d-flex justify-content-between'>
            <h2 className='page-title'>Students</h2>
            <Link className='btn btn--red' to='/admin/students/add-student'><FontAwesomeIcon icon={faPlus} /></Link>
          </div>
          <Table className='mt-5' columns={StudentsTableColumns} dataSource={students} />
          <Modal
            title='Delete Student'
            onOk={handleDelete}
            onCancel={handleCancel}
            open={isModalOpen}
            okText='Delete'
            cancelText='Cancel'
          >
            <p>Are you sure you want to delete this student?</p>
          </Modal>
        </section>
      </ConfigProvider>
    </div>
  );
};

export default AllStudents;
