import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import './styles/App.css';
import './styles/bootstrap-grid.css'
import NotFound from './views/utilities/PageNoutFound';
import NotAuthorized from './views/utilities/NotAuthorized';
import { useAuth } from './authContext/AuthProvider';

///components
const Navbar = React.lazy(() => import("./components/common/Navbar"));
const Footer = React.lazy(() => import("./components/common/Footer"));

//Dashboard Components
const AdminNavbar = React.lazy(() => import('./components/dashboard/admin/AdminNavbar'));

//views
const LandingPage = React.lazy(() => import("./views/LandingContent/LandingPage"));
const LoginPage = React.lazy(() => import('./views/LandingContent/LoginPage'));

//Dashboard Views
const DashbaordPage = React.lazy(() => import('./views/Dashboard/Dashbaord'));
const AllStudents = React.lazy(() => import('./views/Dashboard/AdminDashboard/Students/AllStudents'));
const AddStudent = React.lazy(() => import('./views/Dashboard/AdminDashboard/Students/AddStudent'));
const EditStudent = React.lazy(() => import('./views/Dashboard/AdminDashboard/Students/EditStudent'));
const AllLecturers = React.lazy(() => import('./views/Dashboard/AdminDashboard/Lecturers/AllLecturers'));
const AddLecturer = React.lazy(() => import('./views/Dashboard/AdminDashboard/Lecturers/AddLecturer'));
const AllAssistantLecturers = React.lazy(() => import('./views/Dashboard/AdminDashboard/AssistantLecturers/AllAssistantLecturers'));
const AddAssistantLecturer = React.lazy(() => import('./views/Dashboard/AdminDashboard/AssistantLecturers/AddAssistantLecturer'));
const AddCourse = React.lazy(() => import('./views/Dashboard/AdminDashboard/Courses/AddCourse'));
const AllCourses = React.lazy(() => import('./views/Dashboard/AdminDashboard/Courses/AllCourses'));
const AddRoom = React.lazy(() => import('./views/Dashboard/AdminDashboard/Rooms/AddRoom'));
const AllRooms = React.lazy(() => import('./views/Dashboard/AdminDashboard/Rooms/AllRooms'));
const AddClass = React.lazy(() => import('./views/Dashboard/AdminDashboard/Classes/AddClass'));
const AllClasses = React.lazy(() => import('./views/Dashboard/AdminDashboard/Classes/AllClasses'));

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
          <Routes>
            <Route path="*" element={<LandingRoutes />} />
            <Route path='/admin/*' element={<AdminDashbaord />} />
          </Routes>
      </div>

    </BrowserRouter>
  );
}
const LandingRoutes = () => {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Layout>
  );
}
const AdminDashbaord = () => {
  const { role, loading } = useAuth();
  if(!loading && role !== 'Admin' ){
    window.location.href='/login';
    console.log(role)
  }
  return (
      <Layout style={{minHeight:'100vh'}}>
        <Navbar />
        <AdminNavbar />
        <Routes>
          <Route path='/dashboard' element={<DashbaordPage />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/students/add-student" element={<AddStudent />} />
          <Route path="/students/edit-student/:id" element={<EditStudent />} />
          <Route path="/lecturers" element={<AllLecturers />} />
          <Route path="/lecturers/add-lecturer" element={<AddLecturer />} />
          <Route path="/assistant-lecturers" element={<AllAssistantLecturers />} />
          <Route path="/assistant-lecturers/add-assistant-lecturer" element={<AddAssistantLecturer />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/add-course" element={<AddCourse />} />
          <Route path="/rooms" element={<AllRooms/>} />
          <Route path="/rooms/add-room" element={<AddRoom />} />
          <Route path="/classes" element={<AllClasses />} />
          <Route path="/classes/add-class" element={<AddClass />} />
          <Route path='/not-authorized' element={<NotAuthorized />}/>
          <Route path='*' element={<NotFound />} />          
        </Routes>
      </Layout>
  );
}
export default App;
