import axios from "axios";

const URL = "https://fitnessapi.gymvalross.com/api.php";

const API = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
