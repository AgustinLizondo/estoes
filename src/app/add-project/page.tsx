"use client";

import ControllerInput from "@/components/ControllerInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectSchema } from "./schema";
import { z } from "zod";
import ControllerSelect from "@/components/ControllerSelect";
import { useProjects, User } from "@/contexts/ProjectsContext";
import { statusOptions, userOptions } from "@/lib/mocks";
import { isMobile, navigate } from "@/lib/utils";

export type AddProjectSchemaType = z.infer<typeof addProjectSchema> | FieldValues;

const AddPage = () => {
  const isDesktop = !isMobile();

  const {
    control,
    getValues,
    formState: {
      isValid,
    }
  } = useForm<AddProjectSchemaType>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      projectName: '',
      description: '',
      projectManager: '',
      assignedTo: '',
      status: '',
    }
  });

  const formatUserOptions = (users: User[]) => {
    return users.map((user: User, index: number) => ({
      value: index.toString(),
      label: user.name,
    }));
  }

  const { addProject } = useProjects();

  const createProject = () => {
    const {
      projectName,
      description,
      projectManager,
      assignedTo,
      status,
    } = getValues();

    addProject({
      id: Math.random() * 10000,
      projectName,
      description,
      projectManager: userOptions[Number(projectManager)],
      assignedTo: userOptions[Number(assignedTo)],
      status: statusOptions[Number(status)].label,
    })
    navigate('/')
  }

  return (
    <section
      data-isdesktop={isDesktop}
      className="flex flex-col gap-4 mx-auto bg-white px-2 py-8 data-[isdesktop=true]:max-w-[80%] data-[isdesktop=true]:rounded-lg data-[isdesktop=true]:shadow-lg data-[isdesktop=true]:px-8"
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
        placeholder="Select a person"
        name="projectManager"
        label="Project manager"
        options={formatUserOptions(userOptions)}
      />
      <ControllerSelect
        control={control}
        placeholder="Select a person"
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
        className="flex self-start rounded-md bg-primary px-3 py-2 text-white disabled:opacity-50"
        type="button"
        disabled={!isValid}
        onClickCapture={() => createProject()}
      >
        Create project
      </button>
    </section>
  )
}

export default AddPage