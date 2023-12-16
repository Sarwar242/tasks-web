import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { RootState } from "../../store";
import { SignInModel } from "../../models/authModels";
import { signInService } from "../../httpService/userService";


interface SignInProps {
  afterSignIn?: any;
  targetRoute?: string;
}

export const SignIn: React.FC= () => {

  const dispatch = useDispatch();


  const goToPrivacyPolicy = () => {
    document.body.classList.remove('noScroll');
    dispatch({ type: "CLOSE-SIGN-IN" });
  }
  const openSignUp = () => {
    dispatch({ type: "CLOSE-SIGN-IN" });
    dispatch({ type: "OPEN-SIGN-UP" });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event);
    setEmailError("")
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event);
    setEmailError("")
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event);
  };

  const navigate = useNavigate();


  const [isSignInButtonLoading, setSignInButtonLoading] = useState(false);

  const handleSignin = (event: any) => {
    document.body.classList.remove('noScroll');
    event.preventDefault()
    const data = new SignInModel();
    data.email = email;
    data.password = password;


    setSignInButtonLoading(true)

    signInService(data)
      .then((res: any) => {

        reactLocalStorage.setObject("User", res.data.user);
        reactLocalStorage.set("Token", res.data.token);
        reactLocalStorage.set("UserId", res.data.user.id);

        setSignInButtonLoading(false)

        setEmail("");
        setPassword("");

          navigate(`/`, {
            replace: true,
          });

        dispatch({ type: "CLOSE-SIGN-UP" });
        dispatch({ type: "CLOSE-SIGN-IN" });
      })
      .catch(() => {
        setEmailError("Wrong Email/Phone or Password");
        setSignInButtonLoading(false)
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign In</h2>
              <form onSubmit={handleSignin}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CustomJwtPayload extends JwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}