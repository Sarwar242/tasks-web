import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

interface Project {
  id: string;
  name: string;
  description: string;
  status: any|'pending' | 'in-progress' | 'completed';
}

type Props = {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  handleChangeStatus: (id: string, newStatus: Project['status']) => void;
};

const ProjectCard = ({ project, onEdit, onDelete, handleChangeStatus }: Props) => (
  <Card>
    <Card.Body>
      <Card.Title>{project.name}</Card.Title>
      <Card.Text>{project.description}</Card.Text>
      <Card.Text>Status: {project.status}</Card.Text>
      <Button variant="secondary" onClick={onEdit}>
        Edit
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Delete
      </Button>
      <Form.Control
        as="select"
        onChange={(e) => handleChangeStatus(project.id, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </Form.Control>
    </Card.Body>
  </Card>
);

export default ProjectCard;
