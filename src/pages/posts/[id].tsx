import { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticPropsContext} from 'next';
import { getList, getArticle, TGetListParam, TGetArticleParam} from '@/lib/api';

import { TArticle } from '@/@types/article';
import { isDraft } from '@/@types/isDraft';


// components ------------------------------------------
import ArticleTemplate from '@/components/templates/article-template';

// contents ------------------------------------------
type TProps = InferGetStaticPropsType<typeof getStaticProps>;

// パスの生成
export const getStaticPaths: GetStaticPaths = async () => {
  const param: TGetListParam = {
    limit: 100,
    offset: 0,
    fields: 'id'
  }
  const postIds: TArticle[] = await getList(param);

  return {
    paths: postIds.map((post: TArticle) => `/posts/${post.id}`) || [],
    fallback: true,
  }
}

// コンテンツデータ取得
export const getStaticProps = async (context: GetStaticPropsContext<{ id: string}>) => {
  const propsData = JSON.stringify(context);
  const previewData = context.previewData;
  const draftKey = isDraft(previewData) ?  { draftKey: previewData.draftKey } : {};

  console.log(`context: ${propsData}`);
  const isPreviewMode = (context.preview && draftKey) || false;
  // console.log(`isPreviewMode: ${isPreviewMode}`);

  const id = context.params!.id;
  let params: TGetArticleParam | null = null;
  if (isPreviewMode) {
    params = {
      draftKey: draftKey as string,
    }
  }

  const post = await getArticle(id, params);
  post.console = propsData;
  post.isPreview = isPreviewMode;

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

// container ------------------------------------------
const Article: NextPage<TProps> = ({post}) => {
  if (!post || !post.title) {
    return <div>ページデータがないよ</div>
  }

  return (
    <ArticleTemplate
      post={post}
    />
  );
};

export default Article;
