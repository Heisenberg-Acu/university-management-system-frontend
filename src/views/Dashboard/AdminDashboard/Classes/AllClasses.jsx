import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, ConfigProvider, Table, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { EyeOutlined } from '@ant-design/icons';
const ClassesTableColumns = [
  {
    title: 'Type',
    dataIndex: 'type'
  },
  {
    title: 'Course ID',
    dataIndex: 'courseId'
  },
  {
    title: 'Department',
    dataIndex: 'department'
  },
  {
    title: 'Year',
    dataIndex: 'year'
  },
  {
    title: 'Term',
    dataIndex: 'term'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  },
];

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerdStuntdents, setRegisterdStuntdents] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("token");
        const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/classes', {
          headers: {
            Authorization: userToken
          }
        });
        const formattedClasses = response.data.classes.map(classItem => {
          return {
            key: classItem._id,
            type: classItem.type,
            courseId: classItem.courseId.courseCode,
            department: classItem.department,
            year: classItem.year,
            term: classItem.term,
            action: (
              <div>
                <button className='btn btn--red me-3' onClick={() => viewRegisteredStudents(classItem.courseId.courseCode)}>
                  <EyeOutlined />
                </button>
                <button className='btn btn--red' onClick={() => showDeleteConfirm(classItem._id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            )
          }
        });
        const updatedRegisterdStuntdents = {};
        response.data.classes.forEach(classItem => {
          const courseCode = classItem.courseId.courseCode;
          updatedRegisterdStuntdents[courseCode] = classItem.classEnrollment;
        });
        setRegisterdStuntdents(updatedRegisterdStuntdents);

        setClasses(formattedClasses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const showDeleteConfirm = (classId) => {
    setSelectedClassId(classId);
    console.log(classId)
    setIsModalOpen(true);
  };

  const viewRegisteredStudents = (courseCode) => {
    console.log(registerdStuntdents);
    console.log(registerdStuntdents[courseCode]);
  };

  const handleDelete = async () => {
    try {
      const userToken = localStorage.getItem('token');
      await axios.delete(`https://acu-eng.onrender.com/api/v1/admin/class/${selectedClassId}`, {
        headers: { Authorization: userToken },
      });
      const updatedClasses = classes.filter((classItem) => classItem.key !== selectedClassId);
      setClasses(updatedClasses);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(registerdStuntdents);
  return (
    <section className='container py-4'>
      <ConfigProvider>
        <section>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2 className='page-title'>Classes</h2>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/admin">Admin</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>All Classes</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </section>
        <section className='p-4 mt-5' style={{ backgroundColor: 'white', borderRadius: 12 }}>
          <div className='d-flex justify-content-between'>
            <h2 className='page-title'>Classes</h2>
            <Link className='btn btn--red' to='/admin/classes/add-class'>
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <Table className='mt-5' columns={ClassesTableColumns} dataSource={classes} />
          <Modal
            title='Delete Class'
            onOk={handleDelete}
            onCancel={handleCancel}
            open={isModalOpen}
            okText='Delete'
            cancelText='Cancel'
          >
            <p>Are you sure you want to delete this class?</p>
          </Modal>
        </section>
      </ConfigProvider>
    </section>
  );
}

export default AllClasses;
