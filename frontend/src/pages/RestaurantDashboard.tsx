import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { BarChart3, Package, Clock, MapPin, TrendingUp } from 'lucide-react';

interface RestaurantDashboardProps {
  restaurantName: string;
}

export const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({ restaurantName }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'listings' | 'requests'>('stats');

  const stats = {
    totalListings: 12,
    activeDonations: 8,
    completedDonations: 45,
    totalImpact: '320 meals saved',
    thisMonth: 28,
    thisWeek: 7,
  };

  // Mock data
  const myListings = [
    {
      id: 1,
      foodItem: 'Pizza Slices',
      quantity: '20 slices',
      status: 'AVAILABLE' as const,
      expiresAt: 'Today, 9:00 PM',
      requests: 3,
    },
    {
      id: 2,
      foodItem: 'Pasta Dishes',
      quantity: '5 portions',
      status: 'RESERVED' as const,
      reservedBy: 'John Doe',
      pickupTime: '7:00 PM',
    },
    {
      id: 3,
      foodItem: 'Salad Bowls',
      quantity: '10 bowls',
      status: 'AVAILABLE' as const,
      expiresAt: 'Today, 8:00 PM',
      requests: 5,
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      userName: 'Jane Smith',
      foodItem: 'Pizza Slices',
      quantity: '5 slices',
      status: 'PENDING' as const,
      requestedAt: '10 mins ago',
    },
    {
      id: 2,
      userName: 'Mike Johnson',
      foodItem: 'Pasta Dishes',
      quantity: '2 portions',
      status: 'PENDING' as const,
      requestedAt: '25 mins ago',
    },
    {
      id: 3,
      userName: 'Sarah Lee',
      foodItem: 'Salad Bowls',
      quantity: '3 bowls',
      status: 'PENDING' as const,
      requestedAt: '1 hour ago',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{restaurantName}</h1>
              <p className="text-lg text-gray-600">Manage your donations and make an impact</p>
            </div>
            <Button className="hidden md:block">+ New Listing</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-2 rounded-2xl shadow-md flex-wrap">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 min-w-max py-3 px-6 font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 ${activeTab === 'stats'
                ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <BarChart3 size={20} />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 min-w-max py-3 px-6 font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 ${activeTab === 'listings'
                ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Package size={20} />
            <span>My Listings</span>
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 min-w-max py-3 px-6 font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 ${activeTab === 'requests'
                ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Clock size={20} />
            <span>Requests ({pendingRequests.length})</span>
          </button>
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <div className="p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-gray-900">{stats.activeDonations}</div>
                  <div className="text-gray-600">Active Listings</div>
                </div>
              </Card>
              <Card>
                <div className="p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-gray-900">{stats.completedDonations}</div>
                  <div className="text-gray-600">Completed</div>
                </div>
              </Card>
              <Card>
                <div className="p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-gray-900">{stats.thisMonth}</div>
                  <div className="text-gray-600">This Month</div>
                </div>
              </Card>
              <Card>
                <div className="p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-2xl font-bold text-emerald-600">{stats.totalImpact}</div>
                  <div className="text-gray-600">Total Impact</div>
                </div>
              </Card>
            </div>

            {/* Impact Chart */}
            <Card>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Impact Overview</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-semibold">This Week</span>
                      <span className="text-emerald-600 font-bold">{stats.thisWeek} meals</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-linear-to-r from-emerald-500 to-teal-500 h-4 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-semibold">This Month</span>
                      <span className="text-teal-600 font-bold">{stats.thisMonth} meals</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-linear-to-r from-teal-500 to-cyan-500 h-4 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-semibold">All Time</span>
                      <span className="text-cyan-600 font-bold">{stats.totalImpact}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-linear-to-r from-cyan-500 to-blue-500 h-4 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {myListings.map((listing) => (
              <Card key={listing.id}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{listing.foodItem}</h3>
                      <p className="text-gray-600">Quantity: {listing.quantity}</p>
                    </div>
                    <Badge
                      variant={
                        listing.status === 'AVAILABLE'
                          ? 'success'
                          : listing.status === 'RESERVED'
                            ? 'warning'
                            : 'default'
                      }
                    >
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      {listing.status === 'AVAILABLE' ? (
                        <>
                          <span className="font-semibold">Expires:</span> {listing.expiresAt}
                          <span className="ml-4 font-semibold">{listing.requests} requests</span>
                        </>
                      ) : (
                        <>
                          <span className="font-semibold">Reserved by:</span> {listing.reservedBy}
                          <span className="ml-4">Pickup: {listing.pickupTime}</span>
                        </>
                      )}
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">Edit</Button>
                      <Button variant="ghost">Delete</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{request.foodItem}</h3>
                      <p className="text-gray-600">Requested by: {request.userName}</p>
                      <p className="text-sm text-gray-500">Quantity: {request.quantity} • {request.requestedAt}</p>
                    </div>
                    <Badge variant="warning">{request.status}</Badge>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="flex-1">Approve</Button>
                    <Button variant="outline" className="flex-1">Reject</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
