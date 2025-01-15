/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const URL = axios.create({
  baseURL: "https://staging-api.tranzgard.com/",
});

export default URL;
