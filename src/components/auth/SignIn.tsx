import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { SignInModel } from "../../models/authModels";
import { signInService } from "../../httpService/userService";


export const SignIn: React.FC= () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

  const handleSignin = (event: any) => {
    document.body.classList.remove('noScroll');
    event.preventDefault()
    const data = new SignInModel();
    data.email = email;
    data.password = password;

    signInService(data)
      .then((res: any) => {

        reactLocalStorage.setObject("User", res.data.user);
        reactLocalStorage.set("Token", res.data.token);

        setEmail("");
        setPassword("");

        navigate(`/`, {
          replace: true,
        });
      })
      .catch(() => {
        console.log("Wrong Email or Password");
      });
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
                <button type="submit" className="btn btn-primary btn-block mt-2">
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
