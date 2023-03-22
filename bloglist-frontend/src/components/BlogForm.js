import { useState } from "react";

const BlogForm = (props) => {
    const [title, setTitle] = useState(null)
  return (
    <form>
      <label>title</label>
      <input></input>
      <label>url</label>
      <input></input>
      <label>likes</label>
      <input></input>
    </form>
  );
};

export default BlogForm;
