"use client";

import { useState, useEffect, FormEvent } from 'react';

interface StorageUnit {
  id: number;
  size: string;
  location: string;
  price: number;
}

export default function StorageUnits() {
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);
  const [form, setForm] = useState({ size: '', location: '', price: '', userId: '' });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/storage-units');
        const data = await res.json();
        if (Array.isArray(data)) {
          setStorageUnits(data);
        } else {
          console.error('Expected an array but got:', data);
          setMessage('Failed to fetch storage units.');
        }
      } catch (error) {
        console.error('Error fetching storage units:', error);
        setMessage('Failed to fetch storage units.');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/storage-units', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const newStorageUnit = await res.json();
        setStorageUnits([...storageUnits, newStorageUnit]);
        setForm({ size: '', location: '', price: '', userId: '' });
        setMessage('Storage unit added successfully!');
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating storage unit:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h1>Storage Units</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Size"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="User ID"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
        />
        <button type="submit">Add Storage Unit</button>
      </form>
      <ul>
        {storageUnits.map((unit) => (
          <li key={unit.id}>
            {unit.size} - {unit.location} - ${unit.price}
          </li>
        ))}
      </ul>
    </div>
  );
}