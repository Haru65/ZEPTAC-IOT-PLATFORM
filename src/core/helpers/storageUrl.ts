// src/core/helpers/storageUrl.ts
export const generateStorageUrl = (path: string = ''): string => {
    const storageBase = import.meta.env.VITE_APP_STORAGE_URL || '';
    const trimmedPath = path.startsWith('/') ? path.slice(1) : path;  // Remove leading slash from path if present
    return `${storageBase}/${trimmedPath}`;
  };
  