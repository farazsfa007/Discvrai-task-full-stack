import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p><small>{product.category}</small></p>
        <p>{product.description}</p>
        </div>
    );
};

export default ProductCard;