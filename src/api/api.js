const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(BASE_URL);

export const getProduct = async (endpoint = "") => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // ✅ important
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // or []
  }
};
