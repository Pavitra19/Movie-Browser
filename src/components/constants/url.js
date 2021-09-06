const setNewURL = (ids) => {
  const baseURL = window.location.href;
  const newURL = `${baseURL}?${ids}`;
  window.history.pushState({ path: newURL }, "", newURL);
};

const getQueryIDs = () => {
  console.log("query: ", window.location.search);
};

export { setNewURL, getQueryIDs };
