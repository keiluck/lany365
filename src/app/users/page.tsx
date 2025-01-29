"use client"
import React from 'react'
import { useEffect, useState } from 'react';

interface User {
    id: string;
    title: string;
    description: string;
  }
  
  const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/blogs');
        console.log('111')
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/blogs', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        setTitle('');
        setDescription('');
        fetchUsers();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
        <form onSubmit={addUser} className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name"
            required
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            required
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Add User
          </button>
        </form>
        {users.length > 0 ? (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="p-3 bg-gray-100 rounded shadow">
                <span className="font-semibold">{user.title}</span> - {user.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No users found. Add a user to get started!</p>
        )}
      </div>
    );
  };
  
  export default UserPage;
