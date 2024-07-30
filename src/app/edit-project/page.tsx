"use client";

import ControllerInput from "@/components/ControllerInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import ControllerSelect from "@/components/ControllerSelect";
import { useProjects, User } from "@/contexts/ProjectsContext";
import { addProjectSchema } from "../add-project/schema";
import { statusOptions, userOptions } from "@/lib/mocks";
import { isMobile, navigate } from "@/lib/utils";

export type AddProjectSchemaType = z.infer<typeof addProjectSchema> | FieldValues;

const EditPage = () => {
  const { projects, selectedProject } = useProjects();
  const {
    id,
    projectName,
    description,
    projectManager: projectManagerFromSelected,
    assignedTo: assignedToFromSelected,
    status: statusFromSelected,
  } = projects.filter(project => project.id === selectedProject)[0];

  const isDesktop = !isMobile();
  const projectManager = userOptions.findIndex(user => user.name === projectManagerFromSelected.name).toString();
  const assignedTo = userOptions.findIndex(user => user.name === assignedToFromSelected.name).toString();
  const status = statusOptions.filter(status => status.label === statusFromSelected)[0].value;

  const {
    control,
    getValues,
    formState: {
      isValid,
    }
  } = useForm<AddProjectSchemaType>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      projectName,
      description,
      projectManager,
      assignedTo,
      status,
    }
  });

  const formatUserOptions = (users: User[]) => {
    return users.map((user, index) => ({
      value: index.toString(),
      label: user.name,
    }));
  }

  const { editProject } = useProjects();

  const editProjectFunc = () => {
    const {
      projectName,
      description,
      projectManager,
      assignedTo,
      status,
    } = getValues();

    editProject(id, {
      id,
      projectName,
      description,
      projectManager: userOptions[parseInt(projectManager)],
      assignedTo: userOptions[parseInt(assignedTo)],
      status: statusOptions.filter(statusOption => statusOption.value === status)[0].label,
    })
    navigate('/');
  }

  return (
    <section
      data-isdesktop={isDesktop}
      className="flex flex-col mx-auto gap-4 bg-white px-2 py-8 data-[isdesktop=true]:max-w-[80%] data-[isdesktop=true]:rounded-lg data-[isdesktop=true]:shadow-lg data-[isdesktop=true]:px-8"
    >
      <ControllerInput
        label="Project name"
        control={control}
        name="projectName"
        placeholder="Project name"
      />
      <ControllerInput
        label="Description"
        control={control}
        name="description"
        placeholder="Description"
      />
      <ControllerSelect
        control={control}
        placeholder="Project manager"
        name="projectManager"
        label="Project manager"
        options={formatUserOptions(userOptions)}
      />
      <ControllerSelect
        control={control}
        placeholder="Assigned to"
        name="assignedTo"
        label="Assigned to"
        options={formatUserOptions(userOptions)}
      />
      <ControllerSelect
        control={control}
        placeholder="Status"
        name="status"
        label="Status"
        options={statusOptions}
      />
      <button
        className="flex self-start rounded-md bg-primary px-3 py-2 text-white"
        type="button"
        disabled={!isValid}
        onClickCapture={() => editProjectFunc()}
      >
        Save changes
      </button>
    </section>
  )
}

export default EditPage