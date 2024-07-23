import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ClassForm = ({ lecturers = [], assistantLecturers = [], classrooms = [], courses = [] }) => {
    const [lecturer, setLecturer] = useState({ id: '', name: '' });
    const [assistantLecturer, setAssistantLecturer] = useState({ id: '', name: '' });
    const [classroom, setClassroom] = useState({ id: '', name: '' });
    const [course, setCourse] = useState({ id: '', title: '' });

    const handleLecturerChange = (value, option) => {
        setLecturer({ id: value, name: option.children });
    };

    const handleAssistantLecturerChange = (value, option) => {
        setAssistantLecturer({ id: value, name: option.children });
    };

    const handleClassroomChange = (value, option) => {
        setClassroom({ id: value, name: option.children });
    };

    const handleCourseChange = (value, option) => {
        setCourse({ id: value, title: option.children });
    };

    const filteredLecturers = lecturers.filter(lecturer =>
        lecturer.name.toLowerCase().includes(lecturer.name.toLowerCase())
    );

    const filteredAssistantLecturers = assistantLecturers.filter(assistantLecturer =>
        assistantLecturer.name.toLowerCase().includes(assistantLecturer.name.toLowerCase())
    );

    const filteredClassrooms = classrooms.filter(classroom =>
        classroom.name.toLowerCase().includes(classroom.name.toLowerCase())
    );

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(course.title.toLowerCase())
    );

    const onAddClass = async (values) => {
        const apiData = {
            type: values['type'],
            department: values['department'],
            courseId: course.id,
            lecturerId: lecturer.id,
            assistantLecturerId: assistantLecturer.id,
            classroomId: classroom.id,
            year: values['year'],
            term: values["term"],
            day: values["day"],
            time: values["time"]
        };
        console.log('d', apiData);
        try {
            const userToken = localStorage.getItem('token');
            const response = await axios.post("https://acu-eng.onrender.com/api/v1/admin/class", apiData, {
                headers: {
                    Authorization: userToken,
                }
            });
            message.success('Class created successfully');
        } catch (error) {
            message.error("Something went wrong");
            console.error(error);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', borderRadius: 12 }} className='container p-4'>
            <h2 className='page-title mb-4'>Class Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                onFinish={onAddClass}
            >
                <Form.Item className='col-md-6'
                    label="Type"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter class type',
                        },
                    ]}
                >
                    <Select placeholder="Class Type">
                        <Option value="Tutorial">Tutorial</Option>
                        <Option value="Lecture">Lecture</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Class department"
                    name="department"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter class department',
                        },
                    ]}
                >
                    <Select placeholder="Class department">
                        <Option value="General">General Science</Option>
                        <Option value="Electrical">Electrical department</Option>
                        <Option value="Architectural">Architectural department</Option>
                        <Option value="Civil">Civil department</Option>
                        <Option value="Mechanical">Mechanical department</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Course Title"
                    name="course"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter course title',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder='Course title'
                        onChange={handleCourseChange}
                        value={course.title}
                    >
                        {filteredCourses.map(course => (
                            <Option key={course.id} value={course.id}>
                                {course.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Lecturer Name"
                    name="lecturer"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter lecturer name',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder='Lecturer name'
                        onChange={handleLecturerChange}
                        value={lecturer.name}
                    >
                        {filteredLecturers.map(lecturer => (
                            <Option key={lecturer.id} value={lecturer.id}>
                                {lecturer.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Assistant Lecturer Name"
                    name="assistantLecturer"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter assistant lecturer name',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder='Assistant lecturer name'
                        onChange={handleAssistantLecturerChange}
                        value={assistantLecturer.name}
                    >
                        {filteredAssistantLecturers.map(assistantLecturer => (
                            <Option key={assistantLecturer.id} value={assistantLecturer.id}>
                                {assistantLecturer.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Class Room Name"
                    name="classroom"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter classroom name',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder='Classroom name'
                        onChange={handleClassroomChange}
                        value={classroom.name}
                    >
                        {filteredClassrooms.map(classroom => (
                            <Option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-3'
                    label="Class Year"
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter class year',
                        },
                    ]}
                >
                    <Input placeholder='class year' />
                </Form.Item>
                <Form.Item className='col-md-3'
                    label="Class Term"
                    name="term"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter class term',
                        },
                    ]}
                >
                    <Select placeholder="Choose Term">
                        <Option value="Fall">Fall</Option>
                        <Option value="Spring">Spring</Option>
                        <Option value="Summer">Summer</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-3'
                    label="Class Day"
                    name="day"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter class day',
                        },
                    ]}
                >
                    <Select placeholder="Choose a day">
                        <Option value="Saturday">Saturday</Option>
                        <Option value="Sunday">Sunday</Option>
                        <Option value="Monday">Monday</Option>
                        <Option value="Tuesday">Tuesday</Option>
                        <Option value="Wednesday">Wednesday</Option>
                        <Option value="Thursday">Thursday</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-3'
                    label="Class Time"
                    name="time"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter class time',
                        },
                    ]}
                >
                    <Select placeholder="Choose a time">
                        <Option value="9:00 To 10:50">9:00 To 10:50</Option>
                        <Option value="11:00 To 12:50">11:00 To 12:50</Option>
                        <Option value="1:00 To 2:50">1:00 To 2:50</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-12'>
                    <Button type="primary" htmlType="submit">
                        Add Class
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ClassForm;
