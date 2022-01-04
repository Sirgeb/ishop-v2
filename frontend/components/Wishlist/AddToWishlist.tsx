import React from 'react';
import { useAddItemToWishlistMutation } from '../../generated';
import { ME_QUERY } from '../../graphql/queries/user';
import { useUserData } from '../../hooks/AppContext';
import formatError from '../../lib/formatError';
interface IProps {
	id: string | null | undefined
}

const AddToWishList = ({ id }: IProps) => {
	const [addItemToWishlist, { loading }] = useAddItemToWishlistMutation({ refetchQueries: [{ query: ME_QUERY }] });
	const userData = useUserData();
	const wishlistItems = userData && userData.data && userData.data.me && userData.data.me.wishlistItems;
	let active = false;

	return (
		<button
			title='Add To Wishlist'
			className={`add-to-wishlist btn`}
			onClick={async () => {
				return addItemToWishlist({
					variables: {
						input: {
							itemId: id as string
						}
					}
				}).catch((err) =>
					alert(formatError(err.toString()))
				);
			}}
			disabled={loading}
		>
			{wishlistItems && (
				<>
					{wishlistItems.map((wishListItem) => {
						if (wishListItem.item.id.includes(id as string)) {
							return (
								<div key={wishListItem.item.id}>
									{(active = true)}
									{loading ? (
										<i className='fas fa-circle-notch fa-spin icon'></i>
									) : (
										<i className='fas fa-heart icon active'></i>
									)}
								</div>
							);
						}
					})}
				</>
			)}
			{!active &&
				(loading ? (
					<i className='fas fa-circle-notch fa-spin icon'></i>
				) : (
					<i className='fas fa-heart icon' key={id}></i>
				))}
		</button>
	);
};

export default AddToWishList;
