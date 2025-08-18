import api from './api';

export const vehicleService = {
  // Create a new vehicle
  createVehicle: async (vehicleData) => {
    try {
      // If vehicleData is already FormData, use it directly
      if (vehicleData instanceof FormData) {
        const response = await api.post('/admin/vehicles', vehicleData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      }

      // Otherwise, create new FormData
      const formData = new FormData();

      // Append vehicle data
      Object.keys(vehicleData).forEach(key => {
        if (key === 'images') {
          if (vehicleData.images) {
            vehicleData.images.forEach(image => {
              formData.append('images', image);
            });
          }
        } else if (key === 'imageUrls') {
          if (vehicleData.imageUrls) {
            vehicleData.imageUrls.forEach(url => {
              formData.append('imageUrls', url);
            });
          }
        } else {
          formData.append(key, vehicleData[key].toString());
        }
      });

      const response = await api.post('/admin/vehicles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all vehicles (admin view)
  getAllVehicles: async () => {
    try {
      const response = await api.get('/admin/vehicles');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update a vehicle
  updateVehicle: async (id, vehicleData) => {
    try {
      if (!id) {
        throw new Error('Vehicle ID is required for update');
      }

      // If vehicleData is already FormData, use it directly
      if (vehicleData instanceof FormData) {
        const response = await api.put(`/admin/vehicles/${id}`, vehicleData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      }

      // Otherwise, create new FormData
      const formDataToSend = new FormData();

      // Add all text fields
      Object.keys(vehicleData).forEach(key => {
        if (key === 'images') {
          if (vehicleData.images) {
            vehicleData.images.forEach(image => {
              formDataToSend.append('images', image);
            });
          }
        } else if (key === 'imageUrls') {
          if (vehicleData.imageUrls) {
            vehicleData.imageUrls.forEach(url => {
              formDataToSend.append('imageUrls', url);
            });
          }
        } else {
          // Convert all values to string and handle null/undefined
          const value = vehicleData[key] != null ? vehicleData[key].toString() : '';
          formDataToSend.set(key, value);
        }
      });

      const response = await api.put(`/admin/vehicles/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a vehicle
  deleteVehicle: async (id) => {
    try {
      if (!id) {
        throw new Error('Vehicle ID is required for deletion');
      }

      const response = await api.delete(`/admin/vehicles/${id}`);

      // Check if deletion was successful
      if (response.status !== 200) {
        throw new Error('Failed to delete vehicle');
      }

      return response.data;
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error.response.data || { message: 'Server error while deleting vehicle' };
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server while deleting vehicle');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw error.message || 'Error deleting vehicle';
      }
    }
  },
};
