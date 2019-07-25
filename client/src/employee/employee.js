import React, {Component} from 'react';
import axios from 'axios';

class Employee extends Component {
    constructor() {
        super();
        this.state = {
            employees: []
        }
    }

   

    async componentDidMount() {
        try{
            const res = await axios.get('/employees')
            this.setState({
                employees: res.data,
            });
        }   catch (error) {
            console.error(error);
        }
    }

 //Put methods here
    render(){
        return(
            <div>
            <ul>
            {this.state.employees.map(el =>{
                return <li key={el.Name}>Name: {el.Name}</li>
            })}
            </ul>
            </div>
        )
    }
}

export default Employee;