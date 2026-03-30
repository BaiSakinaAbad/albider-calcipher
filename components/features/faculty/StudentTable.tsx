"use client";

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import QrGenerator from './QrGenerator';

// 1. Define the exact shape of your Supabase data
export interface Student {
  id: string;
  name: string;
  section: string;
  contact_name: string;
  contact_relation: string;
  status: string;
  qr_token: string;
}

// 2. Tell the component to accept a 'students' prop
export default function StudentTable({ students }: { students: Student[] }) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-albider-text">Student Roster</h2>
          <button className="text-sm font-medium text-albider-blue hover:underline">
            + Add Student
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium">Authorized Contact</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* 3. Map over the real 'students' array passed from the server */}
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-albider-text">{student.name}</td>
                  <td className="p-4 text-gray-600 text-sm">
                    {student.contact_name} <span className="text-gray-400">({student.contact_relation})</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${student.status === 'Picked Up' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="text-sm font-medium text-albider-blue hover:underline px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      View QR
                    </button>
                  </td>
                </tr>
              ))}
              
              {/* Fallback if database is empty */}
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No students found. Add a student to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)}>
        {selectedStudent && (
          <div className="pt-6">
            <QrGenerator 
              studentName={selectedStudent.name} 
              guardianName={`${selectedStudent.contact_name} (${selectedStudent.contact_relation})`}
              // 4. Pass the real database token to the QR Generator!
              qrValue={selectedStudent.qr_token} 
            />
          </div>
        )}
      </Modal>
    </>
  );
}