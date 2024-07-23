import React from 'react'
import '../../../styles/views/Dashboard/ProfileStyle.css';
import { Collapse,Checkbox } from 'antd';

const RegistrationCard = ({courseData}) => {
  return (
    <div className='registeration-card'>
        <Collapse 
          items={[{
            key:'1',
            label:(<h6 className='course-title'>{courseData.courseTitle}</h6>),
            children:(
              <div className=''>
                  <div className='lecture-time mb-3'>
                    <p>Lecture time:</p>
                    <Checkbox>9: 00 to 10:50 - {courseData.day}</Checkbox>
                  </div>
                  <div className='section-time'>
                    <p>Section time:</p>
                    <Checkbox>9: 00 to 10:50</Checkbox>
                  </div>
              </div>
            )
          }]}
        ></Collapse>
    </div>
  )
}

export default RegistrationCard