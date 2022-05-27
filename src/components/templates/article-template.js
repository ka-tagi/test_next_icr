const ArticleTemplate = ({post}) => {
  return (
    <div>
      {post.isPreview && <div>プレビューモード</div>}
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: post.content }}
      />
      {post.console && <div>{post.console}</div>}
    </div>
  );
}

export default ArticleTemplate;
