import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

  const host = "http://localhost:5000";

  // State
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Take out this all field from the credentials
    const { name, email, password } = credentials;

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }) // We need to send something on server as body of email and password
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save auth token into local storage and redirect it
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Your Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-2">
      <h1 className="my-2">Create an account to use iNoteBook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
