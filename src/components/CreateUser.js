import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser(){

    const navigate = useNavigate();

    const [input, setInputs] = useState({});

    const handeChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('http://localhost:8080/api/user/save', input).then(function(response){
            console.log(response.data);
            navigate('/');
        });

        
    }

    return(
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name" onChange={handeChange}/>
                <br/>
                <label>Email: </label>
                <input type="text" name="email" onChange={handeChange}/>
                <br/>
                <label>Mobile: </label>
                <input type="text" name="mobile" onChange={handeChange}/>
                <br/>
                <button>Save</button>
            </form>
        </div>
    )
}