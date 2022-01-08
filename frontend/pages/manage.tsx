import SigninAuth from '../components/Signin/SigninAuth';
import ManageComponent from '../components/Manage/Manage';
import { IPage } from './item';

const Manage = ({ query }: IPage) => {

  return (
    <SigninAuth>
      <ManageComponent page={query.page || '1'} />
    </SigninAuth>
  )
}

export default Manage;
