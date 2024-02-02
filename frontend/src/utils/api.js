const BASE_URL = 'http://localhost:3000';

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error('Error');
  }
  return await res.json();
};
