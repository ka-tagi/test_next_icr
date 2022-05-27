export const API_URL = process.env.API_URL;
export const API_KEY = process.env.API_KEY;

// preview データ取得
export default async(req, res) => {
  // req.query.slug は記事 id が渡ってくる
  if (!req.query.slug) {
    return res.status(404).end();
  }

  const url = `${API_URL}blogs/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`;

  const previewRes = await fetch(url,
    { headers: { 'X-MICROCMS-API-KEY': API_KEY } }
  );
  const content = previewRes.json();

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/posts/${content.id}` });
  res.end('Preview mode enabled');
};
