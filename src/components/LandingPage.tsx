import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasksAction } from '../store/actions/task/taskActions';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';

const LandingPage = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch();
  
  const tasks = useSelector((state: RootState) => {
		return state.getTasksResponse;
	});
  console.log(tasks);
	useEffect(() => {
		// dispatch(getTasksAction());
	}, [dispatch]);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {/* {tasks.map((task: string, index: number) => (
          <li key={index}>{task}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default LandingPage;


