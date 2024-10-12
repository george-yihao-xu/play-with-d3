import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Project } from '../dummyData/projects';

interface ProjectContextType {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  activeConstructionType: string | null;
  setActiveConstructionType: (constructionType: string | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeConstructionType, setActiveConstructionType] = useState<string | null>(null);
  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject, activeConstructionType, setActiveConstructionType }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (context === undefined) {
    console.error("useProjectContext must be used within a ProjectProvider");
  }
  
  return context as ProjectContextType;
};