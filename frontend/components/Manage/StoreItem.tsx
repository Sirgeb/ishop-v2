import React from 'react';
import { OrderByItemName, OrderType, useDeleteItemMutation } from '../../generated';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import formatMoney from '../../lib/formatMoney';
import formatLetters from '../../lib/formatLetters';
import { IconStyle } from './ManageStyles';
import { COUNT_ITEMS, ITEMS } from '../../graphql/queries/item';

const StoreItem = ({ id, itemName, image1, newPrice, admin }: any) => {
  const [deleteItem] = useDeleteItemMutation({
    variables: {
      where: {
        itemId: id
      }
    },
    refetchQueries: [{
      query: ITEMS, variables: {
        input: {
          skip: 0,
          take: 5,
          orderByItemName: 'createdAt' as OrderByItemName,
          orderType: 'desc' as OrderType
        }
      }
    }, {
      query: COUNT_ITEMS
    }]
  });

  const router = useRouter();

  return (
    <tr>
      <td>
        <img src={image1} alt={itemName} />
      </td>
      <td>{formatLetters(itemName)}</td>
      <td>{formatMoney(newPrice)}</td>
      <td>
        <IconStyle>
          {
            admin && (
              <Link
                href={{
                  pathname: "/update",
                  query: {
                    id
                  }
                }}>
                <a>
                  <i className="fas fa-pen-square icon update" title="Update"></i>
                </a>
              </Link>
            )
          }

          {
            !admin && (
              <a onClick={() => alert("Sorry, you don't have permission to update")}>
                <i className="fas fa-pen-square icon update" title="Update"></i>
              </a>
            )
          }
        </IconStyle>
      </td>
      <td>
        <IconStyle>
          {
            admin && (
              <i
                className="fas fa-trash-alt icon remove"
                title="Remove"
                onClick={async () => {
                  if (confirm('Click OK to delete this item?')) {
                    await deleteItem().catch(err => alert(err.message));
                    Router.push({
                      pathname: router.pathname,
                    });
                  }
                }}
              ></i>
            )
          }
          {
            !admin && (
              <i
                className="fas fa-trash-alt icon remove"
                title="Remove"
                onClick={() => alert("Sorry, You don't have permission to delete")}
              ></i>
            )
          }
        </IconStyle>
      </td>
    </tr>
  )
}

export default StoreItem;
