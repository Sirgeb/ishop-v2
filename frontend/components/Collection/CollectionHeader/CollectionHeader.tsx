import React from 'react';
import Link from 'next/link';
import { Category, useItemsQuery } from '../../../generated';

import CollectionHeaderStyles from './CollectionHeaderStyles';
import formatText from '../../../lib/formatText';
import { getCollectionCategory } from '../../../lib/func';

interface ICollectionHeader {
  collectionName: string;
  pageLink: string;
}

const CollectionHeader = ({ collectionName, pageLink }: ICollectionHeader) => {
  const { data } = useItemsQuery({
    variables: {
      input: {
        category: getCollectionCategory(collectionName) as Category
      }
    }
  })

  const itemsCount = data && data.items && data.items.length;

  return (
    <CollectionHeaderStyles>
      <div className="collection-info">
        {collectionName} | {formatText(itemsCount as number, collectionName)}
      </div>
      <button>
        <Link href={pageLink}>
          <a>
            See All &#8594;
          </a>
        </Link>
      </button>
    </CollectionHeaderStyles>
  )
}

export default CollectionHeader;
