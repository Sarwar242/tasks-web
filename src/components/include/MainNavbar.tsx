import React, { useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../store/actions/auth/user/userActions';
import { RootState } from '../../store';
import { Nav, NavItem, NavLink, Dropdown, DropdownButton, DropdownMenu, DropdownItem } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { reactLocalStorage } from 'reactjs-localstorage';
import { logoutService } from '../../httpService/userService';
import { useNavigate } from 'react-router';

const MainNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usr = useSelector((state:RootState)=>{
    return state.getUserProfileResponse.data;
  });

  useEffect(()=>{
    dispatch(getUserAction());
  },[dispatch]);


  const handleLogout = ()=>{
    logoutService()
    .then((res: any) => {

      reactLocalStorage.remove("User");
      reactLocalStorage.remove("Token");

      navigate(`/signin`, {
        replace: true,
      });
    })
    .catch(() => {
      console.log("Something is Wrong!");
    });
  }
  return (
    <>
    <Navbar expand="md" bg="light">
      <Nav className="container-fluid">
        {/* Left side: App Name */}
        <NavItem>
          <NavLink href="/" active>Task Manager</NavLink>
        </NavItem>

        {/* Middle: Tasks, Projects, Users */}
        <Nav>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/users">Users</NavLink>
        </Nav>

        {/* Right side: User Name with Bootstrap Icon */}
        <Nav className="ml-auto">
          <Dropdown as={NavItem}>
            <DropdownButton
              id="navbarDropdown"
              title={usr.name}
              variant="light"
            >
              <DropdownMenu>
                <DropdownItem href="/profile">Profile</DropdownItem>
                <Dropdown.Divider />
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </DropdownButton>
            
          </Dropdown>
          <BsPersonFill className="ml-2 mt-2" size="24px" color="#007bff" />
        </Nav>
      </Nav>
    </Navbar>
    </>
  );
};

export default MainNavbar;