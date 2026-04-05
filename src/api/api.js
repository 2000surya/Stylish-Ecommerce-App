const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://dummyjson.com";

export const getData = async (endpoint = "") => {
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
