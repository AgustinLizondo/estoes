import React from "react";
import { ProjectItemProps } from "./types";
import Image from "next/image";
import { FiEdit, FiMoreVertical, FiTrash } from "react-icons/fi";
import DropdownMenu from "../DropdownMenu";
import { useRouter } from "next/navigation";
import { useProjects } from "@/contexts/ProjectsContext";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";

const ProjectItem = (props: ProjectItemProps) => {
  const {
    id,
    projectName,
    creationDate,
    assignedTo,
    status,
  } = props;

  const router = useRouter();
  const { setSelectedProject, deleteProject } = useProjects();
  const disabled = status === "Disabled";

  const deleteProjectFunc = () => {
    deleteProject(id);
  }

  return (
    <div
      data-disabled={!!disabled}
      className="flex flex-row justify-between py-2 px-4 bg-white border-b border-b-gray-300 data-[disabled=true]:opacity-50"
    >
      <div
        className="flex flex-col gap-2"
      >
        <span
          className="text-sm"
        >
          {projectName}
        </span>
        <span
          className="text-xs text-gray-500"
        >
          {`Creation Date: ${creationDate}`}
        </span>
        <div
          className="flex flex-row gap-2"
        >
          {assignedTo.image
            ? (<Image
              alt="Author"
              src={assignedTo.image}
              className="w-6 h-6 rounded-full bg-contain"
              width={24}
              height={24}
            />)
            : (<div
              className="w-6 h-6 rounded-full bg-gray-200 text-white flex items-center justify-center"
            >
              <span>
                {assignedTo.name.charAt(0).toUpperCase()}
              </span>
            </div>)}
          <span>
            {assignedTo.name}
          </span>
        </div>
      </div>
      <Dialog>
        <DropdownMenu
          className="flex flex-col mr-2 -mt-4"
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
                setSelectedProject(id);
                router.push("edit-project")
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
                onClickCapture={() => deleteProjectFunc()}
              >
                Delete
              </button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

export default ProjectItem