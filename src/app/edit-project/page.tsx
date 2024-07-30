"use client";

import ControllerInput from "@/components/ControllerInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import ControllerSelect from "@/components/ControllerSelect";
import { useProjects, User } from "@/contexts/ProjectsContext";
import { addProjectSchema } from "../add-project/schema";
import { useRouter } from "next/navigation";

export type AddProjectSchemaType = z.infer<typeof addProjectSchema> | FieldValues;

export const userOptions = [
  {
    image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
    name: "Ignacio Truffa",
  },
  {
    image: "https://s3-alpha-sig.figma.com/img/e137/354e/7d843148df25b98c9ca118eea3006203?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B0DSi5N002cBmkT60-3H1Ls8anK0t424fmimNwNRXW8cwsmlMufPhnftzH3jMrFPv6NA27cPXUGXyPscS0eeTAMJrN5cFGkUG~VErMH7rZe3TbUOadRpgyY7Y0LHPnNdjnB61DtQBI524ok25ScLNJHh2sggOZ5wtQMZOAzU70Jip1-IRDLZBoRt2ZtbDWhd39hZRdKVWYZD~neQAXYg0cBOhBXM68unQti4iTifA8bXE38618WOnP75Bh6VaFgIjsOK~pJEASXsuEzRwtahuXGfB3GkiMAZBlvJBqIpCpFJwiHojzAARFMmQvcVYtjUCaU~aVrX9QEHDioeWrT0ag__",
    name: "Pedro Truffa",
  }
];

export const statusOptions = [
  { value: '1', label: 'Enabled' },
  { value: '2', label: 'Disabled' },
];

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

  const isDesktop = window.innerWidth > 1024;
  const projectManager = userOptions.findIndex(user => user.name === projectManagerFromSelected.name).toString();
  const assignedTo = userOptions.findIndex(user => user.name === assignedToFromSelected.name).toString();
  const status = statusOptions.filter(status => status.label === statusFromSelected)[0].value;
  const router = useRouter();

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

    router.push("/");
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