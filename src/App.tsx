import { Layout } from './components/Layout';
import { CreateTripForm } from './components/CreateTripForm';
import { TripCard } from './components/TripCard';

import './App.css'


// Sample data for demonstration
const sampleTrip = {
  id: '1',
  name: 'Summer Adventure 2024',
  hostId: '1',
  budgetMin: 1000,
  budgetMax: 3000,
  maxDuration: 7,
  preferredSeason: 'summer',
  status: 'draft',
  createdAt: new Date(),
};

function App() {
  return (
    <Layout>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[#00263d] mb-4">Create New Trip</h2>
          <CreateTripForm />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#00263d] mb-4">Your Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TripCard trip={sampleTrip} onClick={() => console.log('Trip clicked')} />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default App;
