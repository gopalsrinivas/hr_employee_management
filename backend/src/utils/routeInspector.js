const listRoutes = (app) => {
  const routes = [];

  const walk = (stack, prefix = "") => {
    stack.forEach((layer) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods).map((method) => method.toUpperCase());
        routes.push({ methods, path: `${prefix}${layer.route.path}` });
        return;
      }

      if (layer.name === "router" && layer.handle && layer.handle.stack) {
        walk(layer.handle.stack, prefix);
      }
    });
  };

  if (app && app._router && app._router.stack) {
    walk(app._router.stack);
  }

  return routes;
};

module.exports = {
  listRoutes
};
