export default function (context) {
  // If nuxt generate, pass this middleware
  if (context.isServer && !context.req) return;

  context.store.dispatch('auth/initAuth', context.req);
}
