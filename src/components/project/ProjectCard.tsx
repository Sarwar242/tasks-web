import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Project } from "../../models/projectModels";

type Props = {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  handleChangeStatus: (id: string, newStatus: Project["status"]) => void;
};

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  handleChangeStatus,
}: Props) => (
  <Card>
    <Card.Body>
      <Card.Title>{project.name}</Card.Title>
      <Card.Text>{project.description}</Card.Text>
      <Card.Text>Status: {project.status}</Card.Text>
      <Button variant="secondary" onClick={onEdit}>
        Edit
      </Button>
      <Button className="mx-3" variant="danger" onClick={onDelete}>
        Delete
      </Button>
      <Form.Control
        className="mt-2"
        as="select"
        value={project.status}
        onChange={(e) => handleChangeStatus(project.id, e.target.value)}
      >
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </Form.Control>
    </Card.Body>
  </Card>
);

export default ProjectCard;
