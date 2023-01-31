import { Link } from "react-router-dom"
import Table from "very-simple-table-lib/dist/components/Table"
import employeeList from '../data/employeeList.json'

function EmployeeList(prop){
    
    return <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <Table data={employeeList.employees} tableKeys={{firstName:"First Name", lastName:"Last Name", startDate:"Start Date", department:"Department", birthDate:"Date of birth",  street:"Street", city:"City", state:"State", zipCode:"Zip"}}/>
        <Link to='/'>Home</Link>       
    </div>
}

export default EmployeeList