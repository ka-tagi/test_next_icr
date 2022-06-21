import { PAGE_LIMIT } from '@/data/global';

export const API_URL = process.env.API_URL;
export const API_KEY = process.env.API_KEY;

export type TGetListParam = {
  draftKey?: string
  limit?: number
  offset?: number
  orders?: string
  q?: string
  fields?: string
  ids?: string
  filters?: string
  depth?: number
}

export type TGetArticleParam = {
  status?: string
}

/**
 * 一覧取得
 */
export async function getList(params: TGetListParam) {
  const paramStr: URLSearchParams = new URLSearchParams({...params} as string);
  const URL = params ? `${API_URL}blogs?${paramStr}`
                       : `${API_URL}blogs`;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-MICROCMS-API-KEY', API_KEY as string);

  const res = await fetch(URL, {
    headers: requestHeaders,
  });
  const data = await res.json();
  return data.contents;
};

/**
 * 総数取得
 */
 export async function getTotalCount() {
  const param: TGetListParam = {
    fields: 'id',
    limit: 1,
  }
  const paramStr = new URLSearchParams({...param} as string);
  const URL = `${API_URL}blogs?${paramStr}`;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-MICROCMS-API-KEY', API_KEY as string);

  const res = await fetch(URL, {
    headers: requestHeaders,
  });
  const data = await res.json();
  return data.totalCount;
};

/**
 * ページネーションの表示用リスト max なし
 * @returns [number] // [1, 2, 3, 4]
 */
 export async function getPagenationList() {
  const postsTotalCount = await getTotalCount();
  const start = 1;
  const end = Math.ceil(postsTotalCount / PAGE_LIMIT);

  const list = [...Array(end - start + 1)].map((_, i) => start + i);

  return list;
}

/**
 * 個別記事取得
 */
 export async function getArticle(id: string, params?: TGetArticleParam) {
  const paramStr = new URLSearchParams(params);
  const URL = params ? `${API_URL}blogs/${id}?${paramStr}`
                     : `${API_URL}blogs/${id}`;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-MICROCMS-API-KEY', API_KEY as string);

  const res = await fetch(URL, {
    headers: requestHeaders,
  });

  return await res.json();
};
