// Define your sitemap
export const sitemap = {
  siteUrl: "https://sem-postma.com",
  defaultPriority: 0.2,
  routes: {
    '/': {
      priority: 1,
      changeFrequency: "daily" as const,
    }
  },
};
