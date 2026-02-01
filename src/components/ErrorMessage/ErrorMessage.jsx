const ErrorMessage = ({ message = "Something went wrong." }) => {
  return <div className="error">{message}</div>;
};

export default ErrorMessage;
