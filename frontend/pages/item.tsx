import ItemComponent from '../components/Item/Item';

export type IPage = {
  query: {
    id?: string;
    page: string;
  }
}

const Item = (props: IPage) => (
  <ItemComponent id={props.query.id as string} />
);

export default Item;