import React, { useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux';
// import { Link } from 'react-router-dom';
// import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';
import './Login.css'; // Optional styling
import { login } from '../../redux/apiCalls';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const { isFetching, error} = useSelector((state)=> state.user);

  // console.log(user);



  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, {email: emailRef.current.value, password: passwordRef.current.value});
    
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            ref={emailRef}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            ref={passwordRef}
            required
          />
        </div>
          <button type="submit" disabled={isFetching}>
            {isFetching ? 'Logging in...' : 'Login'}
          </button>
      </form>
      {error && <p className="error">Login failed. Please try again.</p>}
    </div>
  );
};

export default Login;
