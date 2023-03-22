const mystyle = {
  color: "white",
  backgroundColor: "#41F064",
  padding: 10,
  fontFamily: "Arial",
};

const Notification = (props) => {
  return <p style={mystyle}>{props.msg}</p>;
};

export default Notification;
