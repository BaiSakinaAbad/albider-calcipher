import React from 'react';
import { Users, Clock } from 'lucide-react';
import ClassEndedButton from '@/components/features/faculty/ClassEndedButton';
import StudentTable from '@/components/features/faculty/StudentTable';
// 1. Import your server-side Supabase client
import { createClient } from '@/lib/supabase/server';

export default async function FacultyDashboard() {
  // 2. Initialize the client
  const supabase = await createClient();

  // 3. Fetch all students from the database
  const { data: students, error } = await supabase
    .from('students')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching students:', error);
  }

  // Calculate dynamic metrics for the top cards
  const totalStudents = students?.length || 0;
  const waitingStudents = students?.filter(s => s.status === 'Waiting').length || 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-albider-blue">Grade 3 - Apollo</h1>
          <p className="text-gray-500 text-sm mt-1">Manage dismissals and verify pick-up statuses.</p>
        </div>
        <ClassEndedButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-albider-blue rounded-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Students</p>
            {/* Display the real total */}
            <p className="text-2xl font-bold text-albider-text">{totalStudents}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Waiting for Pick-up</p>
            {/* Display the real waiting count */}
            <p className="text-2xl font-bold text-albider-text">{waitingStudents}</p>
          </div>
        </div>
      </div>

      {/* 4. Pass the fetched data down to the Client Component */}
      <StudentTable students={students || []} />

    </div>
  );
}