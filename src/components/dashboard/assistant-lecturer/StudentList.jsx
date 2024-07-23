import React, { useEffect, useState } from 'react';
import { List, Button, message } from 'antd';
import axios from 'axios';

const StudentList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    axios.get('https://acu-eng.onrender.com/api/v1/AssistantLecturer/my-classes', {
      headers: {
        Authorization: userToken
      }
    })
      .then(response => {
        const tutorialClasses = response.data.classes.filter(classItem => classItem.type === 'Tutorial');
        setClasses(tutorialClasses);
        setLoading(false);
      })
      .catch(error => {
        message.error('Failed to fetch classes');
        setLoading(false);
      });
  }, []);

  const fetchStudents = (classId) => {
    setSelectedClassId(classId);
    setStudents(null); 
    const userToken = localStorage.getItem('token');
    axios.get(`https://acu-eng.onrender.com/api/v1/AssistantLecturer/class/students/${classId}`,{
      headers: {
        Authorization: userToken
      }
    })
      .then(response => {
        setStudents(response.data.students); 
      })
      .catch(error => {
        message.error('Failed to fetch students');
      });
  };

  return (
    <div className='profile-card p-4'>
      <h2>List of Tutorial Classes</h2>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={classes}
        renderItem={classItem => (
          <List.Item
            actions={[
              <Button onClick={() => fetchStudents(classItem._id)} type="primary">
                Details
              </Button>
            ]}
          >
            <List.Item.Meta
              title={classItem.courseId.courseTitle}
              description={`${classItem.day} ${classItem.time}`}
            />
          </List.Item>
        )}
      />
      {selectedClassId && students && (
        <div>
            <List
            itemLayout="horizontal"
            dataSource={students}
            renderItem={student => (
              <List.Item>
                <List.Item.Meta
                  title={student.name} 
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default StudentList;
