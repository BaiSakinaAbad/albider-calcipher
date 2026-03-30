import React from 'react';
import { Users, GraduationCap, Clock, ShieldAlert, Activity } from 'lucide-react';

export default function SuperadminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-bold text-albider-blue">Executive Overview</h1>
        <p className="text-gray-500 text-sm mt-1">System-wide metrics and security logs.</p>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "1,240", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Parents", value: "1,850", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Active Faculty", value: "85", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Today's Pick-ups", value: "412", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-albider-text">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Audit Trail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dismissal Efficiency Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1">
          <h2 className="text-lg font-bold text-albider-text mb-4">Dismissal Efficiency</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Avg. Daily Pick-ups</p>
              <p className="text-xl font-bold text-albider-blue">1,150 / day</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">On-Time Rate</p>
              <p className="text-xl font-bold text-albider-green">94.2%</p>
            </div>
          </div>
        </div>

        {/* System Logs / Audit Trail */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-albider-text flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-gray-400" />
              Recent System Logs
            </h2>
            <button className="text-sm text-albider-blue hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 bg-gray-50">
                <tr>
                  <th className="py-2 px-4 font-medium rounded-tl-lg">Timestamp</th>
                  <th className="py-2 px-4 font-medium">Action</th>
                  <th className="py-2 px-4 font-medium">User</th>
                  <th className="py-2 px-4 font-medium rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 text-gray-500">10:42 AM</td>
                  <td className="py-3 px-4 text-albider-text font-medium">QR Scanned (Gate A)</td>
                  <td className="py-3 px-4">Officer Reyes</td>
                  <td className="py-3 px-4"><span className="text-albider-green font-medium">Verified</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-500">10:38 AM</td>
                  <td className="py-3 px-4 text-albider-text font-medium">Class Ended Triggered</td>
                  <td className="py-3 px-4">Mrs. Santos (Gr. 3)</td>
                  <td className="py-3 px-4"><span className="text-albider-green font-medium">Success</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}