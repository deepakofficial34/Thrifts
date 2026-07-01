import { useState, useRef } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function SellProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("electronics");
  const [condition, setCondition] = useState("good");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [productAge, setProductAge] = useState("");
  const [image, setImage] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [publishedData, setPublishedData] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPublishing) return; // prevent duplicate submissions
    setIsPublishing(true);
    setPublishError(null);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("originalPrice", originalPrice);
      formData.append("category", category);
      formData.append("condition", condition);
      formData.append("brand", brand);
      formData.append("location", location);
      formData.append("productAge", productAge);

      if (image) {
        formData.append("image", image);
      }

      const response = await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Success: keep form data intact and show success card
      setPublishedData(response.data || { title, price });
      setIsPublishing(false);
    } catch (error) {
      setPublishError(error.response?.data?.message || error.message || "An error occurred while publishing.");
      setIsPublishing(false);
      console.log(error.response?.data || error.message || error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files?.[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const uploadBoxStyle = {
    padding: "26px",
    borderRadius: "18px",
    border: dragOver ? "2px dashed #C97B63" : "2px dashed #e8dfd6",
    background: "#FFFDF9",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "180px",
    transition: "border-color 0.25s ease, background 0.25s ease",
    color: "#6E5D57",
  };

  const inputStyle = {
    width: "100%",
    borderRadius: "14px",
    border: "1px solid #e8dfd6",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#3D2C2E",
    background: "#fffdf9",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    height: "52px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
    color: "#6E5D57",
    fontSize: "14px",
    fontWeight: "700",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF6F1",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#FFFDF9",
          borderRadius: "20px",
          boxShadow: "0 18px 50px rgba(61, 44, 46, 0.08)",
          padding: "40px 36px",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "38px",
              fontWeight: "800",
              color: "#3D2C2E",
              lineHeight: "1.05",
            }}
          >
            List an Item
          </h1>
          <p
            style={{
              margin: "16px 0 0 0",
              fontSize: "17px",
              color: "#6E5D57",
              lineHeight: "1.7",
            }}
          >
            Give your pre-loved items a second life.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Product Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Original Price</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inputStyle, appearance: "none", paddingRight: "16px" }}
              >
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="furniture">Furniture</option>
                <option value="books">Books</option>
                <option value="sports">Sports</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{ ...inputStyle, appearance: "none", paddingRight: "16px" }}
              >
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <label style={labelStyle}>Product Age</label>
              <input
                type="text"
                value={productAge}
                onChange={(e) => setProductAge(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              style={{
                ...inputStyle,
                minHeight: "140px",
                resize: "vertical",
                padding: "16px",
                lineHeight: "1.7",
              }}
            />
          </div>

          <div style={{ marginTop: "24px" }}>
            <label style={labelStyle}>Upload product photos</label>
            <div
              style={uploadBoxStyle}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: "#6E5D57",
                  maxWidth: "420px",
                }}
              >
                Drag and drop a photo here, or click to select a file.
              </p>
            </div>

            {image && (
              <div
                style={{
                  marginTop: "18px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e8dfd6",
                  background: "#ffffff",
                  maxWidth: "280px",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "240px" }}
                />
              </div>
            )}
          </div>

          {/* Publish CTA area: summary card, message, premium button, success and error states */}

          {publishError && (
            <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "#FDEDEE", border: "1px solid rgba(143,38,38,0.12)", color: "#8F2626" }}>
              <strong>Publishing failed:</strong> {publishError}
            </div>
          )}

          <div style={{ marginTop: 18, display: 'flex', gap: 12, alignItems: 'center', background: '#FFFDF9', padding: 12, borderRadius: 12, border: '1px solid rgba(61,44,46,0.04)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', background: '#fff', flex: '0 0 64px', display: 'grid', placeItems: 'center', border: '1px solid rgba(61,44,46,0.04)' }}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ color: '#A0897F', fontSize: 12 }}>No image</div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ color: '#3D2C2E', fontWeight: 800, fontSize: 15 }}>{title || 'Untitled'}</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 12, color: '#6E5D57', fontSize: 13 }}>
                <div>Price: <strong style={{ color: '#3D2C2E' }}>{price ? `₹${price}` : '—'}</strong></div>
                <div>Category: <strong style={{ color: '#3D2C2E' }}>{category}</strong></div>
                <div>Condition: <strong style={{ color: '#3D2C2E' }}>{condition}</strong></div>
              </div>
              <div style={{ marginTop: 8, color: '#7B655D', fontSize: 13 }}>You're helping extend the life of a product and reduce waste by listing it on THRIFTS.</div>
            </div>
          </div>

          {/* Button area */}
          <div style={{ marginTop: 18 }}>
            {publishedData ? (
              <div
                style={{
                  maxWidth: "600px",
                  margin: "0 auto",
                  padding: "24px",
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  boxShadow: "0 18px 46px rgba(61, 44, 46, 0.10)",
                  border: "1px solid rgba(61,44,46,0.06)",
                  textAlign: "center",
                  animation: "fadeIn 280ms ease",
                }}
              >
                <style>{`
                  .success-actions {
                    display: flex;
                    justify-content: center;
                    gap: 14px;
                    margin-top: 22px;
                  }

                  .success-action-button {
                    width: 180px;
                    height: 48px;
                    border-radius: 12px;
                    font-size: 15px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
                  }

                  .success-action-button:hover {
                    transform: translateY(-2px);
                  }

                  .success-action-primary {
                    background: #D0876A;
                    color: #FFFFFF;
                    border: 2px solid #D0876A;
                    box-shadow: 0 12px 28px rgba(208, 135, 106, 0.24);
                  }

                  .success-action-primary:hover {
                    background: #BD7358;
                    border-color: #BD7358;
                  }

                  .success-action-secondary {
                    background: #FFFDF9;
                    color: #D0876A;
                    border: 2px solid #D0876A;
                  }

                  .success-action-secondary:hover {
                    background: #FAF6F1;
                  }

                  @media (max-width: 560px) {
                    .success-actions {
                      flex-direction: column;
                      align-items: stretch;
                    }

                    .success-action-button {
                      width: 100%;
                    }
                  }

                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: none; }
                  }
                `}</style>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#E6F4EA', color: '#227A32', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h2 style={{ margin: 0, color: '#3B2A2A', fontSize: 24, lineHeight: 1.25, fontWeight: 900 }}>Listing Published Successfully</h2>
                  <p style={{ margin: '10px auto 0', maxWidth: 460, color: '#6E5D57', fontSize: 15, lineHeight: 1.7 }}>Your product is now live and visible to potential buyers.</p>
                </div>

                <div style={{ display: 'none', gap: 12, alignItems: 'center', background: '#ECF7EE', padding: 14, borderRadius: 12, border: '1px solid rgba(46,106,61,0.12)', color: '#2E6A3D' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: '#fff', display: 'grid', placeItems: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#2E6A3D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: '#3D2C2E' }}>Your listing is now live on THRIFTS</div>
                    <div style={{ marginTop: 6, color: '#6E5D57' }}>{publishedData.title || title} • {publishedData.price
  ? `₹${publishedData.price}`
  : price
  ? `₹${price}`
  : ''}</div>
                  </div>
                </div>

                <div style={{ marginTop: 22, padding: 16, borderRadius: 14, background: '#EEF7EA', border: '1px solid rgba(34, 122, 50, 0.12)', display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FFFFFF', color: '#227A32', display: 'grid', placeItems: 'center', flex: '0 0 32px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 19C5 9 12 4 21 4c0 9-5 16-15 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 19c3-5 7-8 12-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </div>
                  <p style={{ margin: 0, color: '#3D2C2E', fontSize: 14, lineHeight: 1.7, fontWeight: 600 }}>
                    Every item reused is one less item wasted. Thank you for contributing to a more sustainable marketplace.
                  </p>
                </div>

                <div className="success-actions">
                  <button
  type="button"
  className="success-action-button success-action-primary"
  onClick={() => {
    const id = publishedData.id || publishedData._id;
    if (id) navigate(`/product/${id}`);
    else navigate('/');
  }}
>
  View Listing
</button>

<button
  type="button"
  className="success-action-button success-action-secondary"
  onClick={() => {
    setPublishedData(null);
    navigate('/');
  }}
>
  Back to Home
</button>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isPublishing}
                style={{
                  width: '100%',
                  height: 60,
                  borderRadius: 16,
                  border: 'none',
                  background: 'linear-gradient(90deg,#C97B63 0%, #B86953 100%)',
                  color: '#FFFDF9',
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: isPublishing ? 'default' : 'pointer',
                  boxShadow: isPublishing ? '0 10px 30px rgba(0,0,0,0.08)' : '0 20px 50px rgba(201,123,99,0.22)',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease, opacity 0.22s ease',
                  opacity: isPublishing ? 0.9 : 1,
                }}
                onMouseEnter={(e) => { if (!isPublishing) { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 30px 70px rgba(201,123,99,0.28)'; } }}
                onMouseLeave={(e) => { if (!isPublishing) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(201,123,99,0.22)'; } }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                  {isPublishing && (
                    <span style={{ width: 20, height: 20, borderRadius: 10, border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#FFFDF9', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
                  )}
                  {isPublishing ? 'Publishing Listing...' : 'Publish Listing'}
                </span>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
              </button>
            )}
          </div>
        </form>

        {!publishedData && (
        <div
          style={{
            marginTop: "36px",
            padding: "26px 28px",
            background: "#FAF6F1",
            borderRadius: "18px",
            border: "1px solid #e8dfd6",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: "15px",
              color: "#6E5D57",
              lineHeight: "1.8",
            }}
          >
            Every item reused is one less item wasted. Thank you for choosing a more sustainable way to buy and sell.
          </p>
        </div>
        )}
      </div>
    </div>
  );
}

export default SellProduct;
