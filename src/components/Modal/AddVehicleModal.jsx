
import { useState } from "react"
import { X, Plus } from "lucide-react" // Added Plus icon for image upload
import '../../styles/modals.css'

export default function AddVehicleModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    make: "",
    model: "",
    transmission: "",
    year: "",
    ownership: "",
    driven: "",
    fuelType: "",
    registration: "",
    color: "",
    price: "",
  })
  const [imagePreviews, setImagePreviews] = useState([])
  const [imageFiles, setImageFiles] = useState([])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const newImageFiles = [...imageFiles, ...files].slice(0, 5) // Max 5 images
    setImageFiles(newImageFiles)

    const newPreviews = []
    newImageFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result)
        if (newPreviews.length === newImageFiles.length) {
          setImagePreviews(newPreviews)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (indexToRemove) => {
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove))
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you'd handle image uploads (e.g., to Vercel Blob) and then save car data
    onSave({ ...formData, images: imageFiles.map((file, index) => imagePreviews[index]) }) // Pass previews as mock images
    setFormData({
      name: "",
      make: "",
      model: "",
      transmission: "",
      year: "",
      ownership: "",
      driven: "",
      fuelType: "",
      registration: "",
      color: "",
      price: "",
    })
    setImagePreviews([])
    setImageFiles([])
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container add-vehicle-modal-container">
        {/* Modal Header */}
        <div className="modal-header add-vehicle-modal-header">
          <h2 className="modal-title">Add New Vehicle</h2>
          <button onClick={onClose} className="modal-close-button" aria-label="Close">
            <X className="icon" />
          </button>
        </div>

        {/* Modal Description */}
        <p className="add-vehicle-modal-description">Enter the details for the new luxury vehicle.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="add-vehicle-form">
          <div className="add-vehicle-form-group">
            <label htmlFor="name" className="add-vehicle-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="add-vehicle-input"
              required
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="make" className="add-vehicle-label">
              Make
            </label>
            <input
              type="text"
              id="make"
              value={formData.make}
              onChange={handleChange}
              className="add-vehicle-input"
              required
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="model" className="add-vehicle-label">
              Model
            </label>
            <input
              type="text"
              id="model"
              value={formData.model}
              onChange={handleChange}
              className="add-vehicle-input"
              required
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="transmission" className="add-vehicle-label">
              Transmission
            </label>
            <input
              type="text"
              id="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="add-vehicle-input"
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="year" className="add-vehicle-label">
              Year
            </label>
            <input
              type="number"
              id="year"
              value={formData.year}
              onChange={handleChange}
              className="add-vehicle-input"
              required
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="ownership" className="add-vehicle-label">
              Ownership
            </label>
            <input
              type="text"
              id="ownership"
              value={formData.ownership}
              onChange={handleChange}
              className="add-vehicle-input"
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="driven" className="add-vehicle-label">
              Driven (km)
            </label>
            <input
              type="text"
              id="driven"
              value={formData.driven}
              onChange={handleChange}
              className="add-vehicle-input"
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="fuelType" className="add-vehicle-label">
              Fuel Type
            </label>
            <input
              type="text"
              id="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="add-vehicle-input"
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="registration" className="add-vehicle-label">
              Registration
            </label>
            <input
              type="text"
              id="registration"
              value={formData.registration}
              onChange={handleChange}
              className="add-vehicle-input"
            />
          </div>
          <div className="add-vehicle-form-group">
            <label htmlFor="color" className="add-vehicle-label">
              Color
            </label>
            <input
              type="text"
              id="color"
              value={formData.color}
              onChange={handleChange}
              className="add-vehicle-input"
            />
          </div>
          <div className="add-vehicle-form-group full-width">
            <label htmlFor="price" className="add-vehicle-label">
              Price
            </label>
            <input
              type="text"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="add-vehicle-input"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="add-vehicle-image-upload-section">
            <label htmlFor="image-upload" className="add-vehicle-image-upload-label">
              Upload Images (Max 5)
            </label>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="add-vehicle-image-preview-wrapper">
              {imagePreviews.map((src, index) => (
                <div key={index} className="add-vehicle-image-preview-item">
                  <img src={src || "/placeholder.svg"} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="add-vehicle-remove-image-button"
                    aria-label="Remove image"
                  >
                    <X className="icon" />
                  </button>
                </div>
              ))}
              {imageFiles.length < 5 && (
                <label htmlFor="image-upload" className="add-vehicle-add-image-label">
                  <Plus className="icon" />
                  <span className="sr-only">Add Image</span>
                </label>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="modal-action-button cancel">
              Cancel
            </button>
            <button type="submit" className="modal-action-button save">
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

