import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './PaginationStyles';

interface IPagination {
  perPage: number;
  collection: string;
  page: number;
  pathname: string;
  itemsCount: number | undefined;
}

const Pagination = ({ perPage, collection, page, pathname, itemsCount }: IPagination) => {
  const pages = Math.ceil(itemsCount as number / perPage);

  return (
    <>
      <Head>
        <title>iShop! {collection} ~ Page {page} of {pages}</title>
      </Head>
      <PaginationStyles>
        <div className="wrap">
          <Link href={{
            pathname: pathname,
            query: { page: page - 1 }
          }}>
            <a className="prev" aria-disabled={page <= 1}>← Prev</a>
          </Link>
          <p className="page-number">
            Page {page} of {pages}
          </p>
          <Link href={{
            pathname: pathname,
            query: { page: page + 1 }
          }}>
            <a className="next" aria-disabled={page >= pages}>Next →</a>
          </Link>
        </div>
      </PaginationStyles>
    </>
  )
}

export default Pagination;
