import Link from 'next/link';
import { usePagenation } from './hooks';

import styles from './styles.module.scss';

// template --------------------------------------------
const Pagination = ({ pageList }) => {
  const paginationData = usePagenation(pageList);

  return (
    <ul className={styles.pagination}>
    {paginationData.pages.map((page) => (
      <li key={page}>
        [
        <Link href={`/posts/pages/${page}`}>
          <a>{page}</a>
        </Link>
        ]
      </li>
    ))}
    </ul>
  );
}

export default Pagination;
