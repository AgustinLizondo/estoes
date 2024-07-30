"use client";

import ControllerInput from "@/components/ControllerInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectSchema } from "./schema";
import { z } from "zod";
import ControllerSelect from "@/components/ControllerSelect";
import { useProjects, User } from "@/contexts/ProjectsContext";
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
  { value: '0', label: 'Enabled' },
  { value: '1', label: 'Disabled' },
];

const AddPage = () => {
  const router = useRouter();
  const isDesktop = window.innerWidth > 1024;

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
    return users.map((user, index) => ({
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
      projectManager: userOptions[parseInt(projectManager)],
      assignedTo: userOptions[parseInt(assignedTo)],
      status: statusOptions[parseInt(status)].label,
    })

    router.push("/");
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