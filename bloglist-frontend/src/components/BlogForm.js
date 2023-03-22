import { forwardRef, useState } from 'react'
import blogServices from '../services/blogs'

const BlogForm = forwardRef((props, refs) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogServices.createBlog({ title, url, author })
      props.changeNotification(
        `${title} by ${author} as been sucessfuly added`
      )
      refs.current.toggleVisible()
      setAuthor('')
      setTitle('')
      setUrl('')
      props.setRefreshBlogs(props.refreshBlogs + 1)
    } catch (error) {
      props.changeErrorNotification(error.message)
    }
  }

  return (
    <form onSubmit={(e) => handleCreate(e)}>
      <h1>Create new blog</h1>
      <p />
      <label>title</label>
      <input
        value={title}
        onChange={(e) => props.handleChange(e, setTitle, title)}
      />
      <p />
      <label>url</label>
      <input value={url} onChange={(e) => props.handleChange(e, setUrl, url)} />
      <p />
      <label>author</label>
      <input
        value={author}
        onChange={(e) => props.handleChange(e, setAuthor, author)}
      />
      <p />
      <button type="submit">create</button>
    </form>
  )
})

BlogForm.displayName = 'BlogFrom'

export default BlogForm
