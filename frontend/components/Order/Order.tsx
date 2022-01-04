import React from 'react';
import moment from 'moment';
import Head from 'next/head';

import formatMoney from '../../lib/formatMoney';
import formatLetters from '../../lib/formatLetters';
import PageInfo from '../PageInfo/PageInfo';
import Spinner from '../Spinner/Spinner';

import OrderStyles from './OrderStyles';
import { useUserData } from '../../hooks/AppContext';

const Order = () => {
  const userData = useUserData();
  const orders = userData && userData.data && userData.data.me && userData.data.me.orders;

  if (userData?.loading) return <Spinner spacing="200px" />

  return (
    <>
      <Head>
        <title>iShop | Orders </title>
      </Head>

      <PageInfo
        message1="Orders"
        message2={`You have made ${orders?.length} ${orders?.length === 0 || orders?.length === 1 ? 'Order' : 'Orders'}`}
      />
      {
        orders?.length === 0 ?
          <div className="center">
            {
              //@ts-ignore
              <lottie-player
                src="https://assets8.lottiefiles.com/temp/lf20_Celp8h.json"
                background="transparent"
                speed="1"
                style={{ width: "250px", height: "250px" }}
                loop
                autoplay
              />
            }
          </div>
          :
          <OrderStyles>
            {
              orders && orders.map(order => (
                <div className="accordion-wrapper" key={order.id}>
                  <input id={order.id} name="myaccordion" type="checkbox" />
                  <label htmlFor={order.id}>
                    <strong>•</strong> {moment(order.createdAt).add(24, 'hours').format('LLL')}
                  </label>
                  <div className="insidecontainer">
                    <p>
                      <span> Order ID: {order.id} </span>
                      <span> No of Items: {order.orderItems.length} </span>
                      <span> Grand Total: {formatMoney(order.total)} </span>
                    </p>
                    <div className="items-wrapper">
                      {
                        order && order.orderItems.map(item => (
                          <div className="item" key={item.id}>
                            <img src={item.image1} alt={item.itemName} width="100" height="100" />
                            <div className="item-details">
                              <span>Name: {formatLetters(item.itemName)}</span>
                              <span>Quantity: {item.quantity}</span>
                            </div>
                            <div className="item-details">
                              <span>| Each: {formatMoney(item.newPrice)}</span>
                              <span>| Sub Total: {formatMoney(item.newPrice * item.quantity)}</span>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </OrderStyles>
      }
    </>
  )
};

export default Order;
