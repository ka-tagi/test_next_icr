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
    fallback: 'blocking',
  }
}

// コンテンツデータ取得
export async function getStaticProps({ params }) {
  const post = await getArticle(params.id);
  return {
    props: {
      post,
      revalidate: 10,
    }
  }
}

// container ------------------------------------------
const Article = ({post}) => {
  return (
    <ArticleTemplate
      post={post}
    />
  );
};

export default Article;
