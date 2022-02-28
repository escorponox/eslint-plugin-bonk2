const apolloHooks = [
  "useQuery",
  "useLazyQuery",
  "useMutation",
  "useSubscription",
];

module.exports = {
  rules: {
    "no-smart-import-rename": {
      create: function (context) {
        return {
          ImportSpecifier: function (node) {
            if (
              apolloHooks.includes(node.imported.name) &&
              node.local.name !== node.imported.name
            ) {
              context.report({
                node: node,
                message: "Forbidden import rename, don't be too smart",
              });
            }
          },
        };
      },
    },
    "no-untyped-apollo-hooks": {
      create: function (context) {
        return {
          Identifier: function (node) {
            if (
              node.name === "useQuery" &&
              node.parent.type === "CallExpression" &&
              (node.parent.typeParameters === undefined ||
                node.parent.typeParameters.params.length < 2)
            ) {
              context.report({
                node: node,
                message: "Type your Apollo hooks, you won't regret it",
              });
            }
          },
        };
      },
    },
  },
  configs: {
    recommended: {
      rules: {
        "bonk2/no-smart-import-rename": "error",
        "bonk2/no-untyped-apollo-hooks": "error",
      },
    },
  },
};
