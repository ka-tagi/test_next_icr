import { useRouter } from 'next/router';
// import { useMemo } from 'react';

/**
 * ページネーションコンポーネント用のデータ編集・返却
 * @param {*} pageList
 * @returns
 */
export const usePagenation = (pageList) => {
  const pageData = {
    pages: pageList,
    isCurrent: 0,
  };

  // 現在地
  const router = useRouter();
  const isCurrent = +router.query.no || 1;
  pageData.isCurrent = isCurrent;

  // console.log(67890, pageData, pageList);
  return pageData;
};
