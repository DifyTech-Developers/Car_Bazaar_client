
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import AddVehicleModal from "../components/Modal/AddVehicleModal"
import { cars as initialCars } from "../data/mockData"
import { Plus, Pencil, Trash2 } from "lucide-react"
import '../styles/admin.css'

export default function AdminDashboardPage() {
  const [cars, setCars] = useState(initialCars)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null) // Placeholder for edit functionality

  const filteredCars = cars.filter((car) =>
    Object.values(car).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAddVehicle = (newCarData) => {
    // In a real app, you'd send this to a backend and get an ID
    const newCar = {
      ...newCarData,
      id: String(cars.length + 1 + Math.random()), // Ensure unique ID for new cars
      image:
        newCarData.images && newCarData.images.length > 0
          ? newCarData.images[0]
          : "/placeholder.svg?height=400&width=600",
      images: newCarData.images || ["/placeholder.svg?height=400&width=600"],
      specs: {
        // Add default specs if not provided by form (form only has basic fields)
        engine: "N/A",
        horsepower: "N/A",
        "0-60mph": "N/A",
        topSpeed: "N/A",
        luxuryFeatures: "N/A",
      },
    }
    setCars((prevCars) => [...prevCars, newCar])
  }

  const handleDeleteVehicle = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id))
  }

  return (
    <div className="admin-dashboard-wrapper">
      <Navbar />

      <main className="admin-dashboard-wrapper-main">
        {" "}
        {/* Renamed for clarity */}
        <div className="admin-dashboard-container">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>

          {/* Top Section */}
          <div className="admin-top-section">
            <div className="admin-search-bar-wrapper">
              <SearchBar
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="admin-add-vehicle-button">
              <Plus className="icon" />
              Add Vehicle
            </button>
          </div>

          {/* Vehicles Table */}
          <div className="vehicles-table-wrapper">
            <table className="vehicles-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Transmission</th>
                  <th>Year</th>
                  <th>Ownership</th>
                  <th>Driven</th>
                  <th>Fuel Type</th>
                  <th>Registration</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                    <tr key={car.id}>
                      <td className="name">{car.name}</td>
                      <td>{car.make}</td>
                      <td>{car.model}</td>
                      <td>{car.transmission}</td>
                      <td>{car.year}</td>
                      <td>{car.ownership}</td>
                      <td>{car.driven}</td>
                      <td>{car.fuelType}</td>
                      <td>{car.registration}</td>
                      <td>{car.color}</td>
                      <td className="price">{car.price}</td>
                      <td className="actions">
                        <div className="vehicles-table-actions-wrapper">
                          <button
                            className="vehicles-table-action-button edit"
                            onClick={() => setEditingCar(car)} // Placeholder for edit
                            aria-label="Edit vehicle"
                          >
                            <Pencil className="icon" />
                          </button>
                          <button
                            className="vehicles-table-action-button delete"
                            onClick={() => handleDeleteVehicle(car.id)}
                            aria-label="Delete vehicle"
                          >
                            <Trash2 className="icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="vehicles-table-no-results">
                      No vehicles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AddVehicleModal
        isOpen={isAddModalOpen || !!editingCar}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingCar(null)
        }}
        onSave={handleAddVehicle}
      />
      <Footer />
    </div>
  )
}
