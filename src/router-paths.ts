const pathsMap = {
  about: () => "/app/about",
  app: () => "/app",
  auth: () => "/sign_in",
  home: () => "/app/home",
  // viewArticle: (articleId: string) => `/articles/${articleId}`,
  // editArticle: (articleId: string) => `/articles/${articleId}/edit`,
};
type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCb: (...args: any[]) => string = pathsMap[route];

  return pathCb(...params);
};
