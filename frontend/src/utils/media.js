const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || '';

export const getMediaUrl = (path) => {
  if (!path) return null;

  if (path.startsWith('http')) {
    return path;
  }

  return `${MEDIA_URL}${path}`;
};
