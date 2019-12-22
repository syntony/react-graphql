const Mutation = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if user is logged in

    const item = await ctx.db.mutation.createItem({
      data: { ...args }
    }, info);

    console.log(item)

    return item
  },
  async updateItem(parent, args, ctx, info) {
    // first take copy of the updates
    const updates = { ...args };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    )
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`)
    // TODO: check if they own thar item
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info)
  }
};

module.exports = Mutation;
