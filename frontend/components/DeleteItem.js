import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update them cache on the client, so it matches the server
    // Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // filtered the delete item out of the page
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  }
  render() {
    return (
      <Mutation mutation={DELETE_ITEM} variables={{ id: this.props.id }} update={this.update}>
        {(deleteItem, { error, loading }) => {
          return (
            <button onClick={() => {
              if(confirm('Are you sure you want to delete this item?')) {
                deleteItem();
              }
            }}>
              Delete Item
            </button>
          )
        }}
      </Mutation>
    )
  }
}

export default DeleteItem
