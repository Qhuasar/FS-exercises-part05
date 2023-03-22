const Loginform = (props) => {
  return (
    <form onSubmit={(e) => props.handleLogin(e)}>
      <h1>Login </h1>
      <label>username: </label>
      <input
        onChange={(event) => props.handleChange(event, props.setUsername)}
        value={props.username}
      />
      <p />
      <label>password: </label>
      <input
        onChange={(event) => props.handleChange(event, props.setPassword)}
        value={props.password}
      />
      <p />
      <button type="submit">Login</button>
    </form>
  );
};

export default Loginform;
