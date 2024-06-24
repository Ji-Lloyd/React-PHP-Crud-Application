import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser(){

    const navigate = useNavigate();

    const [input, setInputs] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        getUsers();
    },[]);

    function getUsers(){
        axios.get(`http://localhost:8080/api/user/${id}`).then(function(response){
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handeChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8080/api/user/${id}/edit`, input).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }

    return(
        <div>
            <h1>Edit User Info</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input value={input.name} type="text" name="name" onChange={handeChange} />
                <br/>
                <label>Email: </label>
                <input value={input.email} type="text" name="email" onChange={handeChange}/>
                <br/>
                <label>Mobile: </label>
                <input value={input.mobile} type="text" name="mobile" onChange={handeChange}/>
                <br/>
                <button>Save</button>
            </form>
        </div>
    )
}