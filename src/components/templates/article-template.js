const ArticleTemplate = ({post}) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: post.content }}
      />
    </div>
  );
}

export default ArticleTemplate;
