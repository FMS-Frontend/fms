/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const URL = axios.create({
  // baseURL: "https://trusty-unicorn-loosely.ngrok-free.app",
  baseURL: "http://fms-service-environment.eu-west-1.elasticbeanstalk.com/",
});

export default URL;
