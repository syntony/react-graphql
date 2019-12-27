const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    const { userId } = ctx.request
    // check if there is a current userId
    if (!userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: userId },
    }, info);
  }
};

module.exports = Query;
