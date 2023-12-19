import React, { useEffect } from "react";
import { getUsersAction } from "../../store/actions/auth/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Table } from "react-bootstrap";
import moment from 'moment'

const UserPage = () => {
  const dispatch = useDispatch();
  
  const usersList = useSelector((state: RootState) => {
    return state.getUsersResponse.data;
  });

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);
  return (
    <>
      <div>Users List</div>
      <Table striped bordered hover variant="light" className="m-3 me-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {usersList?.users?.map((user: any, index:any) => (
            <tr>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{ moment(user.created_at, 'YYYY-MM-DD HH:mm:ss').format('dddd,DD MMMM') }</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserPage;
