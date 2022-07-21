// components ------------------------------------------
import Link from 'next/link';
import { TdisplayArticleData } from '@/@types/article';

type Tprops = {
  post: TdisplayArticleData;
}

// template --------------------------------------------
const ArticleTemplate = (props: Tprops) => {
  return (
    <div>
      {props.post.isPreview && (
        <div>
          プレビューモードで閲覧中。
          <Link href={`/api/exit-preview?id=${props.post.id}`}>
            <a>プレビューを解除</a>
          </Link>
        </div>
      )}

      <h1>{props.post.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: props.post.content! }}
      />
      {props.post.console && <div>{props.post.console}</div>}
    </div>
  );
}

export default ArticleTemplate;
