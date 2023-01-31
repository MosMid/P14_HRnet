import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home'
import EmployeeList from './pages/EmployeeList'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import employeeList from './data/employeeList.json'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list' element={<EmployeeList data={employeeList.employees} tableKeys={{firstName:"First Name", lastName:"Last Name", startDate:"Start Date", department:"Department", birthDate:"Date of birth",  street:"Street", city:"City", state:"State", zipCode:"Zip"}}/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

//json-server --watch employeeList.json --port 3002