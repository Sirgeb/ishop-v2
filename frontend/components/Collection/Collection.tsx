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

export type ICollection = {
  collectionName: string;
  pageLink: string;
  onCollectionPreview: boolean;
}

const Collection = ({ collectionName, pageLink, onCollectionPreview }: ICollection) => {
  const userData = useUserData();
  const { data: collectionData } = useItemsQuery({
    variables: {
      input: {
        category: getCollectionCategory(collectionName) as Category,
        orderByItemName: 'createdAt' as OrderByItemName,
        orderType: 'desc' as OrderType,
        take: 5
      }
    }
  })

  if (userData?.data === undefined) return null;
  if (userData.loading) return <Spinner spacing="200px" />;

  return (
    <>
      {
        !onCollectionPreview && (
          <PageInfo
            message1={` ${formatText(collectionData !== undefined && collectionData.items.length, collectionName)} `}
          />
        )
      }

      {
        onCollectionPreview && (
          <CollectionHeader
            currentItems={collectionData && collectionData.items}
            collectionName={collectionName}
            pageLink={pageLink}
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
