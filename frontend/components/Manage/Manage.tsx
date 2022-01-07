import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Item, useItemsQuery, useCountItemsQuery, OrderByItemName, OrderType } from '../../generated';
import { useUserData } from '../../hooks/AppContext';
import { perPage } from '../../config';
import PageInfo from '../PageInfo/PageInfo';
import Pagination from '../Pagination/Pagination';
import Table from '../styles/Table';
import SearchItem from './SearchItem';
import { AddItem } from './ManageStyles';
import Spinner from '../Spinner/Spinner';
import StoreItem from './StoreItem';
import { IPage } from '../../pages/item';

const Manage = ({ page }: IPage['query']) => {
	const [items, setItems] = useState<Item[]>([]);
	const [searchResult, setSearchResult] = useState([]);
	const userData = useUserData();
	const router = useRouter();
	const { data: CountItemsPayload } = useCountItemsQuery({
		fetchPolicy: 'network-only'
	});
	const { data: itemsData, loading } = useItemsQuery({
		fetchPolicy: 'network-only',
		variables: {
			input: {
				skip: parseFloat(page) * perPage - perPage,
				take: perPage,
				orderByItemName: 'createdAt' as OrderByItemName,
				orderType: 'desc' as OrderType
			}
		}
	});

	useEffect(() => {
		if (itemsData !== undefined && itemsData.items) {
			setItems(itemsData.items as Item[]);
		}
	}, [itemsData, loading]);

	if (userData?.loading) return <Spinner spacing='200px' />;

	const itemsFound = CountItemsPayload && CountItemsPayload.countItems && CountItemsPayload.countItems.itemsFound
	const permissions = userData && userData.data && userData.data.me && userData.data.me.permissions
	const admin = permissions && permissions.length > 1;

	return (
		<>
			<Head>
				<title>iShop | Manage </title>
			</Head>
			<PageInfo
				message1='Manage'
				message2={`   
        ${!admin
						? `Sorry, you don't have permission to manage store`
						: `${itemsFound} ${itemsFound === 0 || itemsFound === 1 ? 'item' : 'items'} in  store`}`
				}
			/>

			<AddItem>
				<Link href={`${!admin ? '#' : '/add'}`}>
					<a>
						<i className='fas fa-plus'></i> Add an Item
					</a>
				</Link>
			</AddItem>

			<SearchItem setItems={(items) => setSearchResult(items as any)} />

			<Table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Name</th>
						<th>Amount</th>
						<th>Update</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{searchResult.length !== 0 ? (
						<>
							{searchResult.map((item: Item) => (
								<StoreItem key={item.id} admin={admin} {...item} />
							))}
						</>
					) : (
						<>
							{items.map((item: Item) => (
								<StoreItem key={item.id} admin={admin} {...item} />
							))}
						</>
					)}
				</tbody>
			</Table>
			{searchResult && <div style={{ marginBottom: 40 }} />}
			{searchResult.length === 0 && !loading && (
				<Pagination
					page={parseFloat(page)}
					itemsCount={itemsFound as number}
					pathname={router.pathname}
					perPage={perPage}
					collection='Items'
				/>
			)}
		</>
	);
};

export default Manage;
