import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Radio, Button } from 'antd';
import AddGraduationCourse from '../student/AddGraduationCourse';
import { useAuth } from '../../../authContext/AuthProvider';

const GraduationReport = (props) => {
    const [value, setValue] = useState(1);
    const [studentData, setStudentData] = useState();
    const [gradReports, setGradReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();
    const { id } = useParams();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const userToken = localStorage.getItem('token');
                let apiUrl = "https://acu-eng.onrender.com/api/v1/student/profile";
                if (role === 'Admin') {
                    apiUrl = `https://acu-eng.onrender.com/api/v1/admin/student/${id}`;
                }
                const response = await axios.get(apiUrl, {
                    headers: { Authorization: userToken }
                });
                setStudentData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStudentData();
    }, [id, role]);
    console.log('cur st ',studentData);
    useEffect(() => {
        const fetchGradReport = async () => {
            if (!studentData) return;
            try {
                const userToken = localStorage.getItem('token');
                let apiUrl = "https://acu-eng.onrender.com/api/v1/student/graduation-reports";
                if (role === 'Admin') {
                    apiUrl = "https://acu-eng.onrender.com/api/v1/Admin/graduation-reports/667cbe9f4a35c759149f586b";
                }
                const response = await axios.get(apiUrl, {
                    headers: { Authorization: userToken }
                });
                const report = response.data.graduationReport;
                const formattedData = formatGradReport(report);
                setGradReports(formattedData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchGradReport();
    }, [studentData, role, id]);

    const formatGradReport = (report) => {
        let formattedData = [];
        Object.keys(report).forEach(year => {
            Object.keys(report[year]).forEach(semester => {
                if (report[year][semester].length > 0) {
                    formattedData.push({
                        isHeader: true,
                        year,
                        semester
                    });
                    report[year][semester].forEach(course => {
                        if (course.courseCode && course.courseTitle && course.creditHours) {
                            formattedData.push(course);
                        }
                    });
                }
            });
        });
        return formattedData;
    };

    const getRandomGrade = () => {
        const grades = ['A', 'A+', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
        return grades[Math.floor(Math.random() * grades.length)];
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const userToken = localStorage.getItem('token');
                await axios.post('https://acu-eng.onrender.com/api/v1/Admin/delete-graduation-reports/studentId', {
                    classId: courseId
                }, {
                    headers: { Authorization: userToken }
                });
                setGradReports(gradReports.filter(course => course._id !== courseId));
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (loading) {
        return <Spin />;
    }

    return (
        <div className='profile-card container p-4'>
            {role === 'Admin' && <>
                <Radio.Group className='mb-4' onChange={onChange} value={value}>
                    <Radio value={1}>Edit Course Grade</Radio>
                    <Radio value={2}>Transfer Student Course</Radio>
                </Radio.Group>
                {value === 1 &&
                <div className='add-course mb-4'>
                <AddGraduationCourse />
            </div>
                }
                {value === 2 &&
                    <div className='add-course mb-4'>
                        <AddGraduationCourse />
                    </div>
                }
            </>}    
            <div className='d-flex justify-content-around flex-wrap'>
                <h6 className='student-data'>ID: {studentData?.roleDocument?.studentId}</h6>
                <h6 className='student-data'>{studentData?.fullName}</h6>
                <h6 className='student-data'>GPA: {studentData?.roleDocument?.gpa}</h6>
                <h6 className='student-data'>Total Credits: {studentData?.roleDocument?.totalCredits}</h6>
            </div>

            <table className='grad-report-table' border="1" cellSpacing="0" cellPadding="5">
                <thead>
                    <tr style={{ backgroundColor: '#ddd', fontWeight: 'bold' }}>
                        <th>Course No</th>
                        <th>Course Title</th>
                        <th>Grade</th>
                        <th>Hours</th>
                        <th>Quality Points</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gradReports.map((item, index) => (
                        item.isHeader ? (
                            <tr key={`${item.year}-${item.semester}`} style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                                <td style={{ textAlign: 'center' }} colSpan="6">{`${item.semester}-${item.year}`}</td>
                            </tr>
                        ) : (
                            <tr key={item._id} className='course-row'>
                                <td>{item.courseCode}</td>
                                <td>{item.courseTitle}</td>
                                <td>{getRandomGrade()}</td>
                                <td>{item.creditHours}</td>
                                <td>N/A</td>
                                <td>
                                    <Button
                                        type='primary' danger
                                        className='delete-button'
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GraduationReport;
