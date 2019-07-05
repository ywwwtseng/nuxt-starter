export default function ({ $axios }) {
  console.log($axios.defaults);
  $axios.interceptors.request.use(function (config) {
    console.log(config, 'config');

    return config;
  });
}