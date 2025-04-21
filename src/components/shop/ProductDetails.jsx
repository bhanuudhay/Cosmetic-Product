import { useShopContext } from "../../contexts/ShopContext";
import Modal from "../common/Modal";

const ProductDetails = () => {
  const { selectedProduct, isModalOpen, closeProductModal } = useShopContext();

  if (!selectedProduct || !isModalOpen) {
    return null;
  }

  const discountedPrice =
    selectedProduct.discount > 0
      ? selectedProduct.price * (1 - selectedProduct.discount / 100)
      : selectedProduct.price;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeProductModal}
      title={selectedProduct.name}
    >
      <div
        className="product-details"
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >
        {/* LEFT: Product Image */}
        <div className="product-detail-image" style={{ flex: "1 1 250px" }}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{ width: "230px", height: "220px" }}
          />
        </div>

        {/* RIGHT: Product Info */}
        <div className="product-detail-info" style={{ flex: "2 1 400px" }}>
          <div className="product-manufacturer">
            <strong>Manufacturer:</strong> {selectedProduct.manufacturer}
          </div>

          <div className="product-weight">
            <strong>Weight/Volume:</strong> {selectedProduct.weight}
          </div>

          <div className="product-price-detail">
            <strong>Price:</strong>
            {selectedProduct.discount > 0 ? (
              <>
                <span
                  className="original-price"
                  style={{ textDecoration: "line-through", marginLeft: "8px" }}
                >
                  ₹{selectedProduct.price.toFixed(0)}
                </span>
                <span
                  className="discounted-price"
                  style={{ color: "lightgreen", marginLeft: "8px" }}
                >
                  ₹{discountedPrice.toFixed(0)}
                </span>
                <span
                  className="discount-tag"
                  style={{ color: "salmon", marginLeft: "8px" }}
                >
                  ({selectedProduct.discount}% OFF)
                </span>
              </>
            ) : (
              <span style={{ marginLeft: "8px" }}>
                ₹{selectedProduct.price.toFixed(0)}
              </span>
            )}
          </div>

          <div className="product-availability-detail">
            <strong>Availability:</strong>{" "}
            {selectedProduct.available ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-description">
            <strong>Description:</strong>
            <p>{selectedProduct.description}</p>
          </div>

          {selectedProduct.variants && selectedProduct.variants.length > 0 && (
            <div className="product-variants">
              <strong>Available Variants:</strong>
              <table
                className="variants-table"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <thead>
                  <tr>
                    {Object.keys(selectedProduct.variants[0])
                      .filter((key) => key !== "available")
                      .map((key) => (
                        <th key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                      ))}
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.variants.map((variant, index) => (
                    <tr key={index}>
                      {Object.entries(variant)
                        .filter(([key]) => key !== "available")
                        .map(([key, value]) => (
                          <td key={key}>
                            {key === "price"
                              ? `₹${Number(value).toFixed(0)}`
                              : value}
                          </td>
                        ))}
                      <td>
                        {variant.available ? (
                          <span className="in-stock">In Stock</span>
                        ) : (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetails;
