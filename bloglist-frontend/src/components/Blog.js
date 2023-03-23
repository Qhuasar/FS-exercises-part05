import Togglable from "./Togglable";
import BlogInfo from "./BlogInfo";

const Blog = ({
  blog,
  refreshBlogs,
  setRefreshBlogs,
  changeNotification,
  changeErrorNotification,
}) => {
  //console.log(blog);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div className="blog-cont" style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable info="more info">
        <BlogInfo
          blog={blog}
          refreshBlogs={refreshBlogs}
          setRefreshBlogs={setRefreshBlogs}
          changeNotification={changeNotification}
          changeErrorNotification={changeErrorNotification}
        />
      </Togglable>
    </div>
  );
};

Blog.displayName = "Blog";
export default Blog;
