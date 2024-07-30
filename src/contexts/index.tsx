import { ReactNode } from 'react';
import ProjectsProvider from './ProjectsContext';

const ContextProvider = ({ children }: { children: ReactNode }) => (
  <ProjectsProvider>
    {children}
  </ProjectsProvider>
);

export default ContextProvider;
