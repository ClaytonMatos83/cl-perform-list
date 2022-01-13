import {memo, useState} from 'react';
import { AddProductToWishListProps } from './AddProductToWishlist'
import dynamic from 'next/dynamic';
import lodash from 'lodash';

const AddProductToWishlist = dynamic<AddProductToWishListProps>(() => {
 return import('./AddProductToWishlist').then(mod => mod.AddProductToWishList) 
}, {
    loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        priceFormatted: string;
        title: string;
    }
    onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
 const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos Favoritos</button>
           
           {isAddingToWishlist && (  
              <AddProductToWishlist
                onAddToWishlist={() => onAddToWishlist(product.id)}
                onRequestClose={() => setIsAddingToWishlist(false)}
              />
           )}
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product)
})