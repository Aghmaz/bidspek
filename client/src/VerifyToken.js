import axios from "axios";

export const VerifyToken = async (token) => {
  console.log("token here ", token);
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/engineer/verify/token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
