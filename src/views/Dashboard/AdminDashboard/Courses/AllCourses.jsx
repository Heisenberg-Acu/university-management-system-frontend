import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, ConfigProvider, Table, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const CoursesTableColumns = [
  {
      title: 'Course Code',
      dataIndex: 'courseCode'
  },
  {
      title: 'Course Title',
      dataIndex: 'courseTitle'
  },
  {
      title: 'Department',
      dataIndex: 'department'
  },
  {
      title: 'Credit Hours',
      dataIndex: 'creditHours'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  },
];

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("token");
        const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/courses', {
          headers: {
            Authorization: userToken
          }
        });
        const formattedCourses = response.data.courses.map(course => ({
          key: course._id,
          courseCode: course.courseCode,
          courseTitle: course.courseTitle,
          department: course.department,
          creditHours: course.creditHours,
          action: (
            <div>
              <button className='btn btn--red me-3' onClick={() => handleEdit(course._id)}>
                <FontAwesomeIcon icon={faPenToSquare}/>
              </button>
              <button className='btn btn--red' onClick={() => showDeleteConfirm(course._id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
              </button>
            </div>
          )
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const showDeleteConfirm = (courseId) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  const handleEdit = (courseId) => {
    console.log('Editing course with ID:', courseId);
  };

  const handleDelete = async () => {
    try {
      const userToken = localStorage.getItem('token');
      await axios.delete(`https://acu-eng.onrender.com/api/v1/admin/course/${selectedCourseId}`, {
        headers: { Authorization: userToken },
      });
      const updatedCourses = courses.filter((course) => course.key !== selectedCourseId);
      setCourses(updatedCourses);
      setIsModalOpen(false);
    } catch (error) {
      console.log(selectedCourseId)
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
            <h2 className='page-title'>Courses</h2>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/admin">Admin</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>All Courses</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </section>
        <section className='p-4 mt-5' style={{ backgroundColor: 'white', borderRadius: 12 }}>
          <div className='d-flex justify-content-between'>
            <h2 className='page-title'>Courses</h2>
            <Link className='btn btn--red' to='/admin/courses/add-course'>
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <Table className='mt-5' columns={CoursesTableColumns} dataSource={courses} />
          <Modal
            title='Delete Course'
            onOk={handleDelete}
            onCancel={handleCancel}
            open={isModalOpen}
            okText='Delete'
            cancelText='Cancel'
          >
            <p>Are you sure you want to delete this course?</p>
          </Modal>
        </section>
      </ConfigProvider>
    </section>
  );
}

export default AllCourses;
