import React, { useState } from 'react';

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (email && newPassword) {

      localStorage.setItem('newPassword', newPassword);

      setMessage('Password changed successfully!');
    } else {
      setMessage('Failed to change password. Please try again.');
    }
  };
  
  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br></br>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        /><br></br>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;
