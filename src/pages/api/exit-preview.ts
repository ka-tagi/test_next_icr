import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticle, TGetArticleParam } from '@/lib/api';

const exitPreview = async (
  req: NextApiRequest,
  res: NextApiResponse,
  ) => {
  const id: string = req.query.id as string;
  const params: TGetArticleParam = {
    fields: 'id',
  }
  const content = await getArticle(id, params);

  res.clearPreviewData();
  res.writeHead(307, { Location: content ? `/posts/${content.id}` : "/" });
  res.end();
};

export default exitPreview;
