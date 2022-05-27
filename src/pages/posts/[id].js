import { useRouter } from "next/router"
import { getList, getArticle } from '@/lib/api.js';

// components ------------------------------------------
import ArticleTemplate from '@/components/templates/article-template';

// contents ------------------------------------------
// パスの生成
export async function getStaticPaths() {
  const param = {
    limit: 100,
    offset: 0,
    fields: 'id'
  }
  const postIds = await getList(param);

  return {
    paths: postIds.map((post) => `/posts/${post.id}`) || [],
    fallback: true,
  }
}

// コンテンツデータ取得
export async function getStaticProps(context) {
  const propsData = JSON.stringify(context);

  console.log(`context: ${propsData}`);
  const isPreviewMode = context.preview && context.previewData?.draftKey;
  console.log(`isPreviewMode: ${isPreviewMode}`);

  const id = context.params.id;
  let params = null;
  if (isPreviewMode) {
    const draftKey = context.previewData?.draftKey || '';
    params = {
      draftKey,
    }
  }

  const post = await getArticle(id, params);
  post.console = propsData;

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

// container ------------------------------------------
const Article = ({post}) => {
  if (!post) {
    return <div>ページデータがないよ</div>
  }

  return (
    <ArticleTemplate
      post={post}
    />
  );
};

export default Article;
