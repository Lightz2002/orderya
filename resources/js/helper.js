export const upperLink = (url) => {
    return url[0].toUpperCase().concat(url.slice(1));
};

export const toLink = (url) => {
    if (url == "dashboard") {
        return "/";
    } else {
        return "/" + url;
    }
};

export const convertNumToRp = (num) => {
    const rupiah = "Rp " + num.toLocaleString("en-us");
    return rupiah;
};
