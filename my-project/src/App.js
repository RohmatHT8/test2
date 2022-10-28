import './App.css';
import LoginPages from './pages/LoginPages';
import { Routes, Route } from 'react-router-dom'
import HomePages from './pages/HomePages';
import CompanyPages from './pages/CompanyPages'
import AddCompany from './component/Company/AddCompany'
import ProtectedLogin from './component/ProtectedLogin';
import ProtectedRoute from './component/ProtectedRoute';
import EmployeePages from './pages/EmployeePages';
import AddEmployee from './component/Employee/AddEmployee';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={
          <ProtectedLogin>
            <LoginPages />
          </ProtectedLogin>
        } />
        <Route path='/' element={
          <ProtectedRoute>
            <HomePages />
          </ProtectedRoute>
        }>
          <Route path='/' element={<CompanyPages />} />
          <Route path='/addCompany' element={<AddCompany />} />
          <Route path='/employee' element={<EmployeePages />}/>
          <Route path='/addEmployee' element={<AddEmployee/>} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
