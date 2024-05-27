import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { fetchProductById, fetchRelatedProducts } = useContext(StoreContext);
  const { productId } = useParams();
  const imagePath = "/products/";

  useEffect(() => {
    const getProduct = async () => {
      const productData = await fetchProductById(productId);
      setProduct(productData);
      setSelectedColor(productData.colorDTOs[0]);

      const relatedData = await fetchRelatedProducts(productData.name);
      setRelatedProducts(relatedData.filter((p) => p.productId !== productId));
    };

    getProduct();
  }, [fetchProductById, fetchRelatedProducts, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const isStorageActive = (relatedProduct) => {
    return relatedProduct.productId === parseInt(productId, 10);
  };

  function formatPrice(n) {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <div className="product padding-tb aside-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <article>
              <div className="product-details">
                <div className="row align-items-center">
                  <div className="col-md-12 col-12">
                    <div className="card shadow rounded-1 mb-3 fade-in">
                      <div className="row no-gutters">
                        <div className="col-md-5">
                          <img
                            className="card-img"
                            src={imagePath + selectedColor.colorImage}
                            alt=""
                            style={{ width: "358px", height: "358px" }}
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p className="card-text">{product.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="review">Reviews</div>
            </article>
          </div>
          <div className="col-lg-4 col-12">
            <div className="variant-details">
              <div className="row align-items-center">
                <div className="card shadow rounded-1 mb-3 fade-in">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      {relatedProducts.map((relatedProduct) => (
                        <Link
                          key={relatedProduct.productId}
                          to={`/product/${relatedProduct.productId}`}
                        >
                          <Button
                            variant="outline-secondary"
                            className={`custom-button ${
                              isStorageActive(relatedProduct) ? "active" : ""
                            }`}
                          >
                            <div>
                              {relatedProduct.internalStorage === 1
                                ? `${relatedProduct.internalStorage} TB`
                                : `${relatedProduct.internalStorage} GB`}{" "}
                            </div>
                            <span>{formatPrice(relatedProduct.price)}đ</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                    <h3>Choose color</h3>
                    <div className="d-flex justify-content-between flex-wrap">
                      {product.colorDTOs.map((color, index) => (
                        <Button
                          variant="outline-secondary"
                          key={index}
                          className={`custom-button ${
                            color === selectedColor ? "active" : ""
                          }`}
                          onClick={() => handleColorClick(color)}
                        >
                          <div>{color.colorName}</div>
                          <span>{formatPrice(product.price)}đ</span>
                        </Button>
                      ))}
                    </div>
                    <div className="row">
                      <div className="d-flex justify-content-between">
                        <Button className="col-7" variant="secondary">Buy now</Button>
                        <Button className="col-4" variant="outline-secondary">Add to cart</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
