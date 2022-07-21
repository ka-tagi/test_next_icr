import { NextPage, InferGetStaticPropsType } from 'next';

import { PAGE_LIMIT } from '@/data/global';
import { getList, getPagenationList, TGetListParam } from '@/lib/api';

import { TArticle } from '@/@types/article';
import { TPaginationLinkList } from '@/@types/pagenation';

// components ------------------------------------------
import PaginationTemplate from '@/components/templates/pagination-templete.js';

// contents ------------------------------------------
type TProps = InferGetStaticPropsType<typeof getStaticProps>;

// import { OG_IMAGE_URL, SITE_URL } from '~/constants/common';

export const getStaticProps = async () => {
  // 記事一覧
  const param: TGetListParam = {
    limit: PAGE_LIMIT,
    fields: 'id,title',
  };
  const posts: TArticle[] = await getList(param);

  // ページネーションデータ
  const pagination: TPaginationLinkList = await getPagenationList();
  return {
    props: {
      posts,
      pagination,
    },
    revalidate: 60,
  }
}

// container ------------------------------------------
const ArticleIndex: NextPage<TProps> = ({posts, pagination}) => {
  return (
    <div>
      <PaginationTemplate
        posts={posts}
        paginations={pagination}
      />
    </div>
  );
};

export default ArticleIndex;
