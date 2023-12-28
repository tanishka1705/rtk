import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";




const Product = () => {

    const params = useParams();
    


    const mutation  = useMutation({
        mutationFn: (newProduct) =>{
            return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct)
        }
      
    });

    const fetchProduct = async () => {
        const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
        const data = await response.json();
        return data;
    }

    const { isLoading, error, data: product } = useQuery(
        { queryKey: ["product", params.productId], 
           queryFn: fetchProduct, 
        //    staleTime: 10000 instead of giving here we can set in the default option in queryClient
        }
    )


    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }

    if(mutation.isLoading){
        return <h3>Updating....</h3>
    }

    if(mutation.isError){
        return <h3>Error while updating : {mutation.error.message}</h3>
    }


    return (
      <div>
        <div>Product : {product.title}</div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" 
            onClick={() => {
              mutation.mutate({ title: 'updated product' })
            }}
          >
            Update Product
          </button>

      </div>
    )
};

export default Product;