import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import PageInfo from '../PageInfo/PageInfo';
import { useUserData } from '../../hooks/AppContext';
import formatMoney from '../../lib/formatMoney';
import formatLetters from '../../lib/formatLetters';
import Spinner from '../Spinner/Spinner';
import AddWishlistItemToCart from './MoveWishlistItemToCart';

import WishlistStyles from './WishlistStyles';
import { WishlistItem } from '../../generated';

const Wishlist = () => {
  const userData = useUserData();
  const wishlistItems = userData && userData.data && userData.data.me && userData.data.me.wishlistItems;

  if (userData?.loading) return (
    <>
      <PageInfo message1={"Wishlist"} message2="" />
      <Spinner spacing="200px" />
    </>
  )

  return (
    <>
      <Head>
        <title>iShop | Wishlist</title>
      </Head>

      <PageInfo message1={"Wishlist"}
        message2={
          `You have ${wishlistItems && wishlistItems.length} 
          ${wishlistItems && wishlistItems.length === 0 || wishlistItems && wishlistItems.length === 1 ? "item" : "items"} 
          in your wishlist`
        }
      />
      {
        wishlistItems && wishlistItems.length === 0 ?
          <div className="center">
            {
              //@ts-ignore
              <lottie-player
                src="https://assets7.lottiefiles.com/packages/lf20_8LS0Np.json"
                background="transparent"
                speed="1"
                style={{ width: "250px", height: "250px" }}
                loop
                autoplay
              />
            }
          </div>
          :
          <WishlistStyles>
            <div className="collection-items">
              {
                wishlistItems && wishlistItems.map(wishlistItem => (
                  <div className="collection-card" key={wishlistItem.id}>
                    <div className="card-image-and-amount-wrapper">
                      <Link href={{ pathname: '/item', query: { id: wishlistItem.item.id } }}>
                        <a>
                          <div className="img-box">
                            <img src={wishlistItem.item.image1} alt={wishlistItem.item.itemName} />
                          </div>
                        </a>
                      </Link>
                      <div className="amount">
                        <span>{formatMoney(wishlistItem.item.newPrice)}</span>&nbsp;
                        <s> {formatMoney(wishlistItem.item.amount)} </s>
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="top">
                        <div className="item-name">
                          {formatLetters(wishlistItem.item.itemName)}
                        </div>
                        <AddWishlistItemToCart id={wishlistItem.item.id} wishlistItem={wishlistItem as WishlistItem} />
                      </div>
                      <div className="bottom">
                        <span className="discount-percent">-3%</span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </WishlistStyles>
      }
    </>
  )
}

export default Wishlist;
