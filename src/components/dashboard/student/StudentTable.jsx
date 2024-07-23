import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd'
import ScheduleTable from '../common/ScheduleTable';
import {useAuth} from '../../../authContext/AuthProvider'
import { useParams } from 'react-router-dom';
const StudentTable = (props) => {
  const {role} = useAuth();
  const [StudentTableData, setStudentTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "https://acu-eng.onrender.com/api/v1/student/semester-registration-table";
        const userToken = localStorage.getItem('token');
        if (role === 'Admin') {
          const adminResponse = await axios.get(`https://acu-eng.onrender.com/api/v1/admin/student/${id}`, {
            headers: {
              Authorization: userToken,
            },
          });

          const adminData = adminResponse.data;
          const studentTableId = adminData.roleDocument._id;
          apiUrl = `https://acu-eng.onrender.com/api/v1/admin/semester-registration-table/${studentTableId}`;
        }
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: userToken,
          },
        });
        console.log(response.data)
        const semesterRegistrationTable = response.data.semesterRegistrationTable.map( item => 
          item.classId
        );
        setStudentTableData(semesterRegistrationTable);
        console.log('table: ', semesterRegistrationTable);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='profile-card container p-4 d-flex justify-content-center'>
      <Spin />
    </div>;
  }
  console.log(StudentTableData)
  return (
    <div className='profile-card container p-4'>
        <ScheduleTable tableData={StudentTableData} tableName="Semester Table" viewDownloadButton={true} />
    </div>
  );
};

export default StudentTable;
