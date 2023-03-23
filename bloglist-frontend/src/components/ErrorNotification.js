const mystyle = {
  color: "white",
  backgroundColor: "#F04141",
  padding: 10,
  fontFamily: "Arial",
}

const ErrorNotification = (props) => {
  return <h1 id={"error-notf"} style={mystyle}>{props.msg}</h1>
}

ErrorNotification.displayName = "ErrorNotification"
export default ErrorNotification
