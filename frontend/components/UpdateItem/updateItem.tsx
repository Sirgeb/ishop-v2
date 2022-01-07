import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import PageInfo from '../PageInfo/PageInfo';
import Spinner from '../Spinner/Spinner';
import formatError from '../../lib/formatError';
import Form from '../styles/Form';
import { useItemQuery, useUpdateItemMutation } from '../../generated';
import { ITEMS } from '../../graphql/queries/item';

type Item = {
  itemName: string;
  discountPercent: number;
  category: Category;
  image1: string | undefined;
  image2: string | undefined;
  amount: number;
  newPrice: number;
  description: string | undefined;
}

type OldData = {
  item: Item
} | undefined

enum Category {
  BAG = 'BAG',
  SHIRT = 'SHIRT',
  DEVICE = 'DEVICE',
  WRISTWATCH = 'WRISTWATCH',
  SHOE = 'SHOE'
}

const UpdateItem = ({ id }: { id: string }) => {
  const [item, setItem] = useState<Item>({} as Item);
  const [oldData, setOldData] = useState<OldData>(undefined);
  const { data: itemData, loading: isLoading } = useItemQuery({ variables: { where: { itemId: id } } })
  const [updateItem, { data, loading, error }] = useUpdateItemMutation({
    variables: {
      input: {
        ...item as any
      },
      where: {
        itemId: id
      }
    },
    refetchQueries: [{ query: ITEMS }]
  })

  useEffect(() => {
    if (!isLoading && itemData !== undefined) {
      setOldData(itemData as any)
    }
  }, [itemData?.item, isLoading])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value } = event.target;
    const val = type === 'number' ? parseInt(value) : value;

    if (name === 'amount') {
      if (item.discountPercent !== 0) {
        const discountAmount = parseFloat(value) * (item.discountPercent / 100);
        const newPrice = parseFloat(value) - discountAmount;

        setItem((prevState: Item): Item => ({
          ...prevState,
          amount: parseFloat(value),
          newPrice,
          discountPercent: !item.discountPercent ? 0 : item.discountPercent
        }));
      } else {
        setItem((prevState: Item): Item => ({
          ...prevState,
          amount: parseFloat(value),
          newPrice: parseFloat(value),
        }));
      }
    } else if (name === 'discountPercent') {
      const discountAmount = item.amount * (parseFloat(value) / 100);
      const newPrice = item.amount - discountAmount;

      if (item.amount) {
        setItem((prevState: Item): Item => ({
          ...prevState,
          discountPercent: parseInt(value),
          newPrice
        }));
      } else {
        setItem((prevState: Item): Item => ({
          ...prevState,
          discountPercent: parseInt(value),
          newPrice: 0,
          amount: 0
        }));
      }

    } else {
      setItem((prevState: Item): Item => ({
        ...prevState,
        [name]: val,
      }));
    }
  }

  if (isLoading || loading || oldData === undefined) {
    return <Spinner spacing="200px" />
  }

  return (
    <>
      <Head>
        <title>iShop | Update Item </title>
      </Head>
      <PageInfo
        message1="Update Item"
        message2={error && formatError(error && error.message) || data && "Updated Successfully"}
      />

      <Form
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          await updateItem();
        }}
      >
        <input
          type="text"
          name="itemName"
          onChange={handleChange}
          value={(item.itemName && item.itemName) || oldData.item?.itemName}
          id="name"
        />
        <label htmlFor="name">Name</label>

        <div className="divider" />

        <input
          type="number"
          name="amount"
          onChange={handleChange}
          value={item.amount && item.amount || oldData.item?.amount}
          id="amount"
        />
        <label htmlFor="amount">Amount</label>

        <div className="divider" />

        <input
          type="number"
          id="discount-percent"
          name="discountPercent"
          value={item.discountPercent && item.discountPercent || oldData.item?.discountPercent}
          onChange={handleChange}
        />
        <label htmlFor="discount-percent">Discount Percent</label>

        <div className="divider" />

        <input
          type="number"
          disabled
          id="new-price"
          value={item.newPrice && item.newPrice || oldData.item?.newPrice}
        />
        <label htmlFor="new-price">New Price</label>

        <div className="divider" />

        <select
          value={item.category && item.category || oldData.item?.category}
          //@ts-ignore
          onChange={handleChange}
          name="category"
        >
          <option value="BAG">Bag</option>
          <option value="SHOE">Shoe</option>
          <option value="SHIRT">Shirt</option>
          <option value="DEVICE">Device</option>
          <option value="WRISTWATCH">Wrist Watch</option>
        </select>

        <label htmlFor="new-price">Collection</label>
        <div className="divider" />

        <textarea
          name="description"
          //@ts-ignore
          onChange={handleChange}
          value={item.description && item.description || oldData.item?.description}
          id="description"></textarea>
        <label htmlFor="description">Description</label>

        <div className="center">
          <button type="submit">Updat{loading ? "ting" : "e"}</button>
        </div>

        <div className="divider" />
      </Form>
    </>
  )

}

export default UpdateItem;
