'use client'
import React, { useState } from 'react'
import useFoods from '@/hooks/useFoods'
import RestaurantCard from '@/components/RestaurantCard'
import RestaurantFormModal from '@/components/RestaurantFormModal'
import DeleteConfirmModal from '@/components/DeleteConfirmModal'
import { Food } from '@/types/Food'
import Header from '@/components/header'

export default function Page() {
  const { foods, fetchFoods, createFood, updateFood, deleteFood, loading } = useFoods()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Food | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const filtered = query ? foods.filter(f => f.name.toLowerCase().includes(query.toLowerCase())) : foods

  return (
    <section className="restaurant-page">
       <Header query={query} setQuery={setQuery} fetchFoods={fetchFoods} setShowAdd={setShowAdd} />
      
        
       <h1 className=''>Featured Meals</h1>
      

      {loading ? (
        <div className="restaurant-loading">Loading...</div>
      ) : (
        <div className="restaurant-grid">
          {filtered.length === 0 ? (
            <div className="empty-state-message">No items available</div>
          ) : (
            filtered.map(food => (
              <RestaurantCard key={food.id} food={food} onEdit={() => { setSelected(food); setShowAdd(true) }} onDelete={() => { setSelected(food); setShowDelete(true) }} />
            ))
          )}
        </div>
      )}

      {showAdd && (
        <RestaurantFormModal
          initial={selected}
          onClose={() => { setShowAdd(false); setSelected(null) }}
          onSave={async (payload) => {
            if (payload.id) await updateFood(payload as Food)
            else await createFood(payload as Food)
            setShowAdd(false)
            setSelected(null)
          }}
        />
      )}

      {showDelete && selected && (
        <DeleteConfirmModal
          onClose={() => { setShowDelete(false); setSelected(null) }}
          onConfirm={async () => {
            await deleteFood((selected as Food).id)
            setShowDelete(false)
            setSelected(null)
          }}
        />
      )}

    </section>
  )
}