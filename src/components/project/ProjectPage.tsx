import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import EditProjectModal from "./ProjectEdit";
import { createProjectService, deleteProjectService, statusUpdateProjectService } from "../../httpService/projectService";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsAction } from "../../store/actions/project/projectActions";
import { RootState } from "../../store";
import { AppDeleteModal } from "../include/AppDeleteModal";
import { Project } from "../../models/projectModels";

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [Id, setId] = useState([]);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  
  const projectsList = useSelector((state: RootState) => {
    return state.getProjectsResponse.data;
  });

  useEffect(() => {
    dispatch(getProjectsAction());
  }, [dispatch]);

  const nameHandle = (value: any) => {
    setName(value);
  };

  const descriptionHandle = (value: any) => {
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

  const handleEditProject = (updatedProject: Project, id: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setShowEditModal(false);
  };

  const handleChangeStatus = (id: any, newStatus: Project["status"]) => {
    const data={
      status: newStatus
    }
    statusUpdateProjectService(id,data)
      .then(() => {
        dispatch(getProjectsAction());
        closeDeleteModal();
      })
      .catch((error: any) => {
      });
  };

  const handleDelete = () => {
    deleteProjectService(Id)
      .then(() => {
        dispatch(getProjectsAction());
        closeDeleteModal();
      })
      .catch((error: any) => {
      });
  };

  const handleSubmit = () => {
    var payload = {
      name: name,
      description: description,
    };

    console.log(payload);
    createProjectService(payload)
      .then(() => {
        setName("");
        setDescription("");
        console.log("added");
        dispatch(getProjectsAction());
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <h3>Add Project</h3>

          <Form.Group controlId="projectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              onChange={(e: any) => nameHandle(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group controlId="projectDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
              onChange={(e: any) => descriptionHandle(e.target.value)}
              value={description}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            onClick={handleSubmit}
          >
            Create Project
          </Button>
        </Col>
        <Col sm={6} style={{ overflowY:"scroll", height:"100vh" }}>
          <h3>Projects</h3>
          {projectsList?.projects?.map((project: any) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => {
                setSelectedProject(project);
                setShowEditModal(true);
              }}
              onDelete={() => openDeleteModal(project.id)}
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

export default ProjectsPage;
