import React from 'react'
import '../../styles/views/utilities/NotAuthorized.css';

const NotAuthorized = () => {
    return (
        <section className="not-authorized-page container">
      <div className="mt-5">
        <div className="not-authorized-page-data">
          <h1>OOPS</h1>
          <p>You're not authorized to access this page</p>
          <a className='mt-2' href='/NotAuthorized'>Go Home</a>
        </div>
      </div>
    </section>
    )
}

export default NotAuthorized