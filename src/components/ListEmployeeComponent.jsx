import React, { Component } from 'react';


import EmployeeService from '../services/EmployeeService';


class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees:[]
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees : res.data});
        });
    }

    //DELTE EMPLOYEE REST API
    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res =>{
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    //VIEEW EMPLOYEE Handler
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);//[ `` => backStick]
    }

    //UPDATE EMPOYEE Handler
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    //ADD EMPLOYEE Handler
    addEmployee() {
        // this.props.history.push('/add-employee/-1');//Foute for Create EmployeeForm
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employee Lists</h2>
                <div className="row"> 
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="table-responsive row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th> 
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //GET Employee Array LIST FROM (this.state.employees)
                                this.state.employees.map(
                                    employee => (
                                        <tr key = {employee.id}>
                                            <td>{ employee.firstName }</td>
                                            <td>{ employee.lastName }</td>
                                            <td>{ employee.emailId }</td>
                                            <td>
                                                <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-secondary"> Update </button>
                                                <button onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger ml-3"> Delete </button>
                                                <button onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info ml-3"> View </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent;