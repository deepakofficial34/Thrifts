import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      const product = response.data.product;

      setTitle(product.title || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setExistingImage(product.image || product.imageUrl || (product.images && product.images[0]) || "");

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSaveSuccess(true);
      setIsSaving(false);

      // show success briefly, then navigate back to dashboard (preserves original routing)
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      setSaveError(error.response?.data?.message || "Update failed");
      setIsSaving(false);
      console.log(error.response?.data);
    }
  };

  const inputBaseStyle = {
    width: "100%",
    minHeight: "48px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(61,44,46,0.08)",
    background: "#FFFFFF",
    color: "#3D2C2E",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6F1", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
      <div style={{ width: "100%", maxWidth: 760, margin: "0 auto", padding: 28, background: "#FFFFFF", borderRadius: 18, boxShadow: "0 22px 56px rgba(61,44,46,0.08)", border: "1px solid rgba(61,44,46,0.06)" }}>
        <h1 style={{ margin: 0, fontSize: 26, color: "#3D2C2E", fontWeight: 800, textAlign: "center" }}>Edit Listing</h1>
        <p style={{ marginTop: 8, marginBottom: 18, color: "#7B655D", textAlign: "center" }}>Update your product information and save changes.</p>

        {saveError && (
          <div style={{ marginBottom: 12, padding: 12, borderRadius: 12, background: "#FDEDEE", border: "1px solid rgba(143,38,38,0.12)", color: "#8F2626" }}>
            <strong>Error:</strong> {saveError}
          </div>
        )}

        {saveSuccess && (
          <div style={{ marginBottom: 12, padding: 12, borderRadius: 12, background: "#ECF7EE", border: "1px solid rgba(46,106,61,0.12)", color: "#2E6A3D" }}>
            <strong>Success:</strong> Product updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "#3D2C2E" }}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputBaseStyle} onFocus={(e) => { e.target.style.borderColor = '#C97B63'; e.target.style.boxShadow = '0 6px 20px rgba(201,123,99,0.08)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(61,44,46,0.08)'; e.target.style.boxShadow = 'none'; }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "#3D2C2E" }}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} style={{ ...inputBaseStyle, resize: 'vertical', padding: '12px 14px' }} onFocus={(e) => { e.target.style.borderColor = '#C97B63'; e.target.style.boxShadow = '0 6px 20px rgba(201,123,99,0.08)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(61,44,46,0.08)'; e.target.style.boxShadow = 'none'; }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 12 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "#3D2C2E" }}>Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={inputBaseStyle} onFocus={(e) => { e.target.style.borderColor = '#C97B63'; e.target.style.boxShadow = '0 6px 20px rgba(201,123,99,0.08)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(61,44,46,0.08)'; e.target.style.boxShadow = 'none'; }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "#3D2C2E" }}>Upload Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ ...inputBaseStyle, padding: '8px 10px' }} />
            </div>
          </div>

          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#3D2C2E', marginBottom: 8 }}>Current Product Image</div>
            <div style={{ width: '100%', maxWidth: 320, borderRadius: 12, overflow: 'hidden', background: '#fff', border: '1px solid rgba(61,44,46,0.04)', boxShadow: '0 8px 20px rgba(61,44,46,0.03)', padding: 8 }}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="preview" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
              ) : existingImage ? (
                <img src={existingImage} alt="current" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
              ) : (
                <div style={{ width: '100%', height: 220, display: 'grid', placeItems: 'center', color: '#A0897F' }}>No image</div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 6 }}>
            <button type="submit" disabled={isSaving} style={{ width: '100%', height: 56, borderRadius: 14, border: 'none', background: '#C97B63', color: '#FFFFFF', fontSize: 16, fontWeight: 800, cursor: isSaving ? 'default' : 'pointer', boxShadow: isSaving ? '0 10px 30px rgba(0,0,0,0.06)' : '0 18px 46px rgba(201,123,99,0.18)', transition: 'transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease' }} onMouseEnter={(e) => { if (!isSaving) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 28px 58px rgba(201,123,99,0.22)'; } }} onMouseLeave={(e) => { if (!isSaving) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 18px 46px rgba(201,123,99,0.18)'; } }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                {isSaving && <span style={{ width: 18, height: 18, borderRadius: 9, border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#FFFFFF', animation: 'spin 1s linear infinite', display: 'inline-block' }} />}
                {isSaving ? 'Saving changes...' : 'Save Changes'}
              </span>
            </button>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
