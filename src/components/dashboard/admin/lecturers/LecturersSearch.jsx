import React from 'react'
import { Form, Select, Input } from 'antd';

const { Option } = Select;
const LecturersSearch = () => {
    return (
        <Form className='row'>
            <Form.Item className='col-md-4 mb-0'>
                <Input placeholder='Search by Email...'></Input>
            </Form.Item>
            <Form.Item className='col-md-4 mb-0'>
                <Input placeholder='Search by Name...'></Input>
            </Form.Item>
            <button className='col-md-2 btn btn--red' htmlType="submit">
                Search
            </button>
        </Form>
    )
}

export default LecturersSearch