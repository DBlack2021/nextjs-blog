import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout/Layout'
import PaginatedList from '../components/PaginatedList'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/Date/Date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd} style={{ textAlign: 'center' }}>
        <p>I'm Dylan, a high school student a developer from Tinton Falls, NJ. I write about programming, design, education, and anything else that comes to mind.</p>
      </section>
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingLg}>Blog Posts</h1>
        <ul className={utilStyles.list}>
          <PaginatedList itemsPerPage={5}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </PaginatedList>
        </ul>
      </section>
    </Layout>
  )
}