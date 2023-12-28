import axios from "axios"

export const postProduct = async() => {
    const response = await axios.post('https://dummyjson.com/products/add');
    return response.data;
}