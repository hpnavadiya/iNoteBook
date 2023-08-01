import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const host = "http://localhost:5000";

    // State
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // We need to some something on server as body of email and password
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save auth token into local storage and redirect it
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Successfully Login", "success");
            history.push("/");

        } else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="mt-3">
            <h1 className="my-2">Login to continue to iNoteBook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
