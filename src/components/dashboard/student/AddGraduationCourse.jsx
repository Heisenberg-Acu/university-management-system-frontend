import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddGraduationCourse = () => {
    const [courses, setCourses] = useState({});

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const userToken = localStorage.getItem("token");
                const response = await axios.get('https://acu-eng.onrender.com/api/v1/admin/courses', {
                    headers: {
                        Authorization: userToken,
                    },
                });
                const coursesData = response.data.courses.reduce((acc, course) => {
                    acc[course.courseCode] = course._id;
                    return acc;
                }, {});
                setCourses(coursesData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const onAddGraduationCourse = async (values) => {
        const apiData = {
            studentId: "667cbe9f4a35c759149f586b",
            courseId: courses[values['course-code']],
            grade: values['grade'],
            year: values['year'],
            term: values['term']
        };
        try {
            const userToken = localStorage.getItem("token");
            await axios.post('https://acu-eng.onrender.com/api/v1/admin/transferring-courses-taken', apiData, {
                headers: {
                    Authorization: userToken,
                },
            });
            message.success('Course added successfully');
        } catch (error) {
            console.log(apiData);
            message.error('Something went wrong');
            console.log(error);
        }
    }

    return (
        <div>
            <h3 className='mb-4'>Add / Update Graduation Course:</h3>
            <Form
                className='d-flex justify-content-between col-12 justify-content-between'
                requiredMark={false}
                onFinish={onAddGraduationCourse}
            >
                <Form.Item
                    name="course-code"
                    className='col-4'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a course'
                        }
                    ]}
                >
                    <Select placeholder='Select Course'>
                        {Object.keys(courses).map(courseCode => (
                            <Option key={courseCode} value={courseCode}>
                                {courseCode}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="grade"
                    className='col-2'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter course grade'
                        }
                    ]}
                >
                    <Select placeholder="Enter grade">
                        <Option value='A+'>A+</Option>
                        <Option value='A'>A</Option>
                        <Option value='A-'>A-</Option>
                        <Option value='B+'>B+</Option>
                        <Option value='B'>B</Option>
                        <Option value='B-'>B-</Option>
                        <Option value='C+'>C+</Option>
                        <Option value='C'>C</Option>
                        <Option value='C-'>C-</Option>
                        <Option value='D+'>D+</Option>
                        <Option value='D'>D</Option>
                        <Option value='F'>F</Option>
                        <Option value='PP'>PP</Option>
                        <Option value='NA'>Unknown</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="term"
                    className='col-2'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a term'
                        }
                    ]}
                >
                    <Select placeholder='Choose semester'>
                        <Option value='Fall'>Fall</Option>
                        <Option value='Spring'>Spring</Option>
                        <Option value='Summer'>Summer</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='year'
                    className='col-2'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter year'
                        }
                    ]}
                >
                    <Input placeholder='Enter year' />
                </Form.Item>
                <Button type='primary' htmlType='submit'>
                    Add
                </Button>
            </Form>
        </div>
    )
}

export default AddGraduationCourse;
