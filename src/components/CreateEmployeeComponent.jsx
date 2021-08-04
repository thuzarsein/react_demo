import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {

    constructor(props){

        super(props)

        this.state = {
            //Step 2 (Use Single component for Create&Update Components)
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        //Constructor
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    //Step 3(Use Single component for Create&Update Components)
     //ServiceMethod
    componentDidMount(){
        //Step 4(Use Single component for Create&Update Components)
        // if(this.state.id == -1){ //【　-1 => for createEmployee because of the DB already create id autoincrement start form 1】
        //     return
        // }
        if(this.state.id == '_add'){
            return
        }else{
             EmployeeService.getEmployeeById(this.state.id).then( (res) => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId
             });

            });
        }       
    }

//Handler
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            emailId: this.state.emailId
        };
        console.log('employee => ' + JSON.stringify(employee));  
            //STEP 5 (Use Single component for Create&Update Components)    
            if(this.state.id == '_add'){
                //http://localhost:3000/add-employee/-1 => call create Employee Form((this.state.id == -1)
                //FOR CREATE EMPLOYEE METHOD
                 EmployeeService.createEmployee(employee).then(res => {
                            this.props.history.push('/employees');        
                    });
            } else{
                //FOR UPDATE EMPLOYEE METHOD
                EmployeeService.updateEmployee(employee, this.state.id).then(res =>{
                    this.props.history.push('/employees');
                });
            }
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if(this.state.id == '_add' ){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() {
        return(
            <div>
                <div className="container pt-4">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 ">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name : </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                         value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name : </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                        value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Id : </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                        value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent;