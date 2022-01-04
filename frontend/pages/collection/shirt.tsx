import { useRouter } from 'next/router';

import { Category, useItemsQuery } from '../../generated';
import Collection from '../../components/Collection/Collection';
import { perPage } from '../../config';
import Pagination from '../../components/Pagination/Pagination';
import { IPage } from '../item';

const Bag = ({ query }: IPage) => {
  const router = useRouter();
  const { data } = useItemsQuery({
    variables: {
      input: {
        category: 'SHIRT' as Category
      }
    }
  })

  const noOfItems = data && data.items && data.items.length;

  return (
    <>
      <Collection
        itemsCount={noOfItems}
        collectionName="Shirt"
        onCollectionPreview={false}
        skip={parseFloat(query.page) * perPage - perPage}
      />

      <Pagination
        itemsCount={noOfItems}
        page={parseFloat(query.page) || 1}
        pathname={router.pathname}
        perPage={perPage}
        collection="Shirt"
      />
    </>
  );
}

export default Bag;
