import React from 'react'
import { Button, ConfigProvider } from 'antd';

// Import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faLightbulb } from '@fortawesome/free-regular-svg-icons';

import '../../styles/views/LandingContent/LandingPage.css'

const LandingPage = () => {
  return (
    <div>
      <div class="hero-img">
      <div className="dark">
        <div class="hero-text">
          <h1>Welcom To ACU</h1>
          <p>Faculty Of Engineering</p>
          <a href="#" class="hero-btn">About Us</a>
        </div>
        </div>
      </div>

      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-6 mb-4 d-flex flex-column justify-content-center'>
            <p className='badge'>About Us</p>
            <h1 className='mt-0'>Welcome to Facualty of Engineering - ACU</h1>
            <p className='standard-paragraph'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam autem nemo unde eum minus enim doloremque, perspiciatis ex, culpa facilis tempore nulla error odit repellat a perferendis deleniti commodi fuga.</p>
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: '#D50B1B',
                  colorPrimaryHover: '#ffffff',
                  colorPrimaryActive: '#ffffff'
                },
                components: {
                  Button: {
                    colorText: '#ffffff',
                    borderRadius: 4
                  }
                },
              }}
            >
              <Button className='btn nav-btn mt-2'>Read more</Button>
            </ConfigProvider>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='info-box'>
              <div className='info-box-icon'>
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
              <h2>Mission</h2>
              <p className='standard-paragraph'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ipsam totam quia quisquam sapiente nostrum vitae! Eos illum eius molestiae, dignissimos dolore optio deserunt ut alias nulla dolor, quaerat facilis.
              </p>
            </div>
            <div className='info-box'>
              <div className='info-box-icon'>
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h2 className='my-3'>Vision</h2>
              <p className='standard-paragraph mb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo repellat tenetur at sit qui illo quidem magni sunt ullam non sint eum debitis cupiditate ipsa, quod quibusdam expedita temporibus earum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage