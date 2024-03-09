import React from 'react'
import {Form, Select, Input} from 'antd';
const { Option } = Select;
const StudentsSearch = () => {
    return (
        <Form className='row'>
            <Form.Item className='col-md-4 mb-0'>
                <Input placeholder='Search by ID...'></Input>
            </Form.Item>
            <Form.Item className='col-md-4 mb-0'>
                <Select placeholder="Select department">
                    <Option value='General'>General</Option>
                    <Option value='Electrical'>Electrical Engineering</Option>
                    <Option value='Architectural'>Architectural Engineering</Option>
                    <Option value='Civil'>Civil Engineering</Option>
                    <Option value='Mechanical'>Mechanical Engineering</Option>
                </Select>
            </Form.Item>
            <button className='col-md-2 btn btn--red' htmlType="submit">
                Search
            </button>
        </Form>
    )
}

export default StudentsSearch