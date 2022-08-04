import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsername(usernameRef.current.value);
    setPassword(passwordRef.current.value);
    try {
      await axios.post("auth/register", { username, email, password });
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/login" className="link">
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleSubmit}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
