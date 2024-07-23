import React, { useEffect, useState } from 'react';
import { Form, Select, Spin, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const OpenCourse = () => {
  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const [studentId, setStudentId] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchClasses = async () => {
      const userToken = localStorage.getItem('token');
      const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/courses', {
        headers: {
          Authorization: userToken,
        },
      });
      console.log(response.data);
      const formattedCourses = response.data.courses.map((course) => ({
        id: course._id,
        title: course.courseTitle,
        code: course.courseCode,
      }));
      setCourseList(formattedCourses);
    };

    const fetchStudentInfo = async () => {
      const userToken = localStorage.getItem('token');
      const response = await axios.get(`https://acu-eng.onrender.com/api/v1/admin/student/${id}`, {
        headers: {
          Authorization: userToken,
        },
      });
      console.log(response.data)
      setStudentId(response.data.roleDocument._id);
    };

    const fetchData = async () => {
      try {
        await Promise.all([fetchClasses(), fetchStudentInfo()]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  const onOpenCourse = async (values) => {
    try{
      const userToken  = localStorage.getItem('token');
      const response = await axios.post('https://acu-eng.onrender.com/api/v1/Admin/show-class', {
        studentId: studentId,
        courseId: values.courseCode,
      },
      {
        headers : {
          Authorization: userToken
        }
      }) 
      message.success('class opened successfully');
    }
    catch (error) {
      console.log(error)
      message.error('something went wrong');
    }
  };

  return (
    <section className='profile-card p-4'>
      <h3 className='mb-4'>Choose course to open for the student</h3>
      <Form
        style={{
          width: '100%',
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onOpenCourse}
        className='d-flex justify-content-between'
      >
        <Form.Item
          className='col-8'
          name="courseCode"
          rules={[
            {
              required: true,
              message: 'Please enter class type',
            },
          ]}
        >
          <Select placeholder='Choose Course'>
            {courseList.map((course) => (
              <Option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" className='col-3'>
          Add
        </Button>
      </Form>
    </section>
  );
};

export default OpenCourse;
