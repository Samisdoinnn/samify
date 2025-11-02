'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, Package, Heart, MapPin, CreditCard, 
  Settings, LogOut, ChevronRight, Star, Truck 
} from 'lucide-react';
import Image from 'next/image';
import GSAPScrollReveal from '@/components/gsap/GSAPScrollReveal';

interface Order {
  id: string;
  date: Date;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: new Date('2024-10-20'),
    status: 'delivered',
    total: 159.99,
    items: 2,
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-2024-002',
    date: new Date('2024-10-25'),
    status: 'shipped',
    total: 89.99,
    items: 1,
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-2024-003',
    date: new Date('2024-10-28'),
    status: 'processing',
    total: 249.99,
    items: 3
  }
];

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'addresses' | 'payment' | 'settings'>('overview');

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2024',
    totalOrders: 12,
    totalSpent: 1249.99,
    loyaltyPoints: 1250
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mx-auto mb-3">
                  {user.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-2">Member since {user.memberSince}</p>
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <GSAPScrollReveal>
                  <h1 className="text-3xl font-bold mb-6">Account Overview</h1>

                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Total Orders</span>
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-3xl font-bold">{user.totalOrders}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Total Spent</span>
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-3xl font-bold">${user.totalSpent.toFixed(2)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Loyalty Points</span>
                        <Star className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-3xl font-bold">{user.loyaltyPoints}</p>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Recent Orders</h2>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-primary hover:underline text-sm font-semibold"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition"
                        >
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {order.date.toLocaleDateString()} • {order.items} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${order.total.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GSAPScrollReveal>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <GSAPScrollReveal>
                  <h1 className="text-3xl font-bold mb-6">My Orders</h1>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              Placed on {order.date.toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-sm text-gray-600">{order.items} items</p>
                            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                          </div>
                          <div className="flex gap-2">
                            {order.trackingNumber && (
                              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition">
                                <Truck className="w-4 h-4" />
                                Track Order
                              </button>
                            )}
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GSAPScrollReveal>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <GSAPScrollReveal>
                  <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
                  <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                    <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                    <Link
                      href="/shop"
                      className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
                    >
                      Start Shopping
                    </Link>
                  </div>
                </GSAPScrollReveal>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <GSAPScrollReveal>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Saved Addresses</h1>
                    <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                      Add New Address
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 border-2 border-primary">
                      <div className="flex items-start justify-between mb-4">
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Default</span>
                        <button className="text-gray-400 hover:text-primary">Edit</button>
                      </div>
                      <h3 className="font-bold mb-2">Home</h3>
                      <p className="text-gray-600 text-sm">
                        123 Main Street<br />
                        Apartment 4B<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                      <p className="text-sm text-gray-600 mt-4">{user.phone}</p>
                    </div>
                  </div>
                </GSAPScrollReveal>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div>
                <GSAPScrollReveal>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Payment Methods</h1>
                    <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                      Add New Card
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl p-6">
                      <div className="flex items-start justify-between mb-8">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">Default</span>
                        <CreditCard className="w-8 h-8" />
                      </div>
                      <p className="text-2xl font-mono mb-4">•••• •••• •••• 4242</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs opacity-70">Card Holder</p>
                          <p className="font-semibold">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-70">Expires</p>
                          <p className="font-semibold">12/25</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GSAPScrollReveal>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <GSAPScrollReveal>
                  <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
                    <div>
                      <label className="block font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="pt-4">
                      <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </GSAPScrollReveal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
