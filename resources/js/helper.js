export const upperLink = (url) => {
    return url[0].toUpperCase().concat(url.slice(1));
};

export const toLink = (url) => {
    return "/" + url;
};