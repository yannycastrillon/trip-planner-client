import { FC } from 'react';
import { Calendar, Users, DollarSign } from 'lucide-react';
import type { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onClick?: () => void;
}

export const TripCard: FC<TripCardProps> = ({ trip, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-[#00263d] mb-4">{trip.name}</h3>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-2 text-[#d7673c]" />
          <span>Max {trip.maxDuration} days</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-5 w-5 mr-2 text-[#d7673c]" />
          <span>${trip.budgetMin} - ${trip.budgetMax}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="h-5 w-5 mr-2 text-[#d7673c]" />
          <span>Group Trip</span>
        </div>
      </div>
      <div className="mt-4">
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${trip.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
          ${trip.status === 'survey' ? 'bg-blue-100 text-blue-800' : ''}
          ${trip.status === 'voting' ? 'bg-[#fdc221] text-[#00263d]' : ''}
          ${trip.status === 'finalized' ? 'bg-green-100 text-green-800' : ''}
        `}>
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </span>
      </div>
    </div>
  );
}