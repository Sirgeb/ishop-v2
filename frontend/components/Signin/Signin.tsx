import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useSigninMutation } from '../../generated';
import { ME_QUERY } from '../../graphql/queries/user';
import Form from '../styles/Form';
import PageInfo from '../PageInfo/PageInfo';
import { Center } from './SigninStyles';
import Spinner from '../Spinner/Spinner';
import formatError from '../../lib/formatError';

const INITIAL_STATE = {
  email: "",
  password: ""
};

const authMessage = {
  wishlist: "To view wishlist",
  cart: "To view cart",
  orders: "To view orders",
  manage: "To manage Items in store",
  add: "To add an item",
}

interface IProps {
  pathname?: string;
}

const Signin = ({ pathname }: IProps) => {
  const [user, setUser] = useState(INITIAL_STATE);
  const [signin, { loading, error }] = useSigninMutation({ refetchQueries: [{ query: ME_QUERY }] });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    await signin({
      variables: {
        input: {
          email: user.email,
          password: user.password
        }
      }
    });
    setUser(INITIAL_STATE);

    if (Router.pathname !== "/signin") {
      Router.push({ pathname: Router.pathname });
    } else {
      Router.push({ pathname: "/" });
    }
  }

  if (loading) return (
    <>
      <PageInfo message1="Signing in..." />
      <Spinner />
    </>
  );

  return (
    <>
      <Head>
        <title>iShop | Sign in </title>
      </Head>
      <PageInfo
        message1={"Sign in"}
        message2={
          error ? formatError(error.toString()) :
            pathname === "/manage" ? authMessage.manage :
              pathname === "/wishlist" ? authMessage.wishlist :
                pathname === "/cart" ? authMessage.cart :
                  pathname === "/orders" ? authMessage.orders :
                    pathname === "/add" ? authMessage.add : null
        }
      />

      <Form autoComplete="off" method="post" onSubmit={(event: any): Promise<void> => handleSubmit(event)}>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={user.email}
          id="email"
        />
        <label htmlFor="email">Email</label>

        <div className="divider"></div>

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={user.password}
          id="password"
        />
        <label htmlFor="password">Password</label>

        <div className="divider"></div>

        <Center>
          <button type="submit">Signin</button>
          <p>Don't have an account?&nbsp;
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </p>
        </Center>
      </Form>
    </>
  )
}

export default Signin;
