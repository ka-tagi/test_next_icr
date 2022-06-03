import { useRouter } from 'next/router';
// import { useMemo } from 'react';

export const usePagenation = (pageList) => {
  const pageData = {
    pages: pageList,
    isCurrent: 0,
  };
  const router = useRouter();
  // console.log(5555, router);

  // const isCurrent = asPath.no;
  const isCurrent = 2;

  pageData.isCurrent = isCurrent;
  console.log(67890, pageData, pageList);
  return pageData;
};
