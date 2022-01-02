import PageInfoStyles from './PageInfoStyles';

interface IPageInfo {
  message1: string;
  message2?: string;
}

const PageInfo = ({ message1, message2 }: IPageInfo) => (
  <PageInfoStyles>
    <div className="message1">{message1}</div>
    <div className="message2">{message2}</div>
  </PageInfoStyles>
);

export default PageInfo;
