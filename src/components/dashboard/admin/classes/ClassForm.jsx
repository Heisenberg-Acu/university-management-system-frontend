import React from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import axios from 'axios'

const {Option} = Select;
const ClassForm = () => {
    const onAddClass = async (values) => {
        try {
            const apiData = {
                type: values['type'],
                department: values['department'],
                courseTitle: values["title"],
                lecturerName: values["lecturer-name"],
                assistantLecturerName: values["assistant-lecturer-name"],
                classRoomName : values["room"],
                available : true,
                year: values["year"],
                term: values["term"],
                day: values["day"],
                time : values["time"]
            }
            const userToken = localStorage.getItem('token')
            const response = await axios.post("https://acu-eng.onrender.com/api/v1/admin/class", apiData, {
                headers: {
                    Authorization: userToken,
            }
        });
        console.log(response.data);
        message.success('Class created successfully');
        console.log('Class added successfully');
        }
        catch (error) {
            message.error("Something went wrong");
            console.log(error);
        }
    }
  return (
    <div style={{ backgroundColor: 'white', borderRadius: 12 }} className='container p-4'>
            <h2 className='page-title mb-4'>Class Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                onFinish={(onAddClass)}
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
                        <Option value="Electrical">Electrical department</Option>
                        <Option value="Architectural">Architectural department</Option>
                        <Option value="Civil">Civil department</Option>
                        <Option value="Mechanical">Mechanical department</Option>
                    </Select>
                </Form.Item>
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
                   <Input placeholder='course title'/>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Lecturer Name"
                    name="lecturer-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter lecturer name',
                        },
                    ]}
                >
                   <Input placeholder='lecturer name'/>
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Assistant Lecturer Name"
                    name="assistant-lecturer-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter assistant lecturer name',
                        },
                    ]}
                >
                   <Input placeholder='assistant lecturer name'/>
                </Form.Item>

                <Form.Item className='col-md-6'
                    label="Class Room Name"
                    name="class-room-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter class room name',
                        },
                    ]}
                >
                   <Input placeholder='class room name'/>
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
                   <Input placeholder='class year'/>
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
                <Form.Item className='col-md-12'>
                    <Button type="primary" htmlType="submit">
                        Add Class
                    </Button>
                </Form.Item>
            </Form>
        </div>
  )
}

export default ClassForm