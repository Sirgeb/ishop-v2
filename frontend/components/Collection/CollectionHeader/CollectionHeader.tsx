import React from 'react';
import Link from 'next/link';

import CollectionHeaderStyles from './CollectionHeaderStyles';
import formatText from '../../../lib/formatText';

export type ICollectionHeader = {
  currentItems: any
  collectionName: string;
  pageLink: string;
}

const CollectionHeader = ({ currentItems, collectionName, pageLink }: ICollectionHeader) => {

  return (
    <CollectionHeaderStyles>
      <div className="collection-info">
        {collectionName} | {formatText(currentItems.length, collectionName)}
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
