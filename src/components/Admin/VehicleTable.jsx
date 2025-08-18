"use client"
import { Edit, Trash2 } from "lucide-react"
import styles from "./VehicleTable.module.css"

export default function VehicleTable({ vehicles, onEdit, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatKms = (kms) => {
    return `${(kms / 1000).toFixed(1)}k kms`
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Vehicle</th>
            <th className={styles.headerCell}>Make</th>
            <th className={styles.headerCell}>Model</th>
            <th className={styles.headerCell}>Year</th>
            <th className={styles.headerCell}>Price</th>
            <th className={styles.headerCell}>Specs</th>
            <th className={styles.headerCell}>Registration</th>
            <th className={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id} className={styles.row}>
              <td className={styles.cell}>
                <div className={styles.nameCell}>
                  <img
                    src={vehicle.imageUrls[0]?.url || "/placeholder.svg"}
                    alt={`${vehicle.name || `${vehicle.make} ${vehicle.model}`}`}
                    className={styles.vehicleImage}
                  />
                  <span className={styles.vehicleName}>{vehicle.name || `${vehicle.make} ${vehicle.model}`}</span>
                </div>
              </td>
              <td className={styles.cell}>{vehicle.make}</td>
              <td className={styles.cell}>{vehicle.model}</td>
              <td className={styles.cell}>{vehicle.year}</td>
              <td className={styles.cell}>
                <span className={styles.price}>{formatPrice(vehicle.price)}</span>
              </td>
              <td className={styles.cell}>
                <div className={styles.specsList}>
                  <span>{vehicle.transmission}</span>
                  <span>{formatKms(vehicle.drivens)}</span>
                  <span>{vehicle.fuelType}</span>
                </div>
              </td>
              <td className={styles.cell}>{vehicle.registration}</td>
              <td className={styles.cell}>
                <div className={styles.actions}>
                  <button
                    onClick={() => onEdit(vehicle)}
                    className={`${styles.actionButton} ${styles.editButton}`}
                    title="Edit vehicle"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this vehicle?')) {
                        onDelete(vehicle._id);
                      }
                    }}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    title="Delete vehicle"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {vehicles.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No vehicles found</p>
        </div>
      )}
    </div>
  )
}
