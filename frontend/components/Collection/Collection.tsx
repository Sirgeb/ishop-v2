import React from 'react';
import { Category, OrderByItemName, OrderType, useItemsQuery } from '../../generated';
import { useUserData } from '../../hooks/AppContext';
import formatText from '../../lib/formatText';
import PageInfo from '../PageInfo/PageInfo';
import CollectionHeader from './CollectionHeader/CollectionHeader';
import CollectionCard from './CollectionCard/CollectionCard';
import Spinner from '../Spinner/Spinner';

import CollectionStyles from './CollectionStyles';
import { getCollectionCategory } from '../../lib/func';
import { perPage } from '../../config';

export type ICollection = {
  collectionName: string;
  pageLink?: string;
  onCollectionPreview: boolean;
  skip?: number;
  itemsCount?: number;
}

const Collection = ({ collectionName, pageLink, onCollectionPreview, skip, itemsCount }: ICollection) => {
  const userData = useUserData();
  const { data: collectionData } = useItemsQuery({
    variables: {
      input: {
        category: getCollectionCategory(collectionName) as Category,
        orderByItemName: 'createdAt' as OrderByItemName,
        orderType: 'desc' as OrderType,
        take: perPage,
        skip: !!skip ? skip : undefined
      }
    }
  })

  if (userData?.loading) return <Spinner spacing="200px" />;

  return (
    <>
      {
        !onCollectionPreview && (
          <PageInfo
            message1={` ${formatText(itemsCount as number, collectionName)} `}
          />
        )
      }

      {
        onCollectionPreview && (
          <CollectionHeader
            collectionName={collectionName}
            pageLink={pageLink as string}
          />
        )
      }

      <CollectionStyles>
        <div className="collection-items">
          {
            collectionData && collectionData.items.map(item => (
              <CollectionCard
                {...item}
                key={item.id}
                onCollectionPreview={onCollectionPreview}
              />
            ))
          }
        </div>
      </CollectionStyles>
    </>
  )
}

export default Collection;
