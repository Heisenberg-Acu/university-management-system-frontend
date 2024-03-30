import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Switch, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const AssistantLecturerForm = (props) => {
    const [assistantlecturerData, setAssistantLecturerData] = useState(null);
    const isEditForm = props.formType === "Edit";
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        let isMounted = true;
    
        const getAssistantLecturerData = async () => {
            try {
                const userToken = localStorage.getItem("token");
                const response = await axios.get(`https://acu-eng.onrender.com/api/v1/admin/assistant-lecturer/${id}`, {
                    headers: {
                        Authorization: userToken,
                    },
                });
    
                if (isMounted) {
                    const responseData = {
                        name: response.data.userId.fullName,
                        nationality: response.data.userId.nationality,
                        email: response.data.userId.email,
                        password: response.data.userId.password,
                        level: response.data.level,
                        department: response.data.department,
                        phoneNumber: response.data.userId.phoneNumber,
                        dateOfBirth: response.data.userId.dateOfBirth,
                        specialization: response.data.specialist ? response.data.specialist : 'Computer',
                        registration: response.data.registration || false,
                        trainingHours: response.data.trainingHours || 0,
                    };
                    setAssistantLecturerData(responseData);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
    
        if (isEditForm) {
            getAssistantLecturerData();
        }
    
        return () => {
            isMounted = false;
        };
    }, [id, isEditForm]);
    

    const onAddAssistantLecturer = async (values) => {
        try {
            const apiData = {
                fullName: values['name'],
                role: 'AssistantLecturer',
                nationality: values['nationality'],
                email: values['email'],
                password: values['password'],
                phoneNumber: values['phone'],
                dateOfBirth: values['birthDate'],
            };
            const userToken = localStorage.getItem("token");
            const response = await axios.post('https://acu-eng.onrender.com/api/v1/admin/signup', apiData, {
                headers: {
                    Authorization: userToken,
                },
            });
            console.log(response.data);
            message.success('Assistant Lecturer created successfully');
            console.log('Assistant Lecturer added successfully');
        } catch (error) {
            message.error('Something went wrong');
            console.log(error);
        }
    };
    const onEditAssistantLecturer = async (values) => {
        try {
            const apiData = {
                fullName: values['name'],
                nationality: values['nationality'],
                email: values['email'],
                password: values['password'],
                phoneNumber: values['phone'],
                dateOfBirth: values['birthDate'],
            };
            console.log(values['registration']);
            const userToken = localStorage.getItem("token");
            const response = await axios.patch(`https://acu-eng.onrender.com/api/v1/admin/assistant-lecturer/${id}`, apiData, {
                headers: {
                    Authorization: userToken,
                },
            });
            console.log(response.data);
            message.success('Assistant Lecturer updated successfully');
            console.log('Assistant Lecturer updated successfully');
        } catch (error) {
            console.error(error);
            message.error('Something went wrong');
        }
    };
    if (loading && isEditForm) {
        return (<Spin />); 
    }

    return (
        <div style={{ backgroundColor: 'white', borderRadius: 12 }} className='container p-4'>
            <h2 className='page-title mb-4'>Assistant Lecturer Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                initialValues={assistantlecturerData}
                onFinish={(isEditForm? onEditAssistantLecturer : onAddAssistantLecturer)}
            >
                <Form.Item
                    className='col-md-6'
                    label="Assistant Lecturer Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter assistant lecturer name',
                        },
                    ]}
                >
                    <Input placeholder="Enter Assistant Lecturer Name" defaultValue={assistantlecturerData?.name}/>
                </Form.Item>
                <Form.Item
                    className='col-md-6'
                    label="Assistant Lecturer Nationality"
                    name="nationality"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter assistant lecturer nationality',
                        },
                    ]}
                >
                    <Select placeholder="Select Nationality" defaultValue={assistantlecturerData?.nationality}>
                        <Option value="egyptian">Egyptian</Option>
                        <Option value="foreign">Foreign</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Assistant Lecturer Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter assistant lecturer email',
                        },
                    ]}
                >
                    <Input placeholder='Enter Assistant Lecturer email' defaultValue={assistantlecturerData?.email}/>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Assistant Lecturer Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter assistant lecturer password',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter Assistant Lecturer password' defaultValue={assistantlecturerData?.password}/>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Assistant Lecturer Phone number"
                    name="phone"
                >
                    <Input placeholder='Enter Assistant Lecturer Phone number' defaultValue={assistantlecturerData?.phoneNumber} />
                </Form.Item>
                <Form.Item
                    className='col-md-6'
                    label="Assistant Lecturer date of birth"
                    name="birthDate"
                >
                    <DatePicker style={{ width: '100%' }}  />
                </Form.Item>
                {/* Common Submit Button */}
                <Form.Item className='col-md-12'>
                    <Button type="primary" htmlType="submit">
                        {isEditForm ? "Edit" : "Add"} Assistant Lecturer
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AssistantLecturerForm;
