export const parseQuery = (url: string) => {
  const [path, queryStr] = url.split("?");
  const query: Record<string, string> = {};
  if (queryStr) {
    new URLSearchParams(queryStr).forEach((val, key) => {
      query[key] = val;
    });
  }
  return { path, query };
};
