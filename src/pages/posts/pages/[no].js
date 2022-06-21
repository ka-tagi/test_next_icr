import { PAGE_LIMIT } from '@/data/global';
import { getList, getPagenationList } from '@/lib/api.ts';

// components ------------------------------------------
import PaginationTemplate from '@/components/templates/pagination-templete';

// contents ------------------------------------------
// パスの生成
export async function getStaticPaths() {
  const list = await getPagenationList();

  return {
    paths: list.map((no) => `/posts/pages/${no}`) || [],
    fallback: true,
  }
}

// コンテンツデータ取得
export async function getStaticProps({ params }) {

  // ページネーションデータ
  const paginations = await getPagenationList();

  // 記事一覧
  const param = {
    limit: PAGE_LIMIT,
    offset: (params.no - 1) * PAGE_LIMIT,
    fields: 'id,title',
  };

  const posts= await getList(param);

  return {
    props: {
      posts,
      paginations,
    },
    revalidate: 10,
  }
}

// container ------------------------------------------
const PagePagination = ({posts, paginations}) => {
  if (!posts && !paginations) {
    return <div>ページデータがないよ</div>
  }

  return (
    <PaginationTemplate
      posts={posts}
      paginations={paginations}
    />
  );
};

export default PagePagination;
