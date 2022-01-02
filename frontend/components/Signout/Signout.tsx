import { useSignoutMutation } from '../../generated';
import SignoutStyles from './SignoutStyles';
import { ME_QUERY } from '../../graphql/queries/user';


const Signout = () => {
  const [signout] = useSignoutMutation({ refetchQueries: [{ query: ME_QUERY }] });

  return <SignoutStyles>
    <button onClick={async () => {
      if (confirm("Click on OK to Sign out")) {
        await signout();
      }
    }} >
      <i className="fas fa-power-off icon"></i>
      <br />Signout
    </button>
  </SignoutStyles>
}

export default Signout;
