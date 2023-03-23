const Loginform = (props) => {
  return (
    <form onSubmit={(e) => props.handleLogin(e)}>
      <h1>Login </h1>
      <label>username: </label>
      <input
        onChange={(event) => props.handleChange(event, props.setUsername)}
        value={props.username}
        id={"username"}
      />
      <p />
      <label>password: </label>
      <input
        onChange={(event) => props.handleChange(event, props.setPassword)}
        value={props.password}
        id={"password"}
      />
      <p />
      <button type="submit">Login</button>
    </form>
  )
}

Loginform.displayName = "LoginForm"
export default Loginform
