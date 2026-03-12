import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    };

    try {
      await axios.post(
        "/api/auth/register",
        data
      );

      alert("User Registered");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleRegister}>
          <div className="auth-form__group">
            <input
              type="email"
              placeholder="Email address"
              className="auth-form__input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-form__group">
            <input
              type="password"
              placeholder="Create a password"
              className="auth-form__input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-form__btn">Sign Up</button>
          <div className="auth-form__footer">
            <p>Already have an account? <a href="/login">Sign in now.</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;