import React from 'react';
import { ApolloConsumer } from '@apollo/client';

import { ME_QUERY } from '../../graphql/queries/user';
import { SEARCH_ITEMS_QUERY } from '../../graphql/queries/item';
import SearchItemStyles from './SearchItemStyles';
import { Item } from '../../generated';

const SearchItem = ({ setItems }: { setItems: (items: Item[]) => void }) => {

  async function onChange(e: React.ChangeEvent<HTMLInputElement>, client: any) {
    let keyword = e.target.value;

    if (keyword.length === 0 || keyword === null || keyword === undefined) {
      setItems([]);
    }

    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: {
        input: {
          searchTerm: keyword
        }
      },
      refetchQueries: [{ query: ME_QUERY }]
    });

    setItems(res.data.searchItems);
  }

  return (
    <SearchItemStyles>
      <ApolloConsumer>
        {(client) => (
          <input
            type="text"
            placeholder="Search for an Item ..."
            //@ts-ignore
            type="search"
            name="search"
            autoComplete="off"
            onChange={
              (e) => {
                e.persist();
                onChange(e, client);
              }
            }
          />
        )}
      </ApolloConsumer>
    </SearchItemStyles>
  )
}

export default SearchItem;
