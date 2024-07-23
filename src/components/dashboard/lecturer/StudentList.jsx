import React, { useEffect, useState } from 'react';
import { List, Button, message, Table, Modal, Form, Input } from 'antd';
import {EditOutlined} from '@ant-design/icons'
import axios from 'axios';

const StudentList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const userToken = localStorage.getItem('token');
        const response = await axios.get('https://acu-eng.onrender.com/api/v1/Lecturer/my-classes', {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        const lectureClasses = response.data.classes.filter(classItem => classItem.type === 'Lecture');
        setClasses(lectureClasses);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        message.error('Failed to fetch classes');
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const fetchStudents = async (classItem) => {
    setSelectedClass(classItem);
    try {
      const userToken = localStorage.getItem('token');
      const response = await axios.get(`https://acu-eng.onrender.com/api/v1/Lecturer/class/students/classwork/${classItem._id}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setStudents(response.data.students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      message.error('Failed to fetch students');
    }
  };

  const showModal = (student) => {
    setSelectedStudent(student);
    form.setFieldsValue({
      midExam: student.classwork.classwork.midExam,
      other: student.classwork.classwork.other,
    });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log(selectedStudent.student.roleDocument._id)
    try {
      const userToken = localStorage.getItem('token');
      await axios.patch(`https://acu-eng.onrender.com/api/v1/Lecturer/class/student/${selectedClass._id}/${selectedStudent.student.roleDocument._id}`, {
        finalExam: 0,
        midExam: form.getFieldValue('midExam'),
        other: form.getFieldValue('other'),
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      message.success('Student grades updated successfully');
      setIsModalVisible(false);
      fetchStudents(selectedClass); // Refresh the students list
    } catch (error) {
      console.error('Failed to update student grades:', error);
      message.error('Failed to update student grades');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: ['student', 'roleDocument', 'studentId'],
      key: 'studentId',
    },
    {
      title: 'Name',
      dataIndex: ['student', 'fullName'],
      key: 'name',
    },
    {
      title: 'Mid Exam',
      dataIndex: ['classwork', 'classwork', 'midExam'],
      key: 'midExam',
    },
    {
      title: 'Other',
      dataIndex: ['classwork', 'classwork', 'other'],
      key: 'other',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type='primary' onClick={() => showModal(record)}><EditOutlined /></Button>
      ),
    },
  ];

  return (
    <div className='profile-card p-4'>
      <h2>List of Lecture Classes</h2>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={classes}
        renderItem={classItem => (
          <List.Item
            actions={[
              <Button onClick={() => fetchStudents(classItem)} type="primary">
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
      {selectedClass && students && (
        <div>
          <h3>Students in class {selectedClass.courseId.courseTitle}</h3>
          <Table columns={columns} dataSource={students} rowKey={record => record.student._id} />
        </div>
      )}
      <Modal
        title="Update Student"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Mid Exam" name="midExam">
            <Input />
          </Form.Item>
          <Form.Item label="Other" name="other">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentList;
