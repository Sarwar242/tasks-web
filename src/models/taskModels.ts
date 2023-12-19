import { Project } from "./projectModels";

export interface Task {
    id: string;
    name: string;
    description: string;
    start_date: any| Date;
    end_date: any| Date;
    project: null| Project;
    users: null| any;
    project_id: string;
    status: any | "pending"| "in_progress" | "completed";
  }