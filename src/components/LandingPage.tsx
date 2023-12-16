import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasksAction } from '../store/actions/task/taskActions';
import { RootState } from '../store';

const LandingPage = () => {
	const dispatch = useDispatch();
  
  const tasks = useSelector((state: RootState) => {
		return state.getTasksResponse;
	});
  console.log(tasks);
	useEffect(() => {
		dispatch(getTasksAction());
	}, [dispatch]);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {/* {tasks?.map((task: any) => (
          <li key={task?.id}>{task}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default LandingPage;


