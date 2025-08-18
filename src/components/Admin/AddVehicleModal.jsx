import { useState, useEffect } from "react"
import { X, Upload, Trash2 } from "lucide-react"
import styles from "./AddVehicleModal.module.css"

// Constants for validation
const MAX_IMAGES = 5
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MIN_DESCRIPTION_LENGTH = 20

const defaultFormData = {
  name: "",                    // Vehicle display name
  make: "",                    // Manufacturer
  model: "",                   // Model name
  year: new Date().getFullYear().toString(),  // Manufacturing year
  price: "",                   // Price in INR
  transmission: "Manual",      // Default transmission type
  ownership: "1st Owner",      // Default ownership
  drivens: "",                // Kilometers driven
  fuelType: "Petrol",         // Default fuel type
  registration: "",           // Registration number
  color: "",                  // Vehicle color
  description: "",            // Detailed description
  images: [],                 // New images to upload
  imageUrls: []               // Existing image URLs
}

export default function AddVehicleModal({
  vehicle,
  onSubmit,
  onClose,
  fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
  transmissionTypes = ['Manual', 'Automatic'],
  ownershipOptions = ['1st Owner', '2nd Owner', '3rd Owner', '4+ Owners']
}) {
  // Initialize state with default values and provided defaults for selects
  const [formData, setFormData] = useState({
    ...defaultFormData,
    transmission: vehicle?.transmission || defaultFormData.transmission,
    ownership: vehicle?.ownership || defaultFormData.ownership,
    fuelType: vehicle?.fuelType || defaultFormData.fuelType
  })
  const [imageFiles, setImageFiles] = useState([])
  const [errors, setErrors] = useState({})

  // Initialize with vehicle data when editing
  useEffect(() => {
    if (vehicle) {
      setFormData(prev => ({
        ...defaultFormData,
        ...vehicle,
        images: [], // Reset images array for editing
        // Ensure these values are set properly
        transmission: vehicle.transmission || prev.transmission,
        ownership: vehicle.ownership || prev.ownership,
        fuelType: vehicle.fuelType || prev.fuelType
      }))
      // Set existing images with preview URLs
      if (vehicle.imageUrls?.length > 0) {
        setImageFiles(vehicle.imageUrls.map(url => ({
          url: typeof url === 'string' ? url : url.url,
          existing: true
        })))
      } else {
        setImageFiles([])
      }
    }
  }, [vehicle])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // Check total number of images
    if (files.length + imageFiles.length > MAX_IMAGES) {
      setErrors(prev => ({
        ...prev,
        images: `Maximum ${MAX_IMAGES} images allowed`
      }))
      return
    }

    // Validate each file
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          images: "Only image files are allowed"
        }))
        return false
      }
      if (file.size > MAX_IMAGE_SIZE) {
        setErrors(prev => ({
          ...prev,
          images: "Image size should not exceed 5MB"
        }))
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      // Add to form data
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }))

      // Create preview URLs
      validFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setImageFiles(prev => [...prev, {
            url: event.target.result,
            file
          }])
        }
        reader.readAsDataURL(file)
      })

      // Clear error if any
      setErrors(prev => ({
        ...prev,
        images: undefined
      }))
    }
  }

  // Handle image removal
  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    // Clear error if any
    setErrors(prev => ({
      ...prev,
      images: undefined
    }))
  }

  // Form validation
  const validateForm = () => {

    console.log(formData)
    const newErrors = {}
    const currentYear = new Date().getFullYear()

    // Basic required field validation
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.make.trim()) newErrors.make = "Make is required"
    if (!formData.model.trim()) newErrors.model = "Model is required"

    // Year validation
    const year = parseInt(formData.year)
    if (!year) {
      newErrors.year = "Year is required"
    } else if (year < 1900 || year > currentYear + 1) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 1}`
    }

    // Price validation
    const price = parseFloat(formData.price)
    if (!price) {
      newErrors.price = "Price is required"
    } else if (price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    // Color validation
    if (!formData.color.trim()) newErrors.color = "Color is required"

    // Kilometers driven validation
    const drivens = parseInt(formData.drivens)
    if (!drivens && drivens !== 0) {
      newErrors.drivens = "Kilometers driven is required"
    } else if (drivens < 0) {
      newErrors.drivens = "Kilometers driven cannot be negative"
    }

    // Registration validation
    if (!formData.registration.trim()) {
      newErrors.registration = "Registration is required"
    }

    // Description validation
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < MIN_DESCRIPTION_LENGTH) {
      newErrors.description = `Description should be at least ${MIN_DESCRIPTION_LENGTH} characters`
    }

    // Dropdown validations
    if (!formData.transmission) newErrors.transmission = "Transmission is required"
    if (!formData.ownership) newErrors.ownership = "Ownership is required"
    if (!formData.fuelType) newErrors.fuelType = "Fuel type is required"

    // Image validation for new vehicles
    if (!vehicle && !imageFiles.length) {
      newErrors.images = "At least one image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form first
    if (!validateForm()) {
      return;
    }

    try {
      // Create a fresh FormData instance
      const formDataToSend = new FormData()

      // Add the ID if we're editing
      if (vehicle?._id) {
        formDataToSend.set('_id', vehicle._id)
      }

      // Add all basic fields with proper type conversions
      formDataToSend.set('name', formData.name)
      formDataToSend.set('make', formData.make)
      formDataToSend.set('model', formData.model)
      formDataToSend.set('year', parseInt(formData.year).toString())
      formDataToSend.set('price', parseFloat(formData.price).toString())
      formDataToSend.set('color', formData.color)
      formDataToSend.set('drivens', parseInt(formData.drivens).toString())
      formDataToSend.set('registration', formData.registration)
      formDataToSend.set('transmission', formData.transmission)
      formDataToSend.set('ownership', formData.ownership)
      formDataToSend.set('fuelType', formData.fuelType)
      formDataToSend.set('description', formData.description)

      // Handle new images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          formDataToSend.append('images', image, `image${index}`)
        })
      }

      // Handle existing images from imageFiles state
      if (imageFiles && imageFiles.length > 0) {
        const existingImages = imageFiles
          .filter(image => image.existing)
          .forEach(image => {
            // If the image object has url and public_id directly
            if (image.url && image.public_id) {
              formDataToSend.append('imageUrls', JSON.stringify({
                url: image.url,
                public_id: image.public_id
              }));
            }
            // If the url property is an object containing url and public_id
            else if (typeof image.url === 'object' && image.url.url && image.url.public_id) {
              formDataToSend.append('imageUrls', JSON.stringify(image.url));
            }
            // If it's just a string URL
            else {
              const url = typeof image.url === 'string' ? image.url : image.url.url;
              const urlParts = url.split('/');
              const fileName = urlParts[urlParts.length - 1];
              formDataToSend.append('imageUrls', JSON.stringify({
                url: url,
                public_id: `vehicles/${fileName.split('.')[0]}`
              }));
            }
          });
      }

      // Log FormData contents for verification
      console.log(`${vehicle ? 'Updating' : 'Creating'} vehicle - FormData contents:`)
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`)
      }

      // Log both the raw data and FormData entries
      console.log('FormData entries (verification):')
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1])
      }

      // Call the parent's submit handler with FormData
      await onSubmit(formDataToSend)

      // Reset form only for new vehicle creation
      if (!vehicle) {
        setFormData({
          ...defaultFormData,
          transmission: transmissionTypes[0] || "",
          ownership: ownershipOptions[0] || "",
          fuelType: fuelTypes[0] || ""
        })
        setImageFiles([])
        setErrors({})
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{vehicle ? "Edit Vehicle" : "Add New Vehicle"}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Basic Information */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Display Name*</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.name ? styles.error : ""}`}
                placeholder="Vehicle display name"
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="make">Make*</label>
              <input
                id="make"
                type="text"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.make ? styles.error : ""}`}
                placeholder="e.g., Toyota, Honda"
              />
              {errors.make && <span className={styles.errorText}>{errors.make}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="model">Model*</label>
              <input
                id="model"
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.model ? styles.error : ""}`}
                placeholder="e.g., Camry, Civic"
              />
              {errors.model && <span className={styles.errorText}>{errors.model}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="year">Year*</label>
              <input
                id="year"
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.year ? styles.error : ""}`}
                min="1900"
                max={new Date().getFullYear() + 1}
              />
              {errors.year && <span className={styles.errorText}>{errors.year}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Price (₹)*</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.price ? styles.error : ""}`}
                min="0"
                step="1000"
              />
              {errors.price && <span className={styles.errorText}>{errors.price}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="color">Color*</label>
              <input
                id="color"
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.color ? styles.error : ""}`}
              />
              {errors.color && <span className={styles.errorText}>{errors.color}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="drivens">Kilometers Driven*</label>
              <input
                id="drivens"
                type="number"
                name="drivens"
                value={formData.drivens}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.drivens ? styles.error : ""}`}
                min="0"
              />
              {errors.drivens && <span className={styles.errorText}>{errors.drivens}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="registration">Registration Number*</label>
              <input
                id="registration"
                type="text"
                name="registration"
                value={formData.registration}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.registration ? styles.error : ""}`}
                placeholder="e.g., MH02AB1234"
              />
              {errors.registration && <span className={styles.errorText}>{errors.registration}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="transmission">Transmission*</label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className={`${styles.select} ${errors.transmission ? styles.error : ""}`}
              >
                <option value="">Select Transmission</option>
                {transmissionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.transmission && <span className={styles.errorText}>{errors.transmission}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ownership">Ownership*</label>
              <select
                id="ownership"
                name="ownership"
                value={formData.ownership}
                onChange={handleInputChange}
                className={`${styles.select} ${errors.ownership ? styles.error : ""}`}
              >
                <option value="">Select Ownership</option>
                {ownershipOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.ownership && <span className={styles.errorText}>{errors.ownership}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fuelType">Fuel Type*</label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className={`${styles.select} ${errors.fuelType ? styles.error : ""}`}
              >
                <option value="">Select Fuel Type</option>
                {fuelTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.fuelType && <span className={styles.errorText}>{errors.fuelType}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.input ? styles.error : ""}`}
              rows="4"
              placeholder="Detailed description of the vehicle..."
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
          </div>

          <div className={styles.imageSection}>
            <label className={styles.label}>Vehicle Images* (Max 5)</label>
            <div className={styles.imageUpload}>
              <label className={styles.uploadButton}>
                <Upload size={24} />
                <span>Upload Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                  disabled={imageFiles.length >= MAX_IMAGES}
                />
              </label>
              <span className={styles.helperText}>
                Upload up to 5 images (max 5MB each)
              </span>
            </div>
            {errors.images && <span className={styles.errorText}>{errors.images}</span>}

            <div className={styles.imagePreview}>
              {imageFiles.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img
                    src={typeof image === 'string' ? image : image.url}
                    alt={`Preview ${index + 1}`}
                    className={styles.previewImage}
                  />
                  {!image.existing && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className={styles.removeImageButton}
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
            >
              {vehicle ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
