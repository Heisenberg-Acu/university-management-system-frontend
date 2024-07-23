import React, { useEffect, useState } from 'react';
import {Spin} from 'antd'
import axios from 'axios';

import ScheduleTable from '../common/ScheduleTable';

const AssistantLecturerClassList = () => {
  const [assistantLecturerTable, setAssistantLecturerTable] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClassesList = async () => {
      try {
        const userToken = localStorage.getItem('token');
        const response = await axios.get('https://acu-eng.onrender.com/api/v1/AssistantLecturer/my-classes', {
          headers: {
            Authorization: userToken
          }
        });
        console.log("List ", response.data.classes);
        const semesterRegistrationTable =response.data.classes.filter(item => item.type === 'Tutorial');

        setLoading(false);
        setAssistantLecturerTable(semesterRegistrationTable);
        console.log(assistantLecturerTable);
      }
      catch (error) {
        setLoading(false);

      }
    }
    fetchClassesList();
  }, []);
  if(loading){
    return (<Spin></Spin>)
  }
  return (
    <section className='profile-card container p-4'>
        <ScheduleTable tableData={assistantLecturerTable} tableName="Semester Table" viewDownloadButton={true}/>
    </section>
  )
}

export default AssistantLecturerClassList