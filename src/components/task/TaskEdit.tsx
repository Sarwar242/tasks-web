import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getTasksAction } from "../../store/actions/task/taskActions";
import { updateTaskService } from "../../httpService/taskService";
import { Task } from "../../models/taskModels";
import { Project } from "../../models/projectModels";

type Props = {
  show: boolean;
  onHide: () => void;
  task: Task | null;
  projects: any | null;
};

const EditTaskModal = ({ show, onHide, task, projects }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setStartDate(task.start_date);
      setEndDate(task.end_date);
      setProjectId(task.project_id);
    }
  }, [task]);

  const nameHandle = (value: any) => {
    setName(value);
  };

  const descriptionHandle = (value: any) => {
    setDescription(value);
  };
  function handleStartDate(value: any): void {
    setStartDate(value);
  }

  function handleEndDate(value: any): void {
    setEndDate(value);
  }

  function handleProjectId(id: any): void {
    setProjectId(id);
  }

  const handleFormSubmit = () => {
    var payload = {
      name: name,
      description: description,
      start_date: startDate,
      end_date: endDate,
      project_id: projectId,
    };

    updateTaskService(task?.id, payload)
      .then(() => {
        setName("");
        setDescription("");
        setEndDate("");
        setStartDate("");
        setProjectId("");
        console.log("updated");
        dispatch(getTasksAction());
        onHide();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="editTaskName">
          <Form.Label>Task Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            onChange={(e: any) => nameHandle(e.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group controlId="editTaskDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            onChange={(e: any) => descriptionHandle(e.target.value)}
            value={description}
          />
        </Form.Group>
        <Form.Group controlId="taskStart">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e: any) => handleStartDate(e.target.value)}
            value={startDate}
          />
        </Form.Group>
        <Form.Group controlId="taskEnd">
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e: any) => handleEndDate(e.target.value)}
            value={endDate}
          />
        </Form.Group>
        <Form.Group controlId="projectsX">
          <Form.Label>Project:</Form.Label>
          <Form.Control
            className="mt-2"
            as="select"
            value={projectId}
            onChange={(e) => handleProjectId(e.target.value)}
          >
            
            {projects.map((project: Project, index:any) => (
              <option  key={index} value={project?.id}>{project.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleFormSubmit} className="mt-3">
          Save changes
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default EditTaskModal;
