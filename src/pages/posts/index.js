import { PAGE_LIMIT } from '@/data/global';
import { getList, getPagenationList } from '@/lib/api.js';

// components ------------------------------------------
import PaginationTemplate from '@/components/templates/pagination-templete';

// contents ------------------------------------------
// import { OG_IMAGE_URL, SITE_URL } from '~/constants/common';

export async function getStaticProps() {
  // 記事一覧
  const param = {
    limit: PAGE_LIMIT,
    fields: 'id,title',
  };
  const posts = await getList(param);

  // ページネーションデータ
  const paginations = await getPagenationList();
  return {
    props: {
      posts,
      paginations,
    },
    revalidate: 60,
  }
}

// container ------------------------------------------
const ArticleIndex = ({posts, paginations}) => {
  return (
    <div>
      <PaginationTemplate
        posts={posts}
        paginations={paginations}
      />
    </div>
  );
};

export default ArticleIndex;
