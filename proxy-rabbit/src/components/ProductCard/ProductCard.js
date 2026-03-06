import './ProductCard.scss';

function ProductCard({product, onCardClicked}){
    return(<div className='product-card' onClick={(e) => {onCardClicked(product.country_id)}}>
    <div className='product-card-container'>
        <img className='product-card-container__image' src={`${product.image}`} alt={product.name}/>
        <div className='product-card-container-right'>
            <h3 className='product-card-container-right__name'>{product.name}</h3>
            {product.description ? <p className='product-card-container-right__description'>{product.description}</p> : ''}
        </div>
    </div>
    </div>)
}

export default ProductCard;