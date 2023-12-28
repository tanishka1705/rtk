// import { useEffect } from "react";
// import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { postProduct } from "./api/post";
// import Filter from "./Filter";

const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
}

const Products = () => {

    const queryClient = useQueryClient();

    const { isLoading, error, data: products } = useQuery(
        { queryKey: ["products"], 
            queryFn: fetchProducts, 
           
            //refetchInterval: 10000, //this will refetch data every 2 sec //polling
            //refetchIntervalInBackground : true // refetch in background even if you switch the tab or minimize you window the fetching will happen
           // staleTime: 4000 //instead of giving here we can set in the default option in queryClient
           
        }
     )

    //  if staleTime > refectIntervalTime : only refetch will happens it will not go to stale 
    //if staleTime < refectIntervalTime :  after stale then only refetvh happens


     const mutation = useMutation(postProduct, {
        onSuccess: () => {
            console.log("Product added successfully!");
            queryClient.invalidateQueries('products')
        },
        onError: (err) => {
            console.error("Error adding product:", err.message);
        }
     })

     const handleAddProduct = () => {
        const productData = {
            id: 1,
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/1/1.jpg",
                "https://i.dummyjson.com/data/products/1/2.jpg",
                "https://i.dummyjson.com/data/products/1/3.jpg",
                "https://i.dummyjson.com/data/products/1/4.jpg",
                "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            ],
        };

        mutation.mutate(productData);
    };

    //without react
    // const [products, setProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             setIsLoading(true);
    //             setError(null);
    //             const response = await fetch('https://dummyjson.com/product');
    //             const data = await response.json();
    //             console.log(data.products);
    //             setProducts(data.products);
    //             setIsLoading(false);
    //         } catch (err) {
    //             setError(err.message);
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchProducts();
    // }, []);

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }


    return (
        <div className="bg-white">
           
             <button
                onClick={handleAddProduct}
                disabled={mutation.isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {mutation.isLoading ? "Adding..." : "Add Product"}
            </button>

            {/* <Filter /> */}

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to={`/products/${product.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Products;