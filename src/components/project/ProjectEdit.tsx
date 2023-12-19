import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { updateProjectService } from '../../httpService/projectService';
import { useDispatch } from 'react-redux';
import { getProjectsAction } from '../../store/actions/project/projectActions';
import { Project } from '../../models/projectModels';

type Props = {
  show: boolean;
  onHide: () => void;
  project: Project | null;
  onSubmit: (updatedProject: Project, id: string) => void;
};

const EditProjectModal = ({ show, onHide, project, onSubmit }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const nameHandle = (value: any) => {
    setName(value);
  };
  
  const descriptionHandle = (value: any) => {
    setDescription(value);
  };

  const handleFormSubmit=() => {
    var payload = {
      name: name,
      description: description,
    };

    console.log(payload);
    updateProjectService(project?.id, payload)
      .then(() => {
        setName("");
        setDescription("");
        console.log("updated");
        dispatch(getProjectsAction());
        onHide();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group controlId="editProjectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              onChange={(e: any) => nameHandle(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group controlId="editProjectDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
              onChange={(e: any) => descriptionHandle(e.target.value)}
              value={description}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleFormSubmit} className='mt-3'>
            Save changes
          </Button>
      </Modal.Body>
    </Modal>
  );
};

export default EditProjectModal;