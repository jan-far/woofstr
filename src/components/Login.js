import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../firebase';
import BackgroundImage from '../bg02.jpg';

export default function Login() {
  function login() {
    auth.signInWithRedirect(provider);
  }

  return (
    <div className="app">
      <div
        className="login"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: 'center',
        }}
      >
        <div className="login__container">
          <img src="../login-logo.png" alt="Logo" />
          <div>
            <h3>Chat with Dog Owners near You</h3>
          </div>
          <Button onClick={login}>Sign in with Google</Button>
        </div>
      </div>
    </div>
  );
}
