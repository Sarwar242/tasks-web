import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../store/actions/auth/user/userActions';
import { RootState } from '../../store';
import { Nav, NavItem, NavLink, Dropdown, DropdownButton, DropdownMenu, DropdownItem } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const MainNavbar: React.FC = () => {
  const dispatch = useDispatch();

  const usr = useSelector((state:RootState)=>{
    return state.getUserProfileResponse.data;
  });

  console.log(usr);
  useEffect(()=>{
    dispatch(getUserAction());
  },[dispatch]);

  return (
    <>
    <Navbar expand="lg" bg="light">
      <Nav className="container-fluid">
        {/* Left side: App Name */}
        <NavItem>
          <NavLink href="/" active>Task Manager</NavLink>
        </NavItem>

        {/* Middle: Tasks, Projects, Users */}
        <Nav>
          <NavLink href="/tasks">Tasks</NavLink>
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
                <DropdownItem href="/logout">Logout</DropdownItem>
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