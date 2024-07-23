import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Button, message, Spin } from 'antd'
import axios from 'axios';
const { Option } = Select;

const CourseForm = (props) => {
    const [prereqeustCoursesList, setPrereqeustCoursesList] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const userToken = localStorage.getItem("token");
                const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/courses', {
                    headers: {
                        Authorization: userToken
                    }
                });
                setLoading(false);
                setPrereqeustCoursesList(response.data.courses);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchCourses();
    }, [])

    const onAddCourse = async (values) => {
        const prerequest = values['pre-request'].split(" ");
        try {
            const apiData = {
                department: values['department'],
                courseCode: values["code"],
                courseTitle: values["title"],
                creditHours: values["hours"],
                level: values["level"],
                preRequestCourse: {
                    code: prerequest.length === 1 ? 'None' : prerequest[0],
                    title: prerequest.length === 1 ? 'None' : prerequest.slice(1, prerequest.length - 1).join(" "),
                    preRequestCourseId: prerequest.length === 1 ? null : prerequest[prerequest.length - 1],
                }
            };
            const userToken = localStorage.getItem('token');
            const response = await axios.post("https://acu-eng.onrender.com/api/v1/admin/course", apiData, {
                headers: {
                    Authorization: userToken,
                }
            });
            console.log('sent id ' + apiData.preRequestCourse.preRequestCourseId)
            console.log(response);
            message.success('Course created successfully');
            console.log('Course added successfully');
        }
        catch (error) {
            message.error('Something went wrong');
            console.log(error);
        }
    }
    if (loading) {
        return <Spin />
    }
    console.log(prereqeustCoursesList);
    return (
        <div style={{ backgroundColor: 'white', borderRadius: 12 }} className='container p-4'>
            <h2 className='page-title mb-4'>Course Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                onFinish={(onAddCourse)}
            >
                <Form.Item className='col-md-6'
                    label="Course Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter course title',
                        },
                    ]}
                >
                    <Input placeholder='Mathematics ..' />
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Course department"
                    name="department"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter course department',
                        },
                    ]}
                >
                    <Select placeholder="Select Department">
                        <Option value="General">General Science</Option>
                        <Option value="Electrical">Electrical department</Option>
                        <Option value="Architectural">Architectural department</Option>
                        <Option value="Civil">Civil department</Option>
                        <Option value="Mechanical">Mechanical department</Option>
                    </Select>
                </Form.Item>

                <Form.Item className='col-md-6'
                    label="Course Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter course code',
                        },
                    ]}
                >
                    <Input placeholder='BSE ..' />
                </Form.Item>

                <Form.Item className='col-md-6'
                    label="Credit Hours"
                    name="hours"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter course credit hours',
                        },
                    ]}
                >
                    <Input placeholder='3' />
                </Form.Item>

                <Form.Item className='col-md-6'
                    label="Credit Level"
                    name="level"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter course level',
                        },
                    ]}
                >
                    <Select placeholder="Select Department">
                        <Option value="1">Level One</Option>
                        <Option value="2">Level Two</Option>
                        <Option value="3">Level Three</Option>
                        <Option value="4">Level Four</Option>
                        <Option value="5">Level Five</Option>
                    </Select>
                </Form.Item>

                <Form.Item className='col-md-6'
                    label="Course Pre-request"
                    name="pre-request"
                >
                    <Select placeholder="Choose prerequest">
                        <Option key="none" value="None">None</Option>
                        {prereqeustCoursesList.map(course => (
                            <Option key={course._id} value={course.courseCode + ' ' + course.courseTitle + ' ' + course._id}>
                                {`${course.courseCode} - ${course.courseTitle}`}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-12'>
                    <Button type="primary" htmlType="submit">
                        Add Course
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CourseForm