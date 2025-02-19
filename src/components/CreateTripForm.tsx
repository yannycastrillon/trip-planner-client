import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Season } from '../types';

export function CreateTripForm() {
  const [participants, setParticipants] = useState<{ email: string; phone?: string }[]>([{ email: '' }]);
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);

  const addParticipant = () => {
    setParticipants([...participants, { email: '' }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const toggleSeason = (season: Season) => {
    if (selectedSeasons.includes(season)) {
      setSelectedSeasons(selectedSeasons.filter(s => s !== season));
    } else {
      setSelectedSeasons([...selectedSeasons, season]);
    }
  };

  return (
    <form className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="tripName" className="block text-sm font-medium text-gray-700">
          Trip Name
        </label>
        <input
          type="text"
          id="tripName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
          placeholder="Summer Adventure 2024"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Seasons
        </label>
        <div className="flex gap-4">
          {(['spring', 'summer', 'fall', 'winter'] as Season[]).map((season) => (
            <button
              key={season}
              type="button"
              onClick={() => toggleSeason(season)}
              className={`px-4 py-2 rounded-md ${
                selectedSeasons.includes(season)
                  ? 'bg-[#00263d] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="minBudget" className="block text-sm font-medium text-gray-700">
            Minimum Budget (USD)
          </label>
          <input
            type="number"
            id="minBudget"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
          />
        </div>
        <div>
          <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700">
            Maximum Budget (USD)
          </label>
          <input
            type="number"
            id="maxBudget"
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
                placeholder="Email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d7673c] focus:ring-[#d7673c]"
              />
            </div>
            <div className="flex-1">
              <input
                type="tel"
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
          className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00263d] hover:bg-[#001f33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00263d]"
        >
          Create Trip
        </button>
      </div>
    </form>
  );
}