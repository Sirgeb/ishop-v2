import { useRouter } from 'next/router';
import { useUserData } from '../../hooks/AppContext';

import Signin from './Signin';
import Spinner from '../Spinner/Spinner';

const SignInAuth = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const userData = useUserData();
  const me = userData && userData.data && userData.data.me;

  if (userData?.loading) return <p> Loading... </p>;

  if (!me) {
    return (
      <Signin pathname={router.pathname && router.pathname} />
    )
  }

  if (me && router.pathname === '/signin') {
    router.push('/');
    return <Spinner spacing="200px" />
  }

  return children;
}

export default SignInAuth;
