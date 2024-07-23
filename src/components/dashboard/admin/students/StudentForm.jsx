import React from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const StudentForm = (props) => {
    const onAddStudent = async (values) => {
        try {
            const apiData = {
                fullName: values['name'],
                role: 'Student',
                nationality: values['nationality'],
                email: values['email'],
                password: values['password'],
                phoneNumber: values['phone'],
                department: values['department'],
                level: values['level'],
                dateOfBirth: values['birthDate'],
            };
            const userToken = localStorage.getItem("token");
            const response = await axios.post('https://acu-eng.onrender.com/api/v1/admin/signup', apiData, {
                headers: {
                    Authorization: userToken,
                },
            });
            console.log(response.data);
            message.success('Student created successfully');
            console.log('Student added successfully');
        } catch (error) {
            message.error('Something went wrong');
            console.log(error);
        }
    };
    return (
        <div style={{ backgroundColor: 'white', borderRadius: 12 }} className='container p-4'>
            <h2 className='page-title mb-4'>Student Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                onFinish={onAddStudent}
            >
                <Form.Item
                    className='col-md-6'
                    label="Student Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter student name',
                        },
                    ]}
                >
                    <Input placeholder="Enter Student Name"/>
                </Form.Item>
                <Form.Item
                    className='col-md-6'
                    label="Student Nationality"
                    name="nationality"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter student nationality',
                        },
                    ]}
                >
                    <Select placeholder="Select Nationality" >
                        <Option value="egyptian">Egyptian</Option>
                        <Option value="foreign">Foreign</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Student Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter student email',
                        },
                    ]}
                >
                    <Input placeholder='Enter Student email' />
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Student Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter student password',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter Student password' />
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Student Level"
                    name="level"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter student level',
                        },
                    ]}
                >
                    <Select placeholder="Select Student Level" >
                        <Option value='1'>One</Option>
                        <Option value='2'>Two</Option>
                        <Option value='3'>Three</Option>
                        <Option value='4'>Four</Option>
                        <Option value='5'>Five</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Student Department"
                    name="department"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter student department',
                        },
                    ]}
                >
                    <Select placeholder="Select Student Department">
                        <Option value='General'>General Science</Option>
                        <Option value='Electrical'>Electrical Engineering</Option>
                        <Option value='Architectural'>Architectural Engineering</Option>
                        <Option value='Civil'>Civil Engineering</Option>
                        <Option value='Mechanical'>Mechanical Engineering</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Student Phone number"
                    name="phone"
                >
                    <Input placeholder='Enter Student Phone number' />
                </Form.Item>
                <Form.Item
                    className='col-md-6'
                    label="Student date of birth"
                    name="birthDate"
                >
                    <DatePicker style={{ width: '100%' }}  />
                </Form.Item>
                <Form.Item className='col-md-12'>
                    <Button type="primary" htmlType="submit">
                        Add Student
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StudentForm;
