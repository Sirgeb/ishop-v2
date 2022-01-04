import React from 'react';
import Link from 'next/link';
import { OrderByItemName, OrderType, useItemsQuery } from '../../generated';
import IncredibleOfferStyles from './IncredibleOfferStyles';
import IncredibleOfferButtonLink from './IncredibleOfferButtonLink';
import formatMoney from '../../lib/formatMoney';
import formatLetters from '../../lib/formatLetters';
import PageInfo from '../PageInfo/PageInfo';
import Spinner from '../Spinner/Spinner';

interface IIncredibleOffer {
  spacing?: string;
  skip?: number;
  itemsCount?: number | undefined;
  onCollectionPreview: boolean;
  collectionName: string;
}

const IncredibleOffer = ({ onCollectionPreview, spacing, skip, collectionName, itemsCount }: IIncredibleOffer) => {
  const { data, loading } = useItemsQuery({
    variables: {
      input: {
        discountPercent_gt: 15,
        take: 4,
        skip,
        orderByItemName: 'createdAt' as OrderByItemName,
        orderType: 'desc' as OrderType
      }
    }
  })

  if (loading) return <Spinner spacing={spacing} />;

  return (
    <>
      {
        !onCollectionPreview && (
          <PageInfo
            message1={collectionName}
            message2={`We have ${itemsCount} items for you`}
          />
        )
      }

      <IncredibleOfferStyles>
        {
          data && data.items.map((item) => (
            <Link href={{ pathname: '/item', query: { id: item.id } }} key={item.id}>
              <a>
                <div className="card">
                  <div className="image-box">
                    <img src={item.image1} alt={item.itemName} />
                  </div>
                  <div className="content">
                    <div className="discount-percent">{item.discountPercent}% discount</div>
                    <div className="item-name">{formatLetters(item.itemName)}</div>
                    <div className="amount"><s>{formatMoney(item.amount)}</s></div>
                    <div className="discount-amount">{formatMoney(item.newPrice)}</div>
                  </div>
                </div>
              </a>
            </Link>
          ))
        }
      </IncredibleOfferStyles>

      {
        onCollectionPreview && (
          <IncredibleOfferButtonLink />
        )
      }
    </>
  )
}

export default IncredibleOffer;
