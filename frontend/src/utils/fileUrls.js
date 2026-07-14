const API_SUFFIX_PATTERN = /\/api\/v1\/?$/;

export const getBackendOrigin = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  return apiBaseUrl.replace(API_SUFFIX_PATTERN, "");
};

export const getUploadUrl = (filePath) => {
  if (!filePath) {
    return "";
  }

  const normalizedPath = String(filePath).replace(/\\/g, "/").replace(/^src\/uploads\//, "/uploads/");
  return `${getBackendOrigin()}${normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`}`;
};
