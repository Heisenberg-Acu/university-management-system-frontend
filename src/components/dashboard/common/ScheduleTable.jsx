import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';

const tableColumns = [
  {
    title: 'Day / Time',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: '9:00 - 10:50',
    dataIndex: 'firstSlot',
    key: 'firstSlot',
  },
  {
    title: '11:00 - 12:50',
    dataIndex: 'secondSlot',
    key: 'secondSlot',
  },
  {
    title: '1:00 - 2:50',
    dataIndex: 'thirdSlot',
    key: 'thirdSlot',
  },
];

const ScheduleTable = (props) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const formatTableData = (data) => {
      if (!Array.isArray(data)) {
        return [];
      }
  
      const dayOrder = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
      const dayMap = {};
  
      dayOrder.forEach((day) => {
        dayMap[day] = {
          key: day,
          day: day,
          firstSlot: null,
          secondSlot: null,
          thirdSlot: null,
        };
      });

      data.forEach((item) => {
        if(item !== undefined) {
          const { day, time, type, courseId, classroomId } = item;
        const courseInfo = (
          <div className='antd-cell-active'>
            <p>
              {type}<br />
              {courseId.courseCode} - {courseId.courseTitle}<br />
              {classroomId.classroomName}
            </p>
          </div>
        );
  
        if (time === '9:00 To 10:50') {
          dayMap[day].firstSlot = courseInfo;
        } else if (time === '11:00 To 12:50') {
          dayMap[day].secondSlot = courseInfo;
        } else if (time === '1:00 To 2:50') {
          dayMap[day].thirdSlot = courseInfo;
        }
        }
        
      });
  
      return Object.values(dayMap).filter((day) => day.firstSlot || day.secondSlot || day.thirdSlot);
    };
  
    const formattedData = formatTableData(props.tableData);
    setTableData(formattedData);
  }, [props.tableData]);

  const captureTable = () => {
    const table = document.getElementById('my-table');
    html2canvas(table, { scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'table.png';
      link.click();
    }).catch((err) => {
      console.error('Error capturing table:', err);
    });
  };

  return (
    <div className='profile-card'>
      <div className='d-flex justify-content-between'>
        <h3>{props.tableName}</h3>
        {props.viewDownloadButton === true && <Button onClick={captureTable} type='primary'><DownloadOutlined /></Button>}
      </div>
      <div className='container-fluid p-0 my-4' id='my-table'>
        <Table columns={tableColumns} dataSource={tableData} pagination={false} bordered />
      </div>
    </div>
  );
};

export default ScheduleTable;
