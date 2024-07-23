import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Switch, Spin, Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../../authContext/AuthProvider';
import axios from 'axios';
import '../../../../styles/views/Dashboard/ProfileStyle.css';
const { Option } = Select;

const Profile = (props) => {
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { role } = useAuth();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const api = props.profileApi;
    axios.get(api, {
      headers: { Authorization: userToken }
    })
      .then(response => {
        console.log(response);
        const formattedStudent = {
          fullName: response.data.fullName,
          email: response.data.email,
          nationality: response.data.nationality,
          department: response.data.roleDocument.department,
          specialization: response.data.specialist,
          phoneNumber: response.data.phoneNumber,
          role: response.data.role,
          allowedRegistrationHours: response.data.roleDocument.allowedRegistrationHours,
          registration: response.data.roleDocument.registration
        };
        console.log(formattedStudent)
        setProfileData(formattedStudent);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!profileData) {
    return <Spin />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalOk = async (formData) => {
    try {
      const apiData = {
        fullName: formData['name'],
        nationality: formData['nationality'],
        email: formData['email'],
        password: formData['password'],
        phoneNumber: formData['phone'],
        department: formData['department'],
        level: formData['level'],
        dateOfBirth: formData['birthDate'],
        specialization: formData['specialization'],
        allowedRegistrationHours: formData['allowed-registration-hours'],
        registration: formData['registration'] === true ? true : false,
        trainingHours: formData['training-hours'],
      };
      const userToken = localStorage.getItem("token");
      const api = props.profileApi;
      const response = await axios.patch(api, apiData, {
        headers: {
          Authorization: userToken,
        },
      });
      console.log(response.data);
      message.success('Student updated successfully');
      console.log('Student updated successfully');
      setIsModalOpen(false);
      setProfileData(apiData)
    } catch (error) {
      console.error(error);
      message.error('Something went wrong');
    }
  };

  return (
    <div className='container profile-card p-4'>
      <h3 className='mb-5'>Profile information</h3>
      {role === 'Admin' &&
        <div className='d-flex justify-content-end mb-2'>
          <EditOutlined className='edit-icon' onClick={showModal} />
        </div>
      }
      <Modal title="Edit Profile Data" visible={isModalOpen} onCancel={handleModalCancel} footer={null}>
        <EditForm profileData={profileData} onEdit={handleModalOk} />
      </Modal>
      <ul className='profile-details-list'>
        {profileData.fullName && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Full Name:</p> <p className='profile-details-item__value'>{profileData.fullName}</p>
          </li>
        )}
        {profileData.email && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Email:</p> <p className='profile-details-item__value'>{profileData.email}</p>
          </li>
        )}
        {profileData.nationality && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Nationality:</p> <p className='profile-details-item__value'>{profileData.nationality}</p>
          </li>
        )}
        {profileData.department && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Department:</p> <p className='profile-details-item__value'>{profileData.department}</p>
          </li>
        )}
        {profileData.specialization && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Specialization:</p> <p className='profile-details-item__value'>{profileData.specialization}</p>
          </li>
        )}
        {profileData.allowedRegistrationHours && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Allowed registration hours:</p> <p className='profile-details-item__value'>{profileData.allowedRegistrationHours}</p>
          </li>
        )}
        {profileData.phoneNumber && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Phone Number:</p> <p className='profile-details-item__value'>{profileData.phoneNumber}</p>
          </li>
        )}
        {profileData.registration !== undefined && (
          <li className='profile-details-item'>
            <p className='profile-details-item__name col-xl-4'>Registration:</p>
            <p className='profile-details-item__value'>
              <Switch checked={profileData.registration} />
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

const EditForm = ({ profileData, onEdit }) => {
  const onFinish = (formData) => {
    onEdit(formData);
  };

  return (
    <div>
      <Form
        className='row'
        requiredMark={false}
        labelCol={{
          span: 24,
        }}
        onFinish={onFinish}
      >
        {profileData.fullName && (
          <Form.Item
            label="Full Name"
            name="name"
            initialValue={profileData.fullName}
            rules={[
              {
                required: true,
                message: 'Please enter full name',
              },
            ]}
          >
            <Input placeholder="Enter Full Name" />
          </Form.Item>
        )}
        {profileData.nationality && (
          <Form.Item
            label="Nationality"
            name="nationality"
            initialValue={profileData.nationality}
            rules={[
              {
                required: true,
                message: 'Please enter nationality',
              },
            ]}
          >
            <Select placeholder="Select Nationality">
              <Option value="egyptian">Egyptian</Option>
              <Option value="foreign">Foreign</Option>
            </Select>
          </Form.Item>
        )}
        {profileData.email && (
          <Form.Item
            label="Email"
            name="email"
            initialValue={profileData.email}
            rules={[
              {
                required: true,
                message: 'Please enter email',
              },
            ]}
          >
            <Input placeholder='Enter Email' />
          </Form.Item>
        )}
        {profileData.phoneNumber && (
          <Form.Item
            label="Phone number"
            name="phone"
            initialValue={profileData.phoneNumber}
          >
            <Input placeholder='Enter Phone number' />
          </Form.Item>
        )}
        {profileData.department && (
          <Form.Item
            label="Department"
            name="department"
            initialValue={profileData.department}
            rules={[
              {
                required: true,
                message: 'Please enter department',
              },
            ]}
          >
            <Select placeholder="Select Department">
              <Option value='General'>General</Option>
              <Option value='Electrical'>Electrical Engineering</Option>
              <Option value='Architectural'>Architectural Engineering</Option>
              <Option value='Civil'>Civil Engineering</Option>
              <Option value='Mechanical'>Mechanical Engineering</Option>
            </Select>
          </Form.Item>
        )}
        {profileData.specialization && (
          <Form.Item
            label="Specialization"
            name="specialization"
            initialValue={profileData.specialization}
            rules={[
              {
                required: true,
                message: 'Please enter specialization',
              },
            ]}
          >
            <Select placeholder="Select specialization">
              <Option value='computer'>Computer</Option>
            </Select>
          </Form.Item>
        )}
        {profileData.allowedRegistrationHours && (
          <Form.Item
            label="Allowed Registration Hours"
            name="allowed-registration-hours"
            initialValue={profileData.allowedRegistrationHours}
            rules={[
              {
                required: true,
                message: 'Please enter Allowed Registration Hours',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {profileData.registration !== undefined && (
          <Form.Item className='col-md-6' label="Student Registration" name="registration">
            <Switch defaultChecked={profileData.registration} />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Profile;
