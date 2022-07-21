// components ------------------------------------------
import Link from 'next/link';
import { TArticle } from '@/@types/article';

// template --------------------------------------------
const ArticleList = ({ posts }: { posts: TArticle[] }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
