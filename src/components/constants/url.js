const setNewURL = (ids) => {
  // const imdbIDs = favs.map((movie) => movie.imdbID);
  const baseURL = window.location.href;
  // const params = `?favourites=${imdbIDs.join(",")}`;
  // const newURL = `${baseURL}${params}`;
  const newURL = `${baseURL}?${ids}`;
  window.history.pushState({ path: newURL }, "", newURL);
};

const getQueryIDs = () => {
  console.log("query: ", window.location.search);
};

export { setNewURL, getQueryIDs };
