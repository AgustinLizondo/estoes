"use client"

import { cn, formatPath, navigate } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FiArrowLeft, FiPlus } from "react-icons/fi";

const Title = () => {
  const currentPath = usePathname();

  return (
    <section
      className={cn(
        "flex flex-row items-center bg-white border-b border-b-gray-300 px-4 mb-4 h-12",
        currentPath === "/" ? "justify-between" : "justify-start gap-2",
      )}
    >
      {currentPath !== "/" && (
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.history.back()
            }
          }}
          className="flex flex-row gap-2 items-center"
        >
          <FiArrowLeft size={24} color="#6d6c6c" />
          <span
            className="text-sm"
          >
            Back
          </span>
        </button>
      )}
      <span
        className="font-semibold text-black text-base"
      >
        {currentPath === "/" ? "My projects" : formatPath(currentPath)}
      </span>
      {
        currentPath === "/" && (
          <button
            className="flex flex-row gap-2 items-center rounded-md bg-primary p-2"
            onClick={() => {
              navigate('/add-project')
            }}
          >
            <FiPlus
              size={16}
              color="#FFFFFF"
            />
            <span
              className="text-white text-xs"
            >
              Add project
            </span>
          </button>
        )
      }
    </section >
  )
}

export default Title