import { getList } from '@/lib/api.js';

// components ------------------------------------------
import Link from 'next/link'

// contents ------------------------------------------
// import { OG_IMAGE_URL, SITE_URL } from '~/constants/common';

export async function getStaticProps() {
  const posts = await getList();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

// container ------------------------------------------
const ArticleIndex = ({posts}) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleIndex;
