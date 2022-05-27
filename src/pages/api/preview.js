import { getArticle } from '@/lib/api.js';

export const API_URL = process.env.API_URL;
export const API_KEY = process.env.API_KEY;

// preview データ取得
 const preview = async(req, res) => {
  // req.query.slug は記事 id が渡ってくる
  if (!req.query.slug) {
    return res.status(404).end();
  }

  const url = `${API_URL}blogs/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`;

  const params = {
    fields: 'id',
    draftKey: req.query.draftKey,
  }

  const content = await getArticle(req.query.slug, params);

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData(
    {
      draftKey: req.query.draftKey,
    },
    {
      maxAge: 60 * 30, // プレビューモードのCookieの期限を30分にする
    },
  );
  res.writeHead(307, { Location: `/posts/${content.id}` });
  res.end('Preview mode enabled');
};

export default preview;
