const mystyle = {
  color: "white",
  backgroundColor: "#F04141",
  padding: 10,
  fontFamily: "Arial",
};

const ErrorNotification = (props) => {
  return <h1 style={mystyle}>{props.msg}</h1>;
};

export default ErrorNotification;
