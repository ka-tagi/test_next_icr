import { getList } from '@/lib/api.js';

// components ------------------------------------------
import ArticleList from '@/components/oganisms/article-list/index';


// contents ------------------------------------------
// import { OG_IMAGE_URL, SITE_URL } from '~/constants/common';

export async function getStaticProps() {
  const posts = await getList();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

// container ------------------------------------------
const ArticleIndex = ({posts}) => {
  return (
    <ArticleList posts={posts} />
  );
};

export default ArticleIndex;
