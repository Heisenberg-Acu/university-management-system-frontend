import React, { useEffect, useState } from 'react';
import { Button, Form, Select, message } from 'antd';
import axios from 'axios';
import ScheduleTable from '../common/ScheduleTable';

const { Option } = Select;

const Registration = () => {
  const [courses, setCourses] = useState({});
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [registrationStatus, setRegistrationStatus] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userToken = localStorage.getItem('token');
        const response = await axios.get('https://acu-eng.onrender.com/api/v1/student/registration', {
          headers: {
            Authorization: userToken
          }
        });
        console.log(response);
        const filteredCourses = {};
        setRegistrationStatus(true);
        response.data.filteredClasses.forEach(course => {
          const { courseId, type, day, time, _id } = course;
          const { courseCode, courseTitle } = courseId;

          if (!filteredCourses[courseCode]) {
            filteredCourses[courseCode] = { courseTitle, lecture: [], tutorial: [] };
          }

          if (type === 'Lecture') {
            filteredCourses[courseCode].lecture.push({ _id, day, time, type, courseId, classroomId: course.classroomId });
          } else if (type === 'Tutorial') {
            filteredCourses[courseCode].tutorial.push({ _id, day, time, type, courseId, classroomId: course.classroomId });
          }
        });

        setCourses(filteredCourses);
      } catch (error) {
        setRegistrationStatus(false);
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);
  
  const handleSelectChange = (courseCode, type, value) => {
    setSelectedCourses((prevSelectedCourses) => {
      const newSelectedCourses = prevSelectedCourses.filter(
        course => !(course.courseCode === courseCode && course.type.toLowerCase() === type)
      );
      if (value !== undefined) {
        const selectedCourse = courses[courseCode][type].find(course => course._id === value);
        newSelectedCourses.push({ courseCode, type: type.toLowerCase(), ...selectedCourse });
      }
      return newSelectedCourses;
    });
  };
  console.log('new ', selectedCourses)


  const onFinish = async () => {
    const classesId = selectedCourses.map(course => course._id);

    try {
      const userToken = localStorage.getItem('token');
      const response = await axios.post('https://acu-eng.onrender.com/api/v1/student/registration', { classesId }, {
        headers: {
          Authorization: userToken,
        }
      });
      messageApi.open({
        type: 'success',
        content: 'Your registration completed successfully',
      });
      console.log(response);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
      });
      console.log(error);
    }
  };

  return (
    <div className='container profile-card p-4'>
      {contextHolder}
      <div className='d-flex justify-content-between'>
        <h3>Registration</h3>
        {
          registrationStatus === true && 
          <div></div>
        }
      </div>

      {selectedCourses.length > 0 && <ScheduleTable tableData={selectedCourses} />}
      {registrationStatus === true &&

        <div className='container-fluid p-0 my-4'>
          <div>
            <Form
              className='row g-4'
              onFinish={onFinish}
              labelCol={{ span: 24 }}
            >
              {Object.keys(courses).map(courseCode => (
                <div key={courseCode} className='col-md-6 col-lg-4 mb-3'>
                  <div className='registration-card'>
                    <h4 className='course-title mb-3'>{courseCode + " " + courses[courseCode].courseTitle}</h4>
                    <Form.Item
                      name={`${courseCode}-lecture`}
                      label="Lecture time:"
                    >
                      <Select
                        placeholder="Lecture time"
                        allowClear
                        onChange={(value) => handleSelectChange(courseCode, 'lecture', value)}
                      >
                        {courses[courseCode].lecture.map(lecture => (
                          <Option key={lecture._id} value={lecture._id}>{`${lecture.time} - ${lecture.day}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={`${courseCode}-tutorial`}
                      label="Tutorial time:"
                    >
                      <Select
                        placeholder="Tutorial time"
                        allowClear
                        onChange={(value) => handleSelectChange(courseCode, 'tutorial', value)}
                      >
                        {courses[courseCode].tutorial.map(tutorial => (
                          <Option key={tutorial._id} value={tutorial._id}>{`${tutorial.time} - ${tutorial.day}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              ))}
              <div className='col-12'>
                <Button className='col-3' type='primary' htmlType="submit">Register</Button>
              </div>
            </Form>
          </div>
        </div>
      }
      {
        registrationStatus === false && 
        <div className='my-5'>Registration is closed for you</div>
      }
    </div>
  );
};

export default Registration;
