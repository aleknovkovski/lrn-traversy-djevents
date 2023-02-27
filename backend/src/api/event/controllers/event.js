'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  async myEvents(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { error: { message: "No authorization header was found" } },
      ]);
    }

    const data = await strapi.db.query('api::event.event').findMany({
      where: {user: user.id}
    });

    if (!data) {
      return ctx.notFound();
    }

    return data;
  },
}));
