
// export const filterProductsByCategory = async (category) => {
//     const response = await fetch(`https://dummyjson.com/products?category=${category}`);
//     const data = await response.json();
//     return data.products;
//   };
export const filterProductsByCategory = async (category) => {
    const apiUrl = `https://dummyjson.com/products?category=${category}`;
    console.log("API URL:", apiUrl);
  
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("API Response:", data);
  
    return data.products;
  };
  