const ArticleTemplate = ({post, console, preview}) => {
  return (
    <div>
      {preview && <div>プレビューモード</div>}
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: post.content }}
      />
      {console && <div>{console}</div>}
    </div>
  );
}

export default ArticleTemplate;
