import { getArticle } from '@/lib/api.js';

const exitPreview = async (req, res) => {
  const id = toStringId(req.query.id);
  const params = {
    fields: 'id',
  }
  const content = await getArticle(id, params);

  res.clearPreviewData();
  res.writeHead(307, { Location: content ? `/blogs/${content.id}` : "/" });
  res.end();
};

export default exitPreview;
