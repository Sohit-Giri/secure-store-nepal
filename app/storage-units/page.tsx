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

  useEffect(() => {
    fetch('/api/storage-units')
      .then((res) => res.json())
      .then((data) => setStorageUnits(data));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/storage-units', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const newStorageUnit = await res.json();
    setStorageUnits([...storageUnits, newStorageUnit]);
    setForm({ size: '', location: '', price: '', userId: '' });
  };

  return (
    <div>
      <h1>Storage Units</h1>
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
          type="number"
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