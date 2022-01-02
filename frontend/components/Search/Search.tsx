import React from 'react';
import { ApolloConsumer } from '@apollo/client';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';

import { DropDown, DropDownItem, SearchStyles } from './SearchStyles';
import formatMoney from '../../lib/formatMoney';
import formatLetters from '../../lib/formatLetters';
import { SEARCH_ITEMS_QUERY } from '../../graphql/queries/item';
import { Item } from '../../generated';

function routeToItem(item: { id: string }) {
	Router.push({
		pathname: '/item',
		query: {
			id: item.id,
		},
	});
}

class Search extends React.Component {
	state = {
		items: [] as Item[],
		loading: false,
	};

	onChange = debounce(async (e, client) => {
		let keyword = e.target.value.trim();

		const res = await client.query({
			query: SEARCH_ITEMS_QUERY,
			variables: {
				input: {
					searchTerm: keyword
				}
			},
		});

		this.setState({
			items: res.data.searchItems,
		});
	}, 100);

	render() {
		resetIdCounter();
		return (
			<SearchStyles>
				<Downshift
					onChange={routeToItem}
					itemToString={(item) => (item === null ? '' : '')}
				>
					{({
						getInputProps,
						getItemProps,
						isOpen,
						inputValue,
						highlightedIndex,
					}) => (
						<div>
							<ApolloConsumer>
								{(client) => (
									<input
										{...getInputProps({
											type: 'search',
											placeholder: 'What do you want to buy?',
											className: this.state.loading ? 'loading' : '',
											onChange: (e) => {
												e.persist();
												this.onChange(e, client);
											},
										})}
									/>
								)}
							</ApolloConsumer>
							{isOpen && (
								<DropDown>
									{this.state.items.map((item, index) => (
										<DropDownItem
											{...getItemProps({ item })}
											key={item.id}
											highlighted={index === highlightedIndex}
										>
											<div className='img-text'>
												<img width='50' src={item.image1} alt={item.itemName} />
												<span>{formatLetters(item.itemName)}</span>
											</div>
											<span>{formatMoney(item.newPrice)}</span>
										</DropDownItem>
									))}
									{!this.state.items.length && !this.state.loading && (
										<DropDownItem>Nothing Found for {inputValue}</DropDownItem>
									)}
								</DropDown>
							)}
						</div>
					)}
				</Downshift>
			</SearchStyles>
		);
	}
}

export default Search;
