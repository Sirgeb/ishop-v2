import React from 'react';
import { useAddItemToCartMutation } from '../../generated';
import { ME_QUERY } from '../../graphql/queries/user';
import formatError from '../../lib/formatError';
interface IProps {
	id: string | null | undefined
}

const AddToCart = ({ id }: IProps) => {
	const [addItemToCart, { loading }] = useAddItemToCartMutation({
		refetchQueries: [{ query: ME_QUERY }]
	});

	return (
		<button
			title='Add to Cart'
			className='add-to-cart btn'
			onClick={async () => {
				await addItemToCart({
					variables: {
						input: {
							itemId: id as string,
						},
					},
				}).catch((err) => alert(formatError(err.toString())));
			}}
			disabled={loading}
		>
			Add{loading ? 'ing ' : ' '}To Cart
		</button>
	);
};

export default AddToCart;
