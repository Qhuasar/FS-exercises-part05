import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Loginform from "./components/Login"
import loginService from "./services/users"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [refreshBlogs, setRefreshBlogs] = useState(0)
  const [newNotification, setNewNotification] = useState(null)
  const [newErrorNotification, setNewErrorNotification] = useState(null)

  const refBlogForm = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((a, b) => {
          if (a.likes > b.likes) return -1
          if (a.likes < b.likes) return 1
          return 0
        })
      )
    )
  }, [refreshBlogs])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleChange = (event, setState) => {
    event.preventDefault()
    setState(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
  }

  const changeNotification = (msg) => {
    setNewNotification(msg)
    setTimeout(() => {
      setNewNotification(null)
    }, 5000)
  }

  const changeErrorNotification = (msg) => {
    setNewErrorNotification(msg)
    setTimeout(() => {
      setNewErrorNotification(null)
    }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const newUser = await loginService.loginUser({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      setPassword("")
      setUsername("")
    } catch (error) {
      changeErrorNotification("Wrong credentials")
    }
  }

  const displayBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            refreshBlogs={refreshBlogs}
            setRefreshBlogs={setRefreshBlogs}
            changeErrorNotification={changeErrorNotification}
            changeNotification={changeNotification}
          />
        ))}
        <Togglable ref={refBlogForm} info="new blog">
          <BlogForm
            handleChange={handleChange}
            user={user}
            refreshBlogs={refreshBlogs}
            setRefreshBlogs={setRefreshBlogs}
            changeErrorNotification={changeErrorNotification}
            changeNotification={changeNotification}
            ref={refBlogForm}
          />
        </Togglable>
      </div>
    )
  }

  const displayLoggedIn = () => (
    <div>
      {user.username} logged in:
      <button type="submit" onClick={() => handleLogout()}>
        logout
      </button>
    </div>
  )

  return (
    <div>
      {user !== null && displayLoggedIn()}
      {newNotification !== null && <Notification msg={newNotification} />}
      {newErrorNotification !== null && (
        <ErrorNotification msg={newErrorNotification} />
      )}
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
  )
}

export default App
