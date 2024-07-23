import React, { useState } from 'react';
import { Breadcrumb, Button, Form, Input, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScheduleTable from '../../../../components/dashboard/common/ScheduleTable';
const { Option } = Select;
const BreadcrumbItems = [
  {
    title: <Link to='/admin/dashboard'>Admin</Link>,
  },
  {
    title: 'Exams',
  },
];

const GenerateExamSchedule = () => {
  const [form] = Form.useForm();
  const [scheduleTableData, setScheduleTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const processData = (data) => {
    console.log('Raw Data:', data);
    return data.map(item => {
      if (item.classId && item.classId.type === 'Lecture') {
        return {
          day: item.day,
          time: item.timeSlot,
          type: item.classId.type,
          courseId: {
            courseCode: item.classId.courseId.courseCode,
            courseTitle: item.classId.courseId.courseTitle
          },
          classroomId: {
            classroomName: item.classId.classroomId.classroomName
          }
        };
      }
      return undefined;
    });
  };

  const fetchScheduleData = () => {
    setLoading(true);
    const userToken = localStorage.getItem('token');
    axios.get('https://acu-eng.onrender.com/api/v1/admin/generate-exam-schedule/', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        console.log('Success:', response.data);
        const processedData = processData(response.data);
        setScheduleTableData(processedData);
        message.success("Data retrieved successfully");
        setLoading(false);
      })
      .catch(error => {
        message.error("Something went wrong");
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    const userToken = localStorage.getItem('token');
    axios.post('https://acu-eng.onrender.com/api/v1/admin/generate-exam-schedule/', values, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        console.log('Success:', response.data);
        const processedData = processData(response.data);
        setScheduleTableData(processedData);
        message.success("Schedule generated successfully");
      })
      .catch(error => {
        message.error("Schedule generation failed");
        console.error('Error:', error);
      });
  };

  const handleViewSchedule = () => {
    fetchScheduleData();
  };

  return (
    <section className='container py-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='page-title'>Generate Exam Schedule</h2>
        <Breadcrumb items={BreadcrumbItems} />
      </div>
      <div className='p-4' style={{ backgroundColor: 'white', borderRadius: 8 }}>
        <Form
          form={form}
          className='d-flex justify-content-between'
          style={{ width: 400 }}
          onFinish={onFinish}
        >
          <Form.Item
            name='year'
            rules={[{ required: true, message: 'Please enter the year' }]}
          >
            <Input placeholder='Enter Year' />
          </Form.Item>
          <Form.Item
            name='semester'
            rules={[{ required: true, message: 'Please choose a semester' }]}
          >
            <Select placeholder='Choose semester'>
              <Option value='Spring'>Spring</Option>
              <Option value='Fall'>Fall</Option>
              <Option value='Summer'>Summer</Option>
            </Select>
          </Form.Item>
          <Button style={{ width: 'fit-content' }} className='col-3' type='primary' htmlType='submit'>Generate Exam</Button>
        </Form>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: 8 }} className="exam-schedule-table-container p-4 mt-4">
        <h3 className="">Exam Schedule</h3>
        <Button onClick={handleViewSchedule} style={{ marginBottom: '1rem' }}>View Schedule</Button>
        <ScheduleTable tableData={scheduleTableData} viewDownloadButton={true} tableName="Exam Schedule" />
      </div>
    </section>
  );
}

export default GenerateExamSchedule;
