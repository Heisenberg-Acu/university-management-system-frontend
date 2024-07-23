import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Switch, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const LecutrerForm = (props) => {
    const [lecturerData, setLecturerData] = useState(null);
    const isEditForm = props.formType === "Edit";
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        let isMounted = true;
    
        const getLecturerData = async () => {
            try {
                const userToken = localStorage.getItem("token");
                const response = await axios.get(`https://acu-eng.onrender.com/api/v1/admin/lecturer/${id}`, {
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
                    setLecturerData(responseData);
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
            getLecturerData();
        }
    
        return () => {
            isMounted = false;
        };
    }, [id, isEditForm]);
    

    const onAddLecturer = async (values) => {
        try {
            const apiData = {
                fullName: values['name'],
                role: 'Lecturer',
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
            message.success('Lecturer created successfully');
            console.log('Lecturer added successfully');
        } catch (error) {
            message.error('Something went wrong');
            console.log(error);
        }
    };
    const onEditLecturer = async (values) => {
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
            const response = await axios.patch(`https://acu-eng.onrender.com/api/v1/admin/lecturer/${id}`, apiData, {
                headers: {
                    Authorization: userToken,
                },
            });
            console.log(response.data);
            message.success('Lecturer updated successfully');
            console.log('Lecturer updated successfully');
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
            <h2 className='page-title mb-4'>Lecturer Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                initialValues={lecturerData}
                onFinish={(isEditForm? onEditLecturer : onAddLecturer)}
            >
                <Form.Item
                    className='col-md-6'
                    label="Lecturer Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter lecturer name',
                        },
                    ]}
                >
                    <Input placeholder="Enter Lecturer Name" defaultValue={lecturerData?.name}/>
                </Form.Item>
                <Form.Item
                    className='col-md-6'
                    label="Lecturer Nationality"
                    name="nationality"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter lecturer nationality',
                        },
                    ]}
                >
                    <Select placeholder="Select Nationality" defaultValue={lecturerData?.nationality}>
                        <Option value="egyptian">Egyptian</Option>
                        <Option value="foreign">Foreign</Option>
                    </Select>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Lecturer Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter lecturer email',
                        },
                    ]}
                >
                    <Input placeholder='Enter Lecturer email' defaultValue={lecturerData?.email}/>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Lecturer Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter lecturer password',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter Lecturer password' defaultValue={lecturerData?.password}/>
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
                    label="Lecturer Phone number"
                    name="phone"
                >
                    <Input placeholder='Enter Lecturer Phone number' defaultValue={lecturerData?.phoneNumber} />
                </Form.Item>
                <Form.Item
                    className='col-md-6'
                    label="Lecturer date of birth"
                    name="birthDate"
                >
                    <DatePicker style={{ width: '100%' }}  />
                </Form.Item>
                <Form.Item className='col-md-12'>
                    <Button type="primary" htmlType="submit">
                        {isEditForm ? "Edit" : "Add"} Lecturer
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LecutrerForm;
