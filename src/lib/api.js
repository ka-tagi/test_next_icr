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
 * 一覧取得
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
