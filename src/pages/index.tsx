// components ------------------------------------------
import type { NextPage } from 'next'
import Link from 'next/link';

// template --------------------------------------------

const Home: NextPage = () => {
  return (
    <div>
      <h1>next.js 検証</h1>
      <Link href='/posts'>
        ・記事一覧ページ
      </Link>
    </div>
  )
}

export default Home;
