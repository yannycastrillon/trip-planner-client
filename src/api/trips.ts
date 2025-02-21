import client from "./client";

export const getTrips = async () => {
  try {
    const response = await client.get("/trips");

    return response.data;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const getTrip = async (id: string) => {
  try {
    const response = await client.get(`/trips/${id}`);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};

interface Trip {
  name: string;
  max_duration: number;
  budget_min: number;
  budget_max: number;
  preferred_season: string;
}

export const createTrip = async (trip: Trip) => {
  try {
    const response = await client.post("/trips", trip);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};

export const updateTrip = async (id: string, trip: Trip) => {
  try {
    const response = await client.put(`/trips/${id}`, trip);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};
