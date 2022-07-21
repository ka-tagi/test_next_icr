// components ------------------------------------------
import type { NextPage } from 'next'
import Link from 'next/link';

// template --------------------------------------------

const Home: NextPage = () => {
  return (
    <div>
      <h1>next.js 検証</h1>
      <Link href='/posts'>
        <a>・記事一覧ページ</a>
      </Link>
    </div>
  )
}

export default Home;
