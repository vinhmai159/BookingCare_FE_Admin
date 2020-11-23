const LoginAPI = async (user, password) => {
  var url = "http://192.168.1.2:3069/doctor/login";
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user,
      password: password,
    }),
  }).then((response) => response.json());
};

export default LoginAPI;
