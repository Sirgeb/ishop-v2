import React from 'react';
import Head from 'next/head';

import { useUserData } from '../../hooks/AppContext';
import PageInfo from '../PageInfo/PageInfo';
import Checkout from './Checkout/Checkout';
import Table from '../styles/Table';
import Spinner from '../Spinner/Spinner';
import formatMoney from '../../lib/formatMoney';
import formatLetters from '../../lib/formatLetters';
import RemoveFromCart from './RemoveFromCart';
import IncreaseItem from './IncreaseItem';
import DecreaseItem from './DecreaseItem';

const Cart = () => {
  const userData = useUserData();
  const cartItems = userData && userData.data && userData.data.me && userData.data.me.cartItems;

  if (userData?.loading) {
    return <Spinner spacing="200px" />;
  }

  return (
    <>
      <Head>
        <title>iShop | Shopping Cart </title>
      </Head>

      <PageInfo
        message1={"Shopping Cart"}
        message2={`
          You have ${cartItems && cartItems.length} 
          ${cartItems && cartItems.length === 0 || cartItems && cartItems.length === 1 ? "item" : "items"} 
          in your cart`
        }
      />
      {
        cartItems && cartItems.length === 0 ?
          <div className="center">
            {
              //@ts-ignore
              <lottie-player
                src="https://assets2.lottiefiles.com/temp/lf20_jzqS18.json"
                background="transparent"
                speed="1"
                style={{ width: "250px", height: "250px" }}
                loop
                autoplay
              />
            }
          </div>
          :
          <>
            <Table>
              <thead>
                <tr>
                  <th>Remove</th>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItems && cartItems.map(cartItem => {
                    if (!cartItem.item) return <tr>
                      <td><RemoveFromCart id={cartItem.id} /></td>
                      <td colSpan={4} style={{ fontSize: 20 }}>This item has been removed</td>
                    </tr>
                    return (
                      <tr key={cartItem.id}>
                        <td><RemoveFromCart id={cartItem.id} /></td>
                        <td>
                          <img src={cartItem.item.image1} />
                        </td>
                        <td> {formatLetters(cartItem.item.itemName)} </td>
                        <td>
                          <div className="cell-content-wrapper">
                            <DecreaseItem id={cartItem.item.id} /> <button>{cartItem.quantity}</button> <IncreaseItem id={cartItem.item.id} />
                          </div>
                        </td>
                        <td>{formatMoney(cartItem.item.newPrice)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <Checkout cartItems={cartItems as any} />
          </>
      }
    </>
  )
}

export default Cart;
