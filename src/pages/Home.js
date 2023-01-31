import './Home.css';
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import states from '../data/states.json';
import DatePicker from '../components/DatePIcker'

function Home(){
    const [modal, setModal] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [department, setDepartment] = useState("")

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+(([',. -][A-Za-zÀ-ÖØ-öø-ÿ])?[A-Za-zÀ-ÖØ-öø-ÿ]*)*$/;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    const zipRegex = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [birthDateError, setBirthDateError] = useState(false)
    const [startDateError, setStartDateError] = useState (false)
    const [streetError, setStreetError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [startError, setStateError] = useState(false)
    const [zipCodeError, setZipCodeError] = useState(false)
    const [departmentError, setDepartmentError] = useState(false)
    const [isFormValid, setIsFormValid] = useState()

    function validateForm() {
        if(!nameRegex.test(firstName) || firstName.length < 2) setFirstNameError(true)
        else setFirstNameError(false)
        if(!nameRegex.test(lastName) || lastName.length < 2) setLastNameError(true)
        else setLastNameError(false)
        if(birthDate){
            if(!dateRegex.test(format(birthDate))) setBirthDateError(true)
            else setBirthDateError(false)
        }
        else setBirthDateError(true)
        if(startDate){
            if(!dateRegex.test(format(startDate))) setStartDateError(true)
            else setStartDateError(false)
        }
        else setStartDateError(true)
        if(!nameRegex.test(street) || street.length < 2) setStreetError(true)
        else setStreetError(false)
        if(!nameRegex.test(city) || city.length < 2) setCityError(true)
        else setCityError(false)
        if(state.length === 0) setStateError(true)
        else setStateError(false)
        if(!zipRegex.test(zipCode)) setZipCodeError(true)
        else setZipCodeError(false)
        if(department.length === 0) setDepartmentError(true)
        else setDepartmentError(false)

        if(!nameRegex.test(firstName) || !nameRegex.test(lastName) || !dateRegex.test(format(birthDate)) || !dateRegex.test(format(startDate)) || !nameRegex.test(street) || !nameRegex.test(city) || state.length === 0 || !zipRegex.test(zipCode) || department.length === 0) {
            setIsFormValid(false)
            return false
        }
        else {
            setIsFormValid(true)
            return true
        }
    }

    function format(inputDate) {
        let date, month, year;
      
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();
      
          date = date
              .toString()
              .padStart(2, '0');
      
          month = month
              .toString()
              .padStart(2, '0');
      
        return `${date}/${month}/${year}`;
    }

    function saveEmployee(){
        let employee = {firstName: firstName, lastName: lastName, birthDate: format(birthDate), startDate: format(startDate), street:street, city:city, state:state, zipCode:zipCode, department: department}
            fetch("http://localhost:3002/employees",
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(employee),
            })
    }
    
    const createEmployee= (e) =>{
        e.preventDefault()
        if(validateForm() === true){
            setModal(true)
        }
    }


    return <div className="home">
        <div className="title" style={modal ? {filter: 'blur(2px)'}:{}}>
            <h1>HRnet</h1>
        </div>
        <div className="container" style={modal ? {pointerEvents: 'none', filter: 'blur(2px)'}:{}}>
            <Link to='list'>View Current Employees</Link>
            <h2>Create Employee</h2>
            <form onSubmit={createEmployee} id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" style={firstNameError ? {backgroundColor: '#F08585'}:{}} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" style={lastNameError ? {backgroundColor: '#F08585'}:{}} value={lastName} onChange={(e) => setLastName(e.target.value)}/>

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker style={birthDateError ? {backgroundColor: '#F08585'}:{}} onSelectedDate={(e)=>setBirthDate(e)} minAge={18}/>

                <label htmlFor="start-date">Start Date</label>
                <DatePicker style={startDateError ? {backgroundColor: '#F08585'}:{}} onSelectedDate={(e)=>setStartDate(e)} />

                <fieldset className="address">
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" style={streetError ? {backgroundColor: '#F08585'}:{}} value={street} onChange={(e) => setStreet(e.target.value)}/>

                    <label htmlFor="city">City</label>
                    <input id="city" type="text" style={cityError ? {backgroundColor: '#F08585'}:{}} value={city} onChange={(e) => setCity(e.target.value)}/>

                    <label htmlFor="state">State</label>
                    <select name="state" id="state" style={startError ? {backgroundColor: '#F08585'}:{}} value={state} onChange={(e) => setState(e.target.value)}>
                        {states.map((state) => <option key={state.abbreviation}>{state.name}</option>)}
                    </select>

                    <label htmlFor="zip-code">Zip Code</label>
                    <input id="zip-code" type="number" style={zipCodeError ? {backgroundColor: '#F08585'}:{}} value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                </fieldset>

                <label htmlFor="department">Department</label>
                <select name="department" id="department" style={departmentError ? {backgroundColor: '#F08585'}:{}} value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option></option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>
                {isFormValid === false && <p>Please check your information</p>}
                <button type='submit'>Save</button>
            </form>
        </div>
        {modal === true &&<div><div id='modalBg' onClick={saveEmployee}/> 
            <div id="confirmation" className="modal">
                <div id='closeBtn' onClick={saveEmployee}><span>x</span></div>
                <p>Employee Created!</p>
            </div>
            </div>}
    </div>
}

export default Home