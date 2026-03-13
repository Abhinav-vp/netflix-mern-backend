import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    };

    try {
      const res = await axios.post(
        "/api/auth/login",
        data
      );

      console.log(res.data);
      const token=res.data.token;
      localStorage.setItem("token", res.data.token);

    const pendingMovie = localStorage.getItem("pendingMovie");

    if (pendingMovie) {
      await axios.post(
        "/api/watchlist",
        { movieId: pendingMovie },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      localStorage.removeItem("pendingMovie");
    }

      alert("Login successful");
      navigate("/");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
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
              placeholder="Password"
              className="auth-form__input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-form__btn">Sign In</button>
          <div className="auth-form__footer">
            <p>New to Netflix? <a href="/register">Sign up now.</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;