import Link from 'next/link';

import { useUserData } from '../../hooks/AppContext';
import Counter from '../Counter/Counter';
import Signout from '../Signout/Signout';
import Spinner from '../Spinner/Spinner';

import NavStyles from './NavStyles';

const Nav = () => {
  const userData = useUserData();
  const me = userData && userData.data && userData.data.me;
  const cartItems = userData && userData.data && userData.data.me && userData.data.me.cartItems;
  const wishlistItems = userData && userData.data && userData.data.me && userData.data.me.wishlistItems;

  if (userData?.loading) return <Spinner hide={true} spacing="600px" />

  return (
    <NavStyles>
      <ul>
        <li className="mb">
          <Link href="/">
            <a><i className="fas fa-shopping-basket icon"></i><span>Shop</span></a>
          </Link>
        </li>
        <li className="side-space">
          <Link href="/wishlist">
            <a><i className="fas fa-heart icon counter"></i><span>
              <Counter count={me ? wishlistItems && wishlistItems.length : 0} />
            </span></a>
          </Link>
        </li>
        <li className="side-space">
          <Link href="/cart">
            <a><i className="fas fa-shopping-cart icon counter"></i><span>
              <Counter
                count={me ? cartItems && cartItems.reduce((tally: any, cartItem: any) => tally + cartItem.quantity, 0) : 0}
              />
            </span></a>
          </Link>
        </li>
        {
          me ? (
            <>
              <li className="mb">
                <Link href="/orders">
                  <a><i className="fas fa-box-open icon"></i><span>Orders</span></a>
                </Link>
              </li>
              <li className="mb">
                <Link href="/manage">
                  <a><i className="fas fa-tools icon"></i><span>Manage</span></a>
                </Link>
              </li>
            </>
          ) : null
        }
        {
          !me && (
            <li className="mb">
              <Link href="/signin">
                <a><i className="far fa-user-circle icon"></i><span>Sign in</span></a>
              </Link>
            </li>
          )
        }
        {
          me ? (
            <li className="mb"><Signout /></li>
          ) : null
        }
      </ul>
    </NavStyles>
  )
}

export default Nav;
