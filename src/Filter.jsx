import { useQuery } from '@tanstack/react-query'
import  { useState } from 'react'
import { filterProductsByCategory } from './api/filterProduct'

function Filter() {

    const [selectedCategory, setSelectedCategory] = useState('all')

    const {isLoading, error, data: filteredProducts} = useQuery(
        
        {
            queryKey : ["filteredProducts", selectedCategory],
            queryFn: () => filterProductsByCategory(selectedCategory),
            enabled : selectedCategory !== 'all',
        
        }
        )

        const handleCategoryChange = (e) => {
            const newCategory = e.target.value;
            console.log("Selected Category:", newCategory);
            setSelectedCategory(newCategory);
          };
          

  return (
    <div className='mt-10'>
        <select
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="all">All</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value='fragrances'>fragrances</option>
                <option value='skincare'>skincare</option>
                <option value='groceries'>groceries</option>
                <option value='home-decoration'>home-decoration</option>
        </select>

        {isLoading && <h3>Loading...</h3>}
      {error && <h3>Error: {error.message}</h3>}
      {!isLoading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              {/* Product display logic */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
              <h3 className="text-sm text-gray-700">
                {product.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Filter