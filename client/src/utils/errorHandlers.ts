export const handleApiError = (error: any) => {
  if (error.response.status === 401) {
    throw new Error(error.response.data);
  }
  throw new Error(error.message);
};
