// components ------------------------------------------
import ArticleList from '@/components/oganisms/article-list/index.js';
import Pagination from '@/components/oganisms/pagination/index.js';

// template --------------------------------------------
const PaginationTemplate = ({posts, paginations}) => {
  return (
    <div>
      <ArticleList posts={posts} />
      <Pagination pageList={paginations} />
    </div>
  );
}

export default PaginationTemplate;
