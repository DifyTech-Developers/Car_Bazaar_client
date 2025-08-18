"use client"
import { useState, useMemo } from "react"
import { Search, Plus, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import VehicleTable from "./VehicleTable"
import AddVehicleModal from "./AddVehicleModal"
import { vehicleService } from "../../services/vehicleService"
import styles from "./AdminDashboard.module.css"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"]
const TRANSMISSION_TYPES = ["Manual", "Automatic"]
const OWNERSHIP_OPTIONS = ["1st Owner", "2nd Owner", "3rd Owner", "4+ Owners"]

export default function AdminDashboard() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)

  // ✅ Fetch vehicles with React Query
  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehicleService.getAllVehicles,
  })

  // ✅ Derived filtered list
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(
      (vehicle) =>
        vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.registration?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [vehicles, searchTerm])

  // ✅ Add Vehicle Mutation
  const addVehicleMutation = useMutation({
    mutationFn: vehicleService.createVehicle,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["vehicles"])
      setIsAddModalOpen(false)
      toast.success("Vehicle added successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add vehicle")
    },
  })

  // ✅ Update Vehicle Mutation
  const updateVehicleMutation = useMutation({
    mutationFn: ({ id, data }) => vehicleService.updateVehicle(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["vehicles"])
      setEditingVehicle(null)
      setIsAddModalOpen(false)
      toast.success("Vehicle updated successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update vehicle")
    },
  })

  // ✅ Delete Vehicle Mutation
  const deleteVehicleMutation = useMutation({
    mutationFn: vehicleService.deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"])
      toast.success("Vehicle deleted successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete vehicle")
    },
  })

  // ✅ Handlers
  const handleAddVehicle = async (newVehicle) => {
    addVehicleMutation.mutate(newVehicle)
  }

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle)
    setIsAddModalOpen(true)
  }

  const handleUpdateVehicle = async (updatedVehicle) => {
    try {
      const loadingToastId = toast.loading("Updating vehicle...")

      if (updatedVehicle instanceof FormData) {
        updateVehicleMutation.mutate(
          { id: editingVehicle._id, data: updatedVehicle },
          {
            onSuccess: () => {
              toast.success("Vehicle updated successfully", {
                id: loadingToastId,
              })
            },
            onError: (error) => {
              toast.error(error.message || "Failed to update vehicle", {
                id: loadingToastId,
              })
            },
          }
        )
        return
      }

      // Convert normal object to FormData
      const formData = new FormData()
      Object.keys(updatedVehicle).forEach((key) => {
        if (key !== "images" && key !== "_id" && key !== "imageUrls") {
          formData.append(key, updatedVehicle[key].toString())
        }
      })

      updateVehicleMutation.mutate(
        { id: updatedVehicle._id, data: formData },
        {
          onSuccess: () => {
            toast.success("Vehicle updated successfully", {
              id: loadingToastId,
            })
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update vehicle", {
              id: loadingToastId,
            })
          },
        }
      )
    } catch (error) {
      console.error("Update vehicle error:", error)
      toast.error(error.message || "Failed to update vehicle")
    }
  }

  const handleDeleteVehicle = (vehicleId) => {
    const loadingToastId = toast.loading("Deleting vehicle...")
    deleteVehicleMutation.mutate(vehicleId, {
      onSuccess: () => {
        toast.success("Vehicle deleted successfully", { id: loadingToastId })
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete vehicle", {
          id: loadingToastId,
        })
      },
    })
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingVehicle(null)
  }

  if (isError) {
    toast.error(error.message || "Failed to fetch vehicles")
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link to="/" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Website
          </Link>
          <h1 className={styles.title}>Vehicle Management</h1>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search by make, model, or registration..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className={styles.addButton}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={20} />
            Add Vehicle
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{vehicles.length}</span>
            <span className={styles.statLabel}>Total Vehicles</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{filteredVehicles.length}</span>
            <span className={styles.statLabel}>Filtered Results</span>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading vehicles...</div>
        ) : (
          <VehicleTable
            vehicles={filteredVehicles}
            onEdit={handleEditVehicle}
            onDelete={handleDeleteVehicle}
          />
        )}
      </div>

      {isAddModalOpen && (
        <AddVehicleModal
          vehicle={editingVehicle}
          onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
          onClose={handleCloseModal}
          fuelTypes={FUEL_TYPES}
          transmissionTypes={TRANSMISSION_TYPES}
          ownershipOptions={OWNERSHIP_OPTIONS}
        />
      )}
    </div>
  )
}
