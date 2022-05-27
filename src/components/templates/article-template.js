const ArticleTemplate = ({post, console}) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: post.content }}
      />
      <div>{console}</div>
    </div>
  );
}

export default ArticleTemplate;
