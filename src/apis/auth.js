import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const LoginApi = async (email, password, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/auth/login`;
    const response = await axios.post(url, { email, password });
    setLoading(false);
    return response.data;
  } catch (Error) {
    setLoading(false);
    console.log("Error while login", Error.toJSON());
  }
};

const RegisterApi = async (name, email, password, phoneNumber, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseUrl}/auth/register`;
    const response = await axios.post(url, {
      name,
      email,
      password,
      phoneNumber
    });
    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    console.log("Error while creating user", error);
  }
};

export { LoginApi, RegisterApi };
