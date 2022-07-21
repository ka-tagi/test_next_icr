// components ------------------------------------------
import Link from 'next/link';
import { TdisplayArticleData } from '@/@types/article';

// template --------------------------------------------
const ArticleTemplate = ({ post }: { post: TdisplayArticleData }) => {
  return (
    <div>
      {post.isPreview && (
        <div>
          プレビューモードで閲覧中。
          <Link href={`/api/exit-preview?id=${post.id}`}>
            <a>プレビューを解除</a>
          </Link>
        </div>
      )}

      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: post.content! }}
      />
      {post.console && <div>{post.console}</div>}
    </div>
  );
}

export default ArticleTemplate;
