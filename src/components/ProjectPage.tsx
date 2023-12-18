import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
} from 'react-bootstrap';
import ProjectCard from './include/ProjectCard';
import EditProjectModal from './include/ProjectEdit';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const ProjectsPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const nameHandle = (value: any) => {
    setName(value);
  };

  const descriptionHandle = (value: any) => {
    setDescription(value);
  };

  const handleAddProject = (data: Project) => {
    const newProject = {data, ...data };
    setProjects([...projects, newProject]);
  };

  const handleEditProject = (updatedProject: Project, id: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setShowEditModal(false);
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  const handleChangeStatus = (id: string, newStatus: Project['status']) => {
    // Update project status in your state and/or backend here
  };

  const handleSubmit=()=>{
    
  }

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <h3>Add Project</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="projectName">
              <Form.Label>Project Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                onChange={nameHandle}
                value={name}
              />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                onChange={descriptionHandle}
                value={description}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className='mt-2'>
              Create Project
            </Button>
          </Form>
        </Col>
        <Col sm={6}>
          <h3>Projects</h3>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => {
                setSelectedProject(project);
                setShowEditModal(true);
              }}
              onDelete={() => handleDeleteProject(project.id)}
              handleChangeStatus={handleChangeStatus}
            />
          ))}
        </Col>
      </Row>
      {showEditModal && (
        <EditProjectModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          project={selectedProject}
          onSubmit={handleEditProject}
        />
      )}
    </Container>
  );
};

export default ProjectsPage;
