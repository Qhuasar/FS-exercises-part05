import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Loginform from "./components/Login";
import loginService from "./services/users";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  const handleChange = (event, setState) => {
    event.preventDefault();
    setState(event.target.value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const newUser = await loginService.loginUser({ username, password });
      console.log(newUser);
      window.localStorage.setItem("loggedUser", JSON.stringify(newUser));
      setUser(newUser);
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log("Incorrect Credentials");
      console.error(error);
    }
  };

  const displayBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const displayLoggedIn = () => (
    <div>
      {user.username} logged in:
      <button type="submit" onClick={() => handleLogout()}>
        logout
      </button>
    </div>
  );

  return (
    <div>
      {user !== null && displayLoggedIn()}
      {user === null ? (
        <Loginform
          password={password}
          setPassword={setPassword}
          username={username}
          setUsername={setUsername}
          handleChange={handleChange}
          handleLogin={handleLogin}
        />
      ) : (
        displayBlogs()
      )}
    </div>
  );
};

export default App;
