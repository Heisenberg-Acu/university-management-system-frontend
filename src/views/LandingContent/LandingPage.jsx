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
            <a href="/about-us" class="hero-btn">About Us</a>
          </div>
        </div>
      </div>

      <section className='container py-5'>
        <h2 className='section-title mb-4'>About Us</h2>
        <div className='row flex-md-row flex-column-reverse justify-content-between'>
          <div className='col-md-6 mb-4 d-flex flex-column justify-content-center'>
            <p className='badge'>About Us</p>
            <h1 style={{ fontWeight: 600 }} className='mt-0'>Welcome to Facualty of Engineering - ACU</h1>
            <p className='standard-paragraph my-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam autem nemo unde eum minus enim doloremque, perspiciatis ex, culpa facilis tempore nulla error odit repellat a perferendis deleniti commodi fuga.</p>
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
          <div className='col-md-5 mb-4'>
            <img src="https://placehold.co/400" alt="" style={{ width: '100%' }} />
          </div>
        </div>
        <div className='row gap-4 align-items-stretch'>
          <div className='col-md-6'>
            <div className='info-box'>
              <div className='info-box-icon'>
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
              <h2 className='mt-4 mb-3'>Mission</h2>
              <p className='standard-paragraph'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ipsam totam quia quisquam sapiente nostrum vitae! Eos illum eius molestiae, dignissimos dolore optio deserunt ut alias nulla dolor, quaerat facilis.
              </p>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='info-box'>
              <div className='info-box-icon'>
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h2 className='mt-4 mb-3'>Vision</h2>
              <p className='standard-paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ipsam totam quia quisquam sapiente nostrum vitae! Eos illum eius molestiae, dignissimos dolore optio deserunt ut alias nulla dolor, quaerat facilis.  </p>

            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'white' }} className='container-fluid py-5'>
        <h2 className='section-title'>Departments</h2>
        <div className='container'>
          <div className='row g-4 my-4'>
            <div className='col-md-6'>
              <div className='department electrical-department'>
                <a className='department-link' href="/departments/electrical-department">Electrical Engineering
                  <br />
                  <span className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </a>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='department mechanical-department'>
                <a className='department-link' href="/departments/mechanical-department">Mechanical Engineering
                  <br />
                  <span className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </a>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='department architecture-department'>
                <a className='department-link' href="/departments/architecture-department">Architecture Engineering
                  <br />
                  <span className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </a>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='department civil-department'>
                <a className='department-link' href="/departments/civil-department">Civil Engineering
                  <br />
                  <span className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </a>  
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage