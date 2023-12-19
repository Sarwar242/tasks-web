import React from "react";
import { Card, Button, Form, Badge } from "react-bootstrap";
import { Task } from "../../models/taskModels";

type Props = {
  task: Task;
  users: any;
  onEdit: () => void;
  onDelete: () => void;
  handleChangeStatus: (id: string, newStatus: Task["status"]) => void;
  handleAssignUser: (id: string, userId: any) => void;
  handleRemoveUser: (id: string, userId: any) => void;
};

const TaskCard = ({
  task,
  users,
  onEdit,
  onDelete,
  handleChangeStatus,
  handleAssignUser,
  handleRemoveUser,
}: Props) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title>{task.name}</Card.Title>
      <Card.Text>{task.description}</Card.Text>
      <div className="d-flex justify-content-start">
        <Card.Text>Start: {task.start_date}</Card.Text>
        <Card.Text className="mx-3"> End: {task.end_date}</Card.Text>
      </div>

      <Card.Text>Project: {task?.project?.name}</Card.Text>
      <div>
        Assigned Users:
        <div className="d-flex justify-content-start">
          {task?.users?.map((user: any, index:any) => (
            <Button variant="light" className="text-sm font-sm fs-6" key={index}>
              {user.name} <Badge bg="secondary" onClick={(e) => handleRemoveUser(task.id, user.id)}>X</Badge>
            </Button>
          ))}
          
        </div>
      </div>
      <Card.Text>Status: {task.status}</Card.Text>
      <Button variant="secondary" onClick={onEdit}>
        Edit
      </Button>
      <Button className="mx-3" variant="danger" onClick={onDelete}>
        Delete
      </Button>

      <Form.Control
        className="mt-2"
        as="select"
        value={task.status}
        onChange={(e) => handleChangeStatus(task.id, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </Form.Control>

      <Form.Group controlId="projects" className="mt-2">
        <Form.Label>Assign User:</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => handleAssignUser(task.id, e.target.value)}
        >
          <option>Assign a User</option>
          {users?.map((user: any, index:any) => (
            <option key={index} value={user?.id}>{user.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Card.Body>
  </Card>
);

export default TaskCard;
