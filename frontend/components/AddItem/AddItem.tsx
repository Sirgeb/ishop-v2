import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useCreateItemMutation } from '../../generated';

import PageInfo from '../PageInfo/PageInfo';
import Spinner from '../Spinner/Spinner';
import formatError from '../../lib/formatError';
import Form from '../styles/Form';

const INITIAL_STATE = {
  itemName: "",
  discountPercent: 0,
  category: "BAG" as Category,
  image1: undefined,
  image2: undefined,
  amount: 0,
  newPrice: 0,
  description: undefined
}

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

enum Category {
  BAG = 'BAG',
  SHIRT = 'SHIRT',
  DEVICE = 'DEVICE',
  WRISTWATCH = 'WRISTWATCH',
  SHOE = 'SHOE'
}

const AddItem = () => {
  const [item, setItem] = useState<Item>(INITIAL_STATE);
  const [createItem, { loading, error }] = useCreateItemMutation({ variables: { input: { ...item } as any } })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;

    if (name === 'amount') {
      if (item.discountPercent !== 0) {
        const discountAmount = parseFloat(value) * (item.discountPercent / 100);
        const newPrice = parseFloat(value) - discountAmount;

        setItem((prevState: Item): Item => ({
          ...prevState,
          amount: parseFloat(value),
          newPrice
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

      setItem((prevState: Item): Item => ({
        ...prevState,
        discountPercent: parseInt(value),
        newPrice
      }));

    } else {
      setItem((prevState: Item): Item => ({
        ...prevState,
        [name]: val,
      }));
    }
  }

  async function uploadFile(e: any) {
    const imageName = e.target.name;
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'ishopSite');

    const res = await fetch('https://api.cloudinary.com/v1_1/chybesta123/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await res.json();

    if (imageName === "image1") {
      setItem((prevState: Item): Item => ({
        ...prevState,
        image1: file.secure_url
      }));
    } else {
      setItem((prevState: Item): Item => ({
        ...prevState,
        image2: file.secure_url
      }));
    }
  }

  if (loading) return <Spinner spacing="200px" />;

  return (
    <>
      <Head>
        <title>iShop | Add Item </title>
      </Head>
      <PageInfo message1="Add Item" message2={formatError(error && error.message)} />

      <Form
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await createItem();
          setItem(INITIAL_STATE);
          if (res) {
            Router.push({
              pathname: '/manage',
            });
          }
        }}
      >
        <input
          type="text"
          name="itemName"
          onChange={handleChange}
          value={item.itemName}
          id="name"
        />
        <label htmlFor="name">Name</label>

        <div className="divider" />

        <input
          type="number"
          name="amount"
          onChange={handleChange}
          value={item.amount}
          id="amount"
        />
        <label htmlFor="amount">Amount</label>

        <div className="divider" />

        <input
          type="number"
          id="discount-percent"
          name="discountPercent"
          value={item.discountPercent}
          onChange={handleChange}
        />
        <label htmlFor="discount-percent">Discount Percent</label>

        <div className="divider" />

        <input
          type="number"
          disabled
          id="new-price"
          value={item.newPrice}
        />
        <label htmlFor="new-price">New Price</label>

        <div className="divider" />

        <select
          value={item.category}
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

        <input
          type="file"
          id="image1"
          name="image1"
          onChange={uploadFile}
        />
        <label htmlFor="image1">Upload an image</label>
        {item.image1 && <img src={item.image1} width="100" height="100" alt="upload preview" />}
        <div className="divider" />

        <input
          type="file"
          id="image2"
          name="image2"
          onChange={uploadFile}
        />
        <label htmlFor="image2">Upload an image</label>
        {item.image2 && <img src={item.image2} width="100" height="100" alt="upload preview" />}
        <div className="divider" />

        <textarea
          name="description"
          //@ts-ignore
          onChange={handleChange}
          value={item.description}
          id="description"></textarea>
        <label htmlFor="description">Description</label>

        <div className="center">
          <button type="submit">Submit{loading && "ting"}</button>
        </div>

        <div className="divider" />
      </Form>
    </>
  )
}

export default AddItem;
