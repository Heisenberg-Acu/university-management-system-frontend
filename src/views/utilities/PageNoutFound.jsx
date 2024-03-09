import React from 'react'
import '../../styles/views/utilities/PageNoutFound.css'
const PageNoutFound = () => {
  return (
    <section className="not-found-page">
      <div className="container">
        <div className="not-found-page-data">
          <h1>404</h1>
          <p>Page Not Found</p>
          <a href='/admin/dashboard' className='mt-4 btn'>Go Home</a>
        </div>
      </div>
    </section>
  )
}

export default PageNoutFound