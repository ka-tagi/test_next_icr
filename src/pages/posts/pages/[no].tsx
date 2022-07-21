import { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticPropsContext} from 'next';
import { PAGE_LIMIT } from '@/data/global';
import { getList, getPagenationList } from '@/lib/api';

import { TArticle } from '@/@types/article';
import { TPaginationLinkList } from '@/@types/pagenation';

// components ------------------------------------------
import PaginationTemplate from '@/components/templates/pagination-templete';

// contents ------------------------------------------
type TProps = InferGetStaticPropsType<typeof getStaticProps>;

// パスの生成
export const getStaticPaths: GetStaticPaths = async () => {
  const list = await getPagenationList();

  return {
    paths: list.map((no) => `/posts/pages/${no}`) || [],
    fallback: true,
  }
}

// コンテンツデータ取得
export const getStaticProps = async (context: GetStaticPropsContext<{ no: string}>) => {

  // ページネーションデータ
  const paginations: TPaginationLinkList = await getPagenationList();

  // 記事一覧
  const no = +context.params!.no;
  const param = {
    limit: PAGE_LIMIT,
    offset: (no - 1) * PAGE_LIMIT,
    fields: 'id,title',
  };

  const posts: TArticle[] = await getList(param);

  return {
    props: {
      posts,
      paginations,
    },
    revalidate: 10,
  }
}

// container ------------------------------------------
const PagePagination:NextPage<TProps> = ({posts, paginations}) => {
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
