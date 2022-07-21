import Link from 'next/link';
import { usePagenation } from './hooks';
import { TPaginationLinkList, TdisplayPagenation } from '@/@types/pagenation';

import styles from './styles.module.scss';

// template --------------------------------------------
const Pagination = ({ pageList }: { pageList: TPaginationLinkList }) => {
  const paginationData: TdisplayPagenation = usePagenation(pageList);
  const lastPage = paginationData.pages[paginationData.pages.length - 1];

  return (
    <nav className={ styles.pagination }>
      <div className={ styles.first }>
        <Link href='/posts/'><a>&lt;&lt;</a></Link>
      </div>
      {paginationData.isCurrent -1 > 0
        ?
        <div className={ styles.prev}>
          <Link href={ paginationData.isCurrent === 2
            ? `/posts/`: `/posts/pages/${paginationData.isCurrent - 1}`
          }><a>&lt;</a></Link>
        </div>
        :
        <div className={ styles.prev0 }>
          <Link href={`/posts/`}><a>&lt;</a></Link>
        </div>
      }


      <ul className={styles.paginationUl}>
      {paginationData.pages.map((page) => (
        <li key={page}>
          [
          {paginationData.isCurrent === page
            ?
            <span className={styles.isCurrent}>{paginationData.isCurrent}</span>
            :
            <Link href={ page === 1 ? `/posts/` : `/posts/pages/${page}`}>
              <a>{page}</a>
            </Link>
          }
          ]
        </li>
      ))}
      </ul>

      <div className={paginationData.isCurrent < lastPage ? styles.next : styles.next0}>
        <Link href={`/posts/pages/${paginationData.isCurrent + 1}`}><a>&gt;</a></Link>
      </div>
      <div className={styles.last}>
        <Link href={`/posts/pages/${lastPage}`}><a>&gt;&gt;</a></Link>
      </div>
    </nav>
  );
}

export default Pagination;
