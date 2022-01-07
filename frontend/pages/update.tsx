import UpdateItem from '../components/UpdateItem/updateItem';
import SigninAuth from '../components/Signin/SigninAuth';
import { IPage } from './item';

const update = (props: IPage) => (
  <SigninAuth>
    <UpdateItem id={props.query.id} />
  </SigninAuth>
)

export default update;
