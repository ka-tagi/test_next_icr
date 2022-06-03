// components ------------------------------------------
import Link from 'next/link';

// template --------------------------------------------
const ArticleList = ({posts}) => {
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
