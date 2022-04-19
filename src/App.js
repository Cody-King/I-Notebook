import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  const togglemode = () => {
    if (mode === "dark") {
      setmode('light');
      document.body.style.backgroundColor = "white"
      document.body.style.color = "black"
      showAlert("Dark mode has been enabled", "success")
    }
    else {
      setmode('dark');
      document.body.style.backgroundColor = "black"
      document.body.style.color = "white"
      showAlert("Light mode has been enabled", "success")
    }
  }

  return (
    <>
    <NoteState>
      <Router>
        <Navbar mode={mode} togglemode={togglemode}/>
        <Alert alert={alert}/>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert}/>
            </Route>
            <Route exact path="/signup">
              <SignUp showAlert={showAlert}/>
            </Route>
            </Switch>
          </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
