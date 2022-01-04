import Head from 'next/head';
import Link from 'next/link';

import { useItemQuery } from '../../generated';
import { useUserData } from '../../hooks/AppContext';
import ItemStyles from './ItemStyles';
import PageInfo from '../PageInfo/PageInfo';
import Spinner from '../Spinner/Spinner';
import formatMoney from '../../lib/formatMoney';
import formatLetters from '../../lib/formatLetters';
import AddToCart from '../Cart/AddToCart';
import AddToWishlist from '../Wishlist/AddToWishlist';

export type IItem = {
  id: string;
}

const Item = ({ id: itemId }: IItem) => {
  const userData = useUserData();
  const { data: itemData } = useItemQuery({
    variables: {
      where: {
        itemId
      }
    }
  })

  if (userData?.loading) return <Spinner spacing="200px" />;

  const item = itemData && itemData.item;
  const me = userData && userData.data && userData.data.me;

  return (
    <>
      <Head>
        <title>iShop | {formatLetters(item?.itemName)}</title>
      </Head>
      <PageInfo message1={formatLetters(item?.itemName)} message2="" />
      <ItemStyles>
        <div className="item">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={item?.image1} alt={item?.itemName} />
              </div>
              <div className="flip-card-back">
                <img
                  src={item?.image2 ? item.image2 : item?.image1}
                  //@ts-ignore
                  alt={item?.itemName}
                />
              </div>
            </div>
          </div>
          <ul>
            <li><button>{formatMoney(item?.newPrice)}</button></li>
            <li><AddToCart id={item?.id} /></li>
            <li><AddToWishlist id={item?.id} /></li>
            <li>
              <Link href="/cart">
                <a>
                  <button disabled={!me && true}>Checkout →</button>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <h2>Product Description</h2>
          <p>
            {item?.description}
          </p>
        </div>
      </ItemStyles>
    </>
  )
}

export default Item;
