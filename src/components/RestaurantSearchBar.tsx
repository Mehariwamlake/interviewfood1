'use client'
import React from 'react'

type Props = { value: string; onChange: (v: string) => void; }

export default function RestaurantSearchBar({ value, onChange }: Props) {
  return (
    <div className="restaurant-searchbar">
      <label htmlFor="restaurant-search" className="sr-only">Search restaurants</label>
      <input id="restaurant-search" name="restaurant_search" placeholder="Enter restaurant name" value={value} onChange={(e) => onChange(e.target.value)} className="restaurant-input" />
      <button className="restaurant-btn"  aria-label="Refresh">Find Meal</button>
    </div>
  )
}
