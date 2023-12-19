import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpModel } from "../../models/authModels";
import { signInService, signUpService } from "../../httpService/userService";


export const SignUp: React.FC= () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

  const handleSignin = (event: any) => {
    document.body.classList.remove('noScroll');
    event.preventDefault()
    const data = new SignUpModel();
    data.name = name;
    data.email = email;
    data.password = password;

    signUpService(data)
      .then((res: any) => {
        setName("");
        setEmail("");
        setPassword("");

        navigate(`/signin`, {
          replace: true,
        });
      })
      .catch(() => {
        console.log("Wrong!");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <form onSubmit={handleSignin}>
                <div className="form-group">
                  <label htmlFor="email">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div> 
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
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/signin">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
