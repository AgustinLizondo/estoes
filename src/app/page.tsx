"use client"

import ProjectItem from "@/components/ProjectItem";
import { useProjects } from "@/contexts/ProjectsContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit, FiMoreVertical, FiTrash } from "react-icons/fi";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import DropdownMenu from "@/components/DropdownMenu";
import Image from "next/image";
import { isMobile, navigate } from "@/lib/utils";

export default function Home() {
  const { projects } = useProjects();
  const isDesktop = !isMobile();
  const { setSelectedProject, deleteProject } = useProjects();
  const deleteProjectFunc = (id: number) => {
    deleteProject(id);
  }

  return (
    <main className="flex min-h-screen flex-col">
      {isDesktop
        ? (<Table
          data-isdesktop={isDesktop}
          className="mx-auto max-w-[90%]"
        >
          <TableHeader
            className="bg-gray-200"
          >
            <TableRow>
              <TableHead
                className="font-bold text-black rounded-tl-lg"
              >
                Project Info
              </TableHead>
              <TableHead
                className="font-bold text-black"
              >
                Project Manager
              </TableHead>
              <TableHead
                className="font-bold text-black"
              >
                Assigned to
              </TableHead>
              <TableHead
                className="font-bold text-black"
              >
                Status
              </TableHead>
              <TableHead
                className="font-bold text-black rounded-tr-lg"
              >
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="bg-white"
              >
                <TableCell>
                  <div
                    className="flex flex-col gap-2"
                  >
                    <span>
                      {project.projectName}
                    </span>
                    <span
                      className="text-xs text-gray-500"
                    >
                      {`Creation date: ${project.creationDate}`}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className="flex flex-row gap-2 items-center"
                  >
                    <Image
                      alt="Author"
                      src={project.projectManager.image}
                      className="w-6 h-6 rounded-full bg-contain"
                      width={24}
                      height={24}
                    />
                    <span>
                      {project.projectManager.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className="flex flex-row gap-2 items-center"
                  >
                    <Image
                      alt="Author"
                      src={project.assignedTo.image}
                      className="w-6 h-6 rounded-full bg-contain"
                      width={24}
                      height={24}
                    />
                    <span>
                      {project.assignedTo.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    data-status={project.status === 'Enabled'}
                    className="rounded-md border border-gray-300 bg-gray-200 px-2 py-1 w-min"
                  >
                    {project.status}
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DropdownMenu
                      className="flex flex-col mr-2"
                      trigger={
                        <button
                          type="button"
                        >
                          <FiMoreVertical size={24} />
                        </button>
                      }
                      options={[
                        {
                          id: 0,
                          title: "Edit",
                          icon: <FiEdit size={16} color="#262626" />,
                          onClick: () => {
                            setSelectedProject(project.id);
                            navigate('/edit-project')
                          },
                        },
                        {
                          id: 1,
                          title: "Delete",
                          icon: <FiTrash size={16} color="#262626" />,
                          triggers: true,
                        }
                      ]}
                    />
                    <DialogPortal>
                      <DialogOverlay />
                      <DialogContent className="rounded-lg max-w-[80%]">
                        <DialogTitle>
                          Delete project
                        </DialogTitle>
                        You are about to delete this project. Are you sure?
                        <DialogFooter
                          className="flex flex-row gap-2 justify-end"
                        >
                          <DialogClose>
                            <button
                              className="rounded-md bg-gray-500 text-white px-3 py-2"
                              type="button"
                            >
                              Cancel
                            </button>
                          </DialogClose>
                          <button
                            className="rounded-md bg-primary text-white px-3 py-2"
                            type="button"
                            onClickCapture={() => deleteProjectFunc(project.id)}
                          >
                            Delete
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </DialogPortal>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)
        : (projects.map(({
          id,
          projectName,
          creationDate,
          projectManager,
          assignedTo,
          description,
          status,
        }) => (
          <ProjectItem
            key={id}
            id={id}
            projectName={projectName}
            creationDate={creationDate}
            projectManager={projectManager}
            assignedTo={assignedTo}
            description={description}
            status={status}
          />
        )))}
    </main >
  );
}
