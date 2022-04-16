import React, {useState} from 'react'
import { useHistory, Link } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setcredentials] = useState({name:"", email:"", password:""})
    let history = useHistory();

    const LoginClick = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authtoken)
            history.push("/")
            props.showAlert("Account created successfully", 'success')
        }
        else {
            props.showAlert("Invalid credentials", 'danger')
        }
    }

    const onchange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
        <div className="center">
        <h1>Sign Up</h1>
        <form method="post" onSubmit={LoginClick}>
            <div className="txt_field">
            <input type="text" id='name' name='name' required value={credentials.name} onChange={onchange}/>
            <span></span>
            <label>name</label>
            </div>
            <div className="txt_field">
            <input type="email" id='email' name='email' required value={credentials.email} onChange={onchange}/>
            <span></span>
            <label>Email</label>
            </div>
            <div className="txt_field">
            <input type="password" id='password' name='password' required value={credentials.password} onChange={onchange}/>
            <span></span>
            <label>Password</label>
            </div>
            <div className="pass">Forgot Password?</div>
            <input type="submit" value="Sign In"/>
            <div className="signup_link">
            Already a member? <Link to="/login">Sign In</Link>
            </div>
        </form>
        </div>
        </div>
    )
}

export default SignUp