export const controllerResponse = <T = null>(arg: {
  data: T;
  message?: string;
}) => {
  return {
    data: arg.data,
    message: arg.message || 'request successful',
    state: 'success',
  };
};
