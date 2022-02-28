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
              apolloHooks.includes(node.name) &&
              node.parent.type === "CallExpression" &&
              (node.parent.typeParameters === undefined ||
                node.parent.typeParameters.params.length < 2 ||
                node.parent.typeParameters.params.some(
                  (param) => param.type === "TSAnyKeyword"
                ))
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
    "no-cheating-types-apollo-hooks": {
      create: function (context) {
        return {
          Identifier: function (node) {
            if (
              apolloHooks.includes(node.name) &&
              node.parent.type === "CallExpression" &&
              node.parent.typeParameters !== undefined &&
              node.parent.typeParameters.params.some(
                (param) =>
                  param.type === "TSAnyKeyword" ||
                  param.type === "TSTypeLiteral"
              )
            ) {
              context.report({
                node: node,
                message: "Don't cheat, literal and any are bad for everybody",
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
        "bonk2/no-cheating-types-apollo-hooks": "error",
      },
    },
  },
};
