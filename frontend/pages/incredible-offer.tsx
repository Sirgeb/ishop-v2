import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

import Pagination from '../components/Pagination/Pagination';
import IncredibleOfferComponent from '../components/IncredibleOffer/IncredibleOffer';
import { OrderByItemName, OrderType, useItemsQuery } from '../generated';

const perPage = 4;

const IncredibleOffer = ({ query }: { query: { page: string } }) => {
  const router = useRouter();
  const { data } = useItemsQuery({
    variables: {
      input: {
        discountPercent_gt: 15,
        orderByItemName: 'createdAt' as OrderByItemName,
        orderType: 'desc' as OrderType
      }
    }
  });
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const noOfItems = data && data.items && data.items.length;

  return (
    <>
      <IncredibleOfferComponent
        itemsCount={noOfItems}
        collectionName="Incredible Offer"
        skip={parseFloat(query.page) * perPage - perPage}
        onCollectionPreview={false}
        spacing="200px"
      />

      <Pagination
        itemsCount={noOfItems}
        page={parseFloat(query.page) || 1}
        pathname={router.pathname}
        perPage={perPage}
        collection="Incredible Offer"
      />
    </>
  )
}

export default IncredibleOffer;
