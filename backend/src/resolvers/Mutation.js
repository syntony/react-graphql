const Mutation = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if user is logged in

    const item = await ctx.db.mutation.createItem({
      data: { ...args }
    }, info);

    console.log(item)

    return item
  }
  // createDog(parent, args, ctx, info) {
  //   global.dogs = global.dogs || [];
  //   // create dog!
  //   const newDog = { name: args.name };
  //   global.dogs.push(newDog);
  //   return newDog;
  // }
};

module.exports = Mutation;
