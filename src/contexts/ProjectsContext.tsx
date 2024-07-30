"use client"

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type User = {
  image: string;
  name: string;
}

export type Project = {
  id: number;
  projectName: string;
  description: string;
  projectManager: User;
  assignedTo: User;
  status: string;
  creationDate?: string;
};

type ContextType = {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  editProject: (id: number, project: Project) => void;
  selectedProject: number;
  setSelectedProject: (id: number) => void;
}

const ProjectsContext = createContext<ContextType>({} as ContextType);

type ProjectsProviderType = {
  children: ReactNode;
};

const ProjectsProvider: FC<ProjectsProviderType> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      projectName: "Landing page",
      description: "Landing page",
      projectManager: {
        image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
        name: "Ignacio Truffa",
      },
      assignedTo: {
        image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
        name: "Pedro Truffa",
      },
      status: "Enabled",
      id: 0,
      creationDate: new Date().toLocaleString(),
    },
    {
      projectName: "E-Commerce Shop",
      description: "E-Commerce Shop",
      projectManager: {
        image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
        name: "Pedro Truffa",
      },
      assignedTo: {
        image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
        name: "Ignacio Truffa",
      },
      status: "Enabled",
      id: 1,
      creationDate: new Date().toLocaleString(),
    },
    {
      projectName: "CRM Linkroom",
      description: "CRM Linkroom",
      projectManager: {
        image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
        name: "Ignacio Truffa",
      },
      assignedTo: {
        image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
        name: "Pedro Truffa",
      },
      status: "Enabled",
      id: 2,
      creationDate: new Date().toLocaleString(),
    },
  ]);
  const [selectedProject, setSelectedProject] = useState<number>(0);

  const addProject = useCallback((project: Omit<Project, 'creationDate'>) => {
    const newProject = {
      ...project,
      creationDate: new Date().toLocaleString(),
      id: Math.random() * 10000,
    }
    setProjects([...projects, newProject]);
  }, [projects, setProjects]);

  const deleteProject = useCallback((id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  }, [projects, setProjects]);

  const editProject = useCallback((id: number, project: Project) => {
    setProjects(projects.map(p => p.id === id ? {
      ...project,
      creationDate: new Date().toLocaleString()
    } : p));
  }, [projects, setProjects]);

  const contextValue = useMemo(() => ({
    projects,
    addProject,
    deleteProject,
    editProject,
    selectedProject,
    setSelectedProject,
  }), [
    projects,
    addProject,
    deleteProject,
    editProject,
    selectedProject,
    setSelectedProject,
  ]);

  return (
    <ProjectsContext.Provider value={contextValue} >
      {children}
    </ProjectsContext.Provider>
  );
};

export function useProjects() {
  return useContext(ProjectsContext);
}

export default ProjectsProvider;
