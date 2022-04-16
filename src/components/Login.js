import React,{useState} from 'react'
import { useHistory, Link } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"", password:""})
    let history = useHistory();

    const LoginClick = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        // console.log(json)
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authtoken)
            history.push("/")
            props.showAlert("Logged in successfully", 'success')
        }
        else {
            props.showAlert("Invalid credentials", 'success')
        }
    }

    const onchange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="center">
        <h1>Login</h1>
        <form method="post" onSubmit={LoginClick}>
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
            <input type="submit" value="Login"/>
            <div className="signup_link">
            Not a member? <Link to="/signup">Signup</Link>
            </div>
        </form>
        </div>
    )
}

export default Login