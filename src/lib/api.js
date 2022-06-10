export const API_URL = process.env.API_URL;
export const API_KEY = process.env.API_KEY;

/**
 * 一覧取得
 */
export async function getList(params) {
  const paramStr = new URLSearchParams(params);
  const URL = params ? `${API_URL}blogs?${paramStr}`
                       : `${API_URL}blogs`;

  const res = await fetch(URL, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  });
  const data = await res.json();
  return data.contents;
};

/**
 * 総数取得
 */
 export async function getTotalCount() {
  const param = {
    fields: 'id',
    limit: 1,
  }
  const paramStr = new URLSearchParams(param);
  const URL = `${API_URL}blogs?${paramStr}`;

  const res = await fetch(URL, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  });
  const data = await res.json();
  return data.totalCount;
};

/**
 * ページネーションの表示用リスト max なし
 * @returns [number] // [1, 2, 3, 4]
 */
 export const pageLimit = 3;
 export async function getPagenationList() {
  const postsTotalCount = await getTotalCount();
  const start = 1;
  const end = Math.ceil(postsTotalCount / pageLimit);

  const list = [...Array(end - start + 1)].map((_, i) => start + i);

  return list;
}

/**
 * 個別記事取得
 */
 export async function getArticle(id, params) {
  const paramStr = new URLSearchParams(params);
  const URL = params ? `${API_URL}blogs/${id}?${paramStr}`
                     : `${API_URL}blogs/${id}`;

  const res = await fetch(URL, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  });

  return await res.json();
};
