import React from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import axios from 'axios'

const RoomForm = () => {
    const onAddRoom = async (values) => {
        try {
            const apiData = {
                classRoomName: values['class-room-name'],
                capacity: values["capacity"],
                available: true,
            }
            const userToken = localStorage.getItem('token')
            const response = await axios.post("https://acu-eng.onrender.com/api/v1/admin/classroom", apiData, {
                headers: {
                    Authorization: userToken,
            }
        });
        console.log(response.data);
        message.success('Room created successfully');
        console.log('Room added successfully');
        }
        catch (error) {
            message.error('Something went wrong');
        }
    }
    return (
        <div style={{ backgroundColor: 'white', borderRadius: 12 }} className='container p-4'>
            <h2 className='page-title mb-4'>Room Information</h2>
            <Form
                className='row'
                requiredMark={false}
                labelCol={{
                    span: 24,
                }}
                onFinish={(onAddRoom)}
            >
                <Form.Item className='col-md-6'
                    label="Room name"
                    name="class-room-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter room name',
                        },
                    ]}
                >
                    <Input placeholder='Room ..' />
                </Form.Item>
                <Form.Item className='col-md-6'
                    label="Room capacity"
                    name="capacity"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter room capacity',
                        },
                    ]}
                >
                    <Input placeholder='xxx'/>
                </Form.Item>
                <Form.Item className='col-md-12'>
                    <Button type="primary" htmlType="submit">
                        Add Room
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RoomForm