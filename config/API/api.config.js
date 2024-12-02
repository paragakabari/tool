import API_DEV from "./api-dev";
// import API_LOCAL from "./api-local";
import API_PROD from "./api-prod";

const hostname = typeof window !== "undefined" && window.location.hostname;
const port = typeof window !== "undefined" && window.location.port;
let isLocalApi = port >= 3000;

export const ApiArray = [
  "dbgUC5SmXwihUJi38LAF5nAq7YCqVAMA",
  "06Blt9Yyae3YVtaIgqbC25vd4wYk2IvW",
  "uQ2iG26K8lRPQJ5aYU0YR4IKh1Hr0qd3",
  "ylMOixtpCvQj0EHzQhrHe5QtP3f6vrku",
  "tldq4cInzCDjnqRlTie3mf15rBOjcLgo",
  "EMW3k6EJPHMm6LcfFGCAPDUfnXkxizSw",
  "M9Eldl58ELKErx77zCtFBqVica2oXCoZ",
  "98LjxLPk5Ey1koZ7GoTAC7q1ADkseAET",
  "9LNlmvyrKy0HUMrmvPDYE44FZEflcvVb",
  "IKgjjlnaikXLednseY0QqF3yz6U4zCAQ",
  "bMYYvLFrhBoGGEPuyVt16QRaNIULgtrw",
  "1AoKXHB5DKMtoVvprT2bqaHNTFVRQGBS",
  "sgmXLxVZ0jMC9DVg4VPr4p5LjhNh02dP",
  "BPtUOMSuV2IEiXd1Tbh50kYD9fRGJ9D6",
  "jgF6rYzobFnsXhHLxia8OjgeV3LsBJJH",
  "vMFHl8QXDcWrfdtuzSbzIWNWWmbIZ5j7",
]; // fake account api Keys Array for "Currency convertor" tool

export const API =
  hostname === "localhost" && isLocalApi
    ? API_DEV
    : hostname === "localhost"
    ? API_DEV
    : API_PROD;
