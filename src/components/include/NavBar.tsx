import React from 'react';
import { Link } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs'; // Import the Bootstrap icon

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Left side: App Name */}
        <Link to="/" className="navbar-brand">
          Your App Name
        </Link>

        {/* Middle: Tasks, Projects, Users */}
        <div className="navbar-nav">
          <Link to="/tasks" className="nav-link">
            Tasks
          </Link>
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </div>

        {/* Right side: User Name with Bootstrap Icon */}
        <div className="navbar-nav ml-auto">
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              User Name
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/logout" className="dropdown-item">
                Logout
              </Link>
            </div>
          </div>

          {/* Bootstrap Icon (BsPersonFill) */}
          <BsPersonFill
            className="ml-2"
            style={{ fontSize: '24px', color: '#007bff' }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
