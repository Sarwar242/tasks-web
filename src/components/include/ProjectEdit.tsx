import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

interface Project {
  id: string;
  name: string;
  description: string;
  status: any | 'pending' | 'in-progress' | 'completed';
}

type Props = {
  show: boolean;
  onHide: () => void;
  project: Project | null;
  onSubmit: (updatedProject: Project, id: string) => void;
};

const EditProjectModal = ({ show, onHide, project, onSubmit }: Props) => {
  const [updatedProject, setUpdatedProject] = useState<Project | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (project) {
      setUpdatedProject({ ...project });
    }
  }, [project]);

  const handleStatus=(value:any)=>{
    setStatus(value);
  }

  const nameHandle = (value: any) => {
    setName(value);
  };
  
  const descriptionHandle = (value: any) => {
    setDescription(value);
  };

  const handleFormSubmit=()=>{
    
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="editProjectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              onChange={nameHandle}
              value={name}
            />
          </Form.Group>
          <Form.Group controlId="editProjectDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
              onChange={descriptionHandle}
              value={description}
            />
          </Form.Group>
          <Form.Group controlId="editProjectStatus">
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              onChange={handleStatus}
              value={status}
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProjectModal;