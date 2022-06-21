import { getArticle } from '@/lib/api.ts';

const exitPreview = async (req, res) => {
  const id = req.query.id;
  const params = {
    fields: 'id',
  }
  const content = await getArticle(id, params);

  res.clearPreviewData();
  res.writeHead(307, { Location: content ? `/posts/${content.id}` : "/" });
  res.end();
};

export default exitPreview;
