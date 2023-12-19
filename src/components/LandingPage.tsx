import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksAction } from "../store/actions/task/taskActions";
import { RootState } from "../store";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AppDeleteModal } from "./include/AppDeleteModal";
import TaskCard from "./task/TaskCard";
import EditTaskModal from "./task/TaskEdit";
import {
  statusUpdateTaskService,
  deleteTaskService,
  createTaskService,
  assignUserTaskService,
  removeUserTaskService,
} from "../httpService/taskService";
import { Task } from "../models/taskModels";
import { getProjectsAction } from "../store/actions/project/projectActions";
import { getUsersAction } from "../store/actions/auth/user/userActions";

const LandingPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [Id, setId] = useState([]);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);

  const tasksList = useSelector((state: RootState) => {
    return state.getTasksResponse.data;
  });

  useEffect(() => {
    dispatch(getTasksAction());
  }, [dispatch]);

  const projectsList = useSelector((state: RootState) => {
    return state.getProjectsResponse.data;
  });

  useEffect(() => {
    dispatch(getProjectsAction());
  }, [dispatch]);

  const usersList = useSelector((state: RootState) => {
    return state.getUsersResponse.data;
  });

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  const handleName = (value: any) => {
    setName(value);
  };

  const handleDescription = (value: any) => {
    setDescription(value);
  };
  const openDeleteModal = (id: any) => {
    console.log(id);
    setOpenDeleteModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleChangeStatus = (id: any, newStatus: Task["status"]) => {
    const data = {
      status: newStatus,
    };
    statusUpdateTaskService(id, data)
      .then(() => {
        dispatch(getTasksAction());
        closeDeleteModal();
      })
      .catch((error: any) => {});
  };

  const handleAssignUser = (id: any, userId: any) => {
    const data = {
      user_id: userId,
    };
    assignUserTaskService(id, data)
      .then(() => {
        dispatch(getTasksAction());
        closeDeleteModal();
      })
      .catch((error: any) => {});
  };

  const handleRemoveUser = (id: any, userId: any) => {
    const data = {
      user_id: userId,
    };
    removeUserTaskService(id, data)
      .then(() => {
        dispatch(getTasksAction());
        closeDeleteModal();
      })
      .catch((error: any) => {});
  };

  const handleDelete = () => {
    deleteTaskService(Id)
      .then(() => {
        dispatch(getTasksAction());
        closeDeleteModal();
      })
      .catch((error: any) => {});
  };

  const handleSubmit = () => {
    var payload = {
      name: name,
      description: description,
      start_date: startDate,
      end_date: endDate,
      project_id: 1,
    };

    console.log(payload);

    createTaskService(payload)
      .then(() => {
        setName("");
        setDescription("");
        setEndDate("");
        setStartDate("");
        console.log("added");
        dispatch(getTasksAction());
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  function handleStartDate(value: any): void {
    setStartDate(value);
  }

  function handleEndDate(value: any): void {
    setEndDate(value);
  }

  return (
    <Container>
      <Row>
        <Col sm={7} style={{ overflowY: "scroll", height: "100vh" }}>
          <h3>Tasks</h3>
          {tasksList?.tasks?.map((task: any) => (
            <TaskCard
              key={task.id}
              task={task}
              users={usersList?.users}
              onEdit={() => {
                setSelectedTask(task);
                setShowEditModal(true);
              }}
              onDelete={() => openDeleteModal(task.id)}
              handleChangeStatus={handleChangeStatus}
              handleAssignUser={handleAssignUser}
              handleRemoveUser={handleRemoveUser}
            />
          ))}
        </Col>
        <Col sm={5}>
          <h3>Add Task</h3>

          <Form.Group controlId="taskName1">
            <Form.Label>Task Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task name"
              onChange={(e: any) => handleName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group controlId="taskDescription1">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              onChange={(e: any) => handleDescription(e.target.value)}
              value={description}
            />
          </Form.Group>
          <Form.Group controlId="taskStart1">
            <Form.Label>Start Date:</Form.Label>
            <Form.Control
              type="date"
              onChange={(e: any) => handleStartDate(e.target.value)}
              value={startDate}
            />
          </Form.Group>
          <Form.Group controlId="taskEnd1">
            <Form.Label>End Date:</Form.Label>
            <Form.Control
              type="date"
              onChange={(e: any) => handleEndDate(e.target.value)}
              value={endDate}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            onClick={handleSubmit}
          >
            Create Task
          </Button>
        </Col>
      </Row>
      {showEditModal && (
        <EditTaskModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          task={selectedTask}
          projects={projectsList?.projects}
        />
      )}

      {isOpenDeleteModal && (
        <AppDeleteModal
          text="Are you sure to Delete?"
          handleDelete={handleDelete}
          show={isOpenDeleteModal}
          onHide={() => setOpenDeleteModal(false)}
          closeDeleteModal={closeDeleteModal}
        />
      )}
    </Container>
  );
};

export default LandingPage;
