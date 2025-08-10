'use client';
import React from 'react';
import { Food } from '@/types/Food';
import Image from 'next/image';

export default function RestaurantCard({
  food,
  onEdit,
  onDelete,
}: {
  food: Food;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article
      className="restaurant-card border rounded p-3 shadow-md flex flex-col gap-2"
      data-testid={`restaurant-card-${food.id}`}
    >
      <Image
        src={food.image ?? '/default-image.jpg'}
        alt={food.name}
        className="restaurant-image w-full h-40 object-cover rounded"
      />
      <div className="restaurant-body">
        {/* Name & Rating */}
        <h3 className="font-semibold text-sm">{food.name}</h3>
        <p className="text-xs text-gray-500">⭐ {food.rating || 'N/A'}</p>

        {food.open && (
          <p
            className={`restaurant-status font-semibold ${
              food.status === 'Open'
                ? 'text-green-600'
                : food.status === 'Closed'
                ? 'text-red-600'
                : 'text-yellow-600'
            }`}
          >
            {food.status}
          </p>
        )}

        <div className="restaurant-actions flex gap-2 mt-2">
          <button
            className="restaurant-edit bg-blue-500 text-white px-3 py-1 rounded"
            onClick={onEdit}
            data-testid="restaurant-edit-btn"
          >
            Edit
          </button>
          <button
            className="restaurant-delete bg-red-500 text-white px-3 py-1 rounded"
            onClick={onDelete}
            data-testid="restaurant-delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
