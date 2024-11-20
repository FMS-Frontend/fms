/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const URL = axios.create({
  baseURL: "https://trusty-unicorn-loosely.ngrok-free.app",
});

export default URL;
