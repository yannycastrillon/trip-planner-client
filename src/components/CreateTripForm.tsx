import { FormEvent, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { createTrip } from '../api/trips';

import type { Season } from '../types';

export function CreateTripForm() {
  const [participants, setParticipants] = useState<{ email: string; phone?: string }[]>([{ email: '' }]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addParticipant = () => {
    setParticipants([...participants, { email: '' }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const selectSeason = (season: Season) => {
    setSelectedSeason(season);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const tripData = {
        name: formData.get('trip_name') as string,
        budget_min: parseFloat(formData.get('min_budget') as string),
        budget_max: parseFloat(formData.get('max_budget') as string),
        max_duration: parseInt(formData.get('duration') as string, 10),
        preferred_season: selectedSeason ? selectedSeason : '',
        status: 'draft',
      };

      const response = await createTrip(tripData);
      console.log('Trip created:::', response);
      form.reset();
      setSelectedSeason(null);
      setParticipants([{ email: '' }]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip');

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="trip_name" className="block text-sm font-medium text-gray-700">
          Trip Name
        </label>
        <input
          type="text"
          id="trip_name"
          name="trip_name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
          placeholder="Summer Adventure 2025"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Season
        </label>
        <div className="flex gap-4">
          {(['spring', 'summer', 'fall', 'winter'] as Season[]).map((season) => (
            <button
              key={season}
              type="button"
              onClick={() => selectSeason(season)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedSeason === season
                  ? 'bg-[#00263d] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="min_budget" className="block text-sm font-medium text-gray-700">
            Minimum Budget (USD)
          </label>
          <input
            type="number"
            id="min_budget"
            name="min_budget"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
          />
        </div>
        <div>
          <label htmlFor="max_budget" className="block text-sm font-medium text-gray-700">
            Maximum Budget (USD)
          </label>
          <input
            type="number"
            id="max_budget"
            name="max_budget"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Maximum Trip Duration (Days)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Participants</h3>
          <button
            type="button"
            onClick={addParticipant}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#d7673c] hover:bg-[#c55c35]"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Participant
          </button>
        </div>
        
        {participants.map((participant, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="email"
                name={`participant_${index}_email`}
                placeholder="Email"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
              />
            </div>
            <div className="flex-1">
              <input
                type="tel"
                name={`participant_${index}_phone`}
                placeholder="Phone (optional)"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeParticipant(index)}
                className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
              >
                <Minus className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00263d] hover:bg-[#001f33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00263d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Trip...' : 'Create Trip'}
        </button>
      </div>
    </form>
  );
}