import { getList, getTotalCount } from '@/lib/api.js';

// components ------------------------------------------
import PaginationTemplate from '@/components/templates/pagination-templete';

// contents ------------------------------------------
const pageLimit = 2;

/**
 * ページネーションの表示用リスト max なし
 * @returns [number] // [1, 2, 3, 4]
 */
async function getPagenationList() {
  const postsTotalCount = await getTotalCount();
  const start = 1;
  const end = Math.ceil(postsTotalCount / pageLimit);

  const list = [...Array(end - start + 1)].map((_, i) => start + i);

  return list;
}

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
    limit: pageLimit,
    offset: (params.no - 1) * pageLimit,
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
