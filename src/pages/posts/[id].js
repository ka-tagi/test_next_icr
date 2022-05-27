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
  // const isPreviewMode = preview && previewData?.post.slug;
  const propsData = JSON.stringify(context);

  const isPreviewMode = context.previewData;
  console.log(`isPreviewMode: ${isPreviewMode}`);

  let params = null;
  let id = context.params.id;
  if (isPreviewMode) {
    const draftKey = context.previewData?.draftKey || '';
    params = {
      draftKey,
    }
    id = context.params.slug;
  }

  const post = await getArticle(id, params);

  return {
    props: {
      post,
      propsData,
    },
    revalidate: 10,
  };
}

// container ------------------------------------------
const Article = ({post, propsData}) => {
  return (
    <ArticleTemplate
      post={post}
      console={propsData}
    />
  );
};

export default Article;
