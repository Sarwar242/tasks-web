export interface Project {
  id: string;
  name: string;
  description: string;
  status: any | "in-progress" | "completed";
}
