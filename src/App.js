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
const StudentProfile = React.lazy(() => import('./views/Dashboard/AdminDashboard/Students/StudentProfile'))
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
const Exams = React.lazy(() => import('./views/Dashboard/AdminDashboard/Exams/GenerateExamSchedule'));

//Student
const StudentView = React.lazy(() => import('./views/Dashboard/StudentDashboard/Student'));

//Lecturer
const LecturerPrfoile = React.lazy(() => import('./views/Dashboard/LecturerDashboard/Lecturer'));

const AssistantLecturerPrfoile = React.lazy(() => import('./views/Dashboard/AssistantLecturer/AssistantLecturer'));

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path="*" element={<LandingRoutes />} />
          <Route path='/admin/*' element={<AdminDashbaord />} />
          <Route path='/student/*' element={<StudentDashboard />} />
          <Route path='/lecturer/*' element={<LecturerDashboard />} />
          <Route path='/assistantlecturer/*' element={<AssistantLecturerDashboard />} />
          <Route path='/not-authorized' element={<NotAuthorized />} />
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
  const { role, loading, isLogged } = useAuth();
  if (!loading && role !== 'Admin' && isLogged) {
    window.location.href = '/not-authorized';
    console.log(role)
  }
  else if (!loading && !isLogged) {
    window.location.href = '/login';
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <AdminNavbar />
      <Routes>
        <Route path='/dashboard' element={<DashbaordPage />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/students/add-student" element={<AddStudent />} />
        <Route path="/students/edit-student/:id" element={<EditStudent />} />
        <Route path="/students/profile/:id" element={<StudentProfile />} />
        <Route path="/lecturers" element={<AllLecturers />} />
        <Route path="/lecturers/profile/:id" element={<StudentProfile />} />
        <Route path="/lecturers/add-lecturer" element={<AddLecturer />} />
        <Route path="/assistant-lecturers" element={<AllAssistantLecturers />} />
        <Route path="/assistant-lecturers/add-assistant-lecturer" element={<AddAssistantLecturer />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/courses/add-course" element={<AddCourse />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/rooms/add-room" element={<AddRoom />} />
        <Route path="/classes" element={<AllClasses />} />
        <Route path="/classes/add-class" element={<AddClass />} />
        <Route path="/exams" element={<Exams />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const StudentDashboard = () => {
  const { role, loading, isLogged } = useAuth();
  if (!loading && role !== 'Student' && isLogged) {
    window.location.href = '/not-authorized';
    console.log(role)
  }
  else if (!loading && !isLogged) {
    window.location.href = '/login';
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<StudentProfile />} />
      </Routes>
    </Layout>
  );
}

const LecturerDashboard = () => {
  const { role, loading, isLogged } = useAuth();
  if (!loading && role !== 'Lecturer' && isLogged) {
    window.location.href = '/not-authorized';
    console.log(role)
  }
  else if (!loading && !isLogged) {
    window.location.href = '/login';
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<LecturerPrfoile />} />
      </Routes>
    </Layout>
  );
}

const AssistantLecturerDashboard =  () => {
  const { role, loading, isLogged } = useAuth();
  if (!loading && role !== 'AssistantLecturer' && isLogged) {
    window.location.href = '/not-authorized';
    console.log(role)
  }
  else if (!loading && !isLogged) {
    window.location.href = '/login';
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<AssistantLecturerPrfoile />} />
      </Routes>
    </Layout>
  );
}
export default App;
