import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Switch, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const StudentForm = (props) => {
    const [studentData, setStudentData] = useState(null);
    const isEditForm = props.formType === "Edit";
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        let isMounted = true;
    
        const getStudentData = async () => {
            try {
                const userToken = localStorage.getItem("token");
                const response = await axios.get(`https://acu-eng.onrender.com/api/v1/admin/student/${id}`, {
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
                    setStudentData(responseData);
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
            getStudentData();
        }
    
        return () => {
            isMounted = false;
        };
    }, [id, isEditForm]);
    

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
    const onEditStudent = async (values) => {
        try {
            const apiData = {
                fullName: values['name'],
                nationality: values['nationality'],
                email: values['email'],
                password: values['password'],
                phoneNumber: values['phone'],
                department: values['department'],
                level: values['level'],
                dateOfBirth: values['birthDate'],
                specialist: values['specialization'],
                registration: values['registration'] === true ?true:false, 
                trainingHours: values['training-hours'],
            };
            console.log(values['registration']);
            const userToken = localStorage.getItem("token");
            const response = await axios.patch(`https://acu-eng.onrender.com/api/v1/admin/student/${id}`, apiData, {
                headers: {
                    Authorization: userToken,
                },
            });
            console.log(response.data);
            message.success('Student updated successfully');
            console.log('Student updated successfully');
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
            <h2 className='page-title mb-4'>Student Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                initialValues={studentData}
                onFinish={(isEditForm? onEditStudent : onAddStudent)}
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
                    <Input placeholder="Enter Student Name" defaultValue={studentData?.name}/>
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
                    <Select placeholder="Select Nationality" defaultValue={studentData?.nationality}>
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
                    <Input placeholder='Enter Student email' defaultValue={studentData?.email}/>
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
                    <Input.Password placeholder='Enter Student password' defaultValue={studentData?.password}/>
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
                    <Select placeholder="Select Student Level" defaultValue={studentData?.level}>
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
                    <Select placeholder="Select Student Department" defaultValue={studentData?.department}>
                        <Option value='General'>General</Option>
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
                    <Input placeholder='Enter Student Phone number' defaultValue={studentData?.phoneNumber} />
                </Form.Item>
                <Form.Item
                    className='col-md-6'
                    label="Student date of birth"
                    name="birthDate"
                >
                    <DatePicker style={{ width: '100%' }}  />
                </Form.Item>

                {/* Edit Student */}
                {isEditForm && (
                    <>
                        {/* Edit Student Fields */}
                        <Form.Item className='col-md-6' label="Student specialization" name="specialization" defaultValue={studentData?.specialization}>
                            <Select placeholder="Select Student Specialization">
                                <Option value='Computer'>Computer</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className='col-md-6' label="Student Registration" name="registration">
                            <Switch defaultChecked={studentData?.registration} />
                        </Form.Item>
                        <Form.Item className='col-md-6' label="Student Training Hours" name="training-hours">
                            <Input defaultValue={studentData?.trainingHours} />
                        </Form.Item>
                    </>
                )}

                {/* Common Submit Button */}
                <Form.Item className='col-md-12'>
                    <Button type="primary" htmlType="submit">
                        {isEditForm ? "Edit" : "Add"} Student
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StudentForm;
