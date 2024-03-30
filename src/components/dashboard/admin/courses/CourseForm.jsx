import React from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import axios from 'axios';
const { Option } = Select;

const CourseForm = (props) => {
    const onAddCourse = async (values) => {
        console.log(values["pre-request"])
        try {
            const apiData = {
                department: values['department'],
                courseCode: values["code"],
                courseTitle: values["title"],
                creditHours: values["hours"],
                level: values["level"],
                preRequestCourse: { title: values["pre-request-title"], code: values["pre-request-code"] }
            }
            const userToken = localStorage.getItem('token')
            const response = await axios.post("https://acu-eng.onrender.com/api/v1/admin/course", apiData, {
                headers: {
                    Authorization: userToken,
            }
        });
        console.log(response.data);
        message.success('Course created successfully');
        console.log('Course added successfully');
        }
        catch (error) {
            message.error('Something went wrong');
            console.log(error);
        }
    }
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
                        <Option value="Electrical">Electrical Department</Option>
                        <Option value="Mechanical">Mechanical Department</Option>
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
                <div className='d-flex justify-content-between col-md-6' style={{ maxWidth: '100%' }}>

                    <Form.Item className='col-md-8'
                        label="Course Pre-request"
                        name="pre-request-title"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter course pre-request title',
                            },
                        ]}
                    >
                        <Input placeholder='Course title' />
                    </Form.Item>
                    <Form.Item className='col-md-3 mt-auto'
                        name="pre-request-code"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter course pre-request code',
                            },
                        ]}
                    >
                        <Input placeholder='Course Code' />

                    </Form.Item>
                </div>
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