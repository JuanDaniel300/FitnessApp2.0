export const profileMan =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7e8Oa6AaR6ehfKnnNwN44Qhfr-AP3gidcA&s";
export const profileWoman =
  "https://www.shareicon.net/data/128x128/2016/07/21/799353_user_512x512.png";

export const capitalizeFirstLetter = (string: string): string => {
  if (typeof string !== "string" || string.length === 0) {
    return string; // Devuelve el valor original si no es una cadena
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getNames = (fullname: string): string => {
  const fullNameArray = fullname.split(" ");
  if (typeof fullname !== "string" || fullname.length === 0) {
    return fullname;
  }

  return `${fullNameArray[0]} ${fullNameArray[1]}`;
};
