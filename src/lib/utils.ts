import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPath = (path: string) => {
  return path
    .replace(/\//g, ' ') // Replace slashes with spaces
    .replace(/-/g, ' ')  // Replace hyphens with spaces
    .split(' ')          // Split into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' ');          // Join words back into a single string
};