import React from 'react';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';
import { CartItem, useCreateOrderMutation } from '../../generated';
import calcTotalPrice from '../../lib/calcTotalPrice';
import { ME_QUERY } from '../../graphql/queries/user';
import { useUserData } from '../../hooks/AppContext';

function totalItems(cartItems: CartItem[]) {
	return cartItems.reduce((prev, CartItem) => prev + CartItem.quantity, 0);
}

const PayNow = ({ children }: any) => {
	const [createOrder] = useCreateOrderMutation({
		refetchQueries: [{ query: ME_QUERY }]
	});
	const userData = useUserData();
	const me = userData && userData.data && userData.data.me;
	const cartItems = userData && userData.data && userData.data.me && userData.data.me.cartItems;

	const onToken = async (res: any) => {
		NProgress.start();
		await createOrder({
			variables: {
				input: {
					token: res.id
				}
			},
			onCompleted: (data) => {
				Router.push({
					pathname: '/orders',
					query: { id: data.createOrder.id },
				});
			}
		}).catch((err) => {
			alert(err.message);
		});
	};

	return (
		<StripeCheckout
			amount={calcTotalPrice(cartItems as CartItem[])}
			name='iShop'
			description={`Order of ${totalItems(cartItems as CartItem[])} items!`}
			image='/static/images/ishop-logo.png'
			stripeKey='pk_test_PpqRppBfT0qweVIJGKfqpqvp'
			currency='USD'
			email={me?.email}
			token={(res) => onToken(res)}
		>
			{children}
		</StripeCheckout>
	);
};

export default PayNow;
