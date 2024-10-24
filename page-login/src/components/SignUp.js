import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    return name.length >= 2;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validateName(username)) {
      newErrors.username = 'Name must have at least two letters';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, digit, and special character';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    console.log('Signed up with:', { username, email, password, confirmPassword });

    alert('Sign-up successful and data stored in localStorage!');
  };

  return (
    <div>
      <h2>SignUp Page</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        /><br></br>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br></br>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        /><br></br>
        <button type="submit">Sign Up</button>
      </form>
      {errors.username && <p>{errors.username}</p>}
      {errors.email && <p>{errors.email}</p>}
      {errors.password && <p>{errors.password}</p>}
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      <Link to="/login">Login</Link> <br></br>
      <Link to="/ForgotPass">Forgot Password?</Link>
    </div>
  );
}

export default SignUp;
