import { Food } from '@/types/Food'
import { useCallback, useEffect, useState } from 'react'

const API_URL = 'https://6852821e0594059b23cdd834.mockapi.io/Food'

export default function useFoods() {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFoods = useCallback(async (search?: string) => {
    try {
      setLoading(true)
      const url = search ? `${API_URL}?name=${encodeURIComponent(search)}` : API_URL
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch')
      const data: Food[] = await res.json()
      setFoods(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createFood = useCallback(async (newFood: Omit<Food, 'id'>) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFood)
      })
      if (!res.ok) throw new Error('Failed to create')
      const data: Food = await res.json()
      setFoods(prev => [...prev, data])
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [])

  const updateFood = useCallback(async (updatedFood: Food) => {
    try {
      const res = await fetch(`${API_URL}/${updatedFood.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFood)
      })
      if (!res.ok) throw new Error('Failed to update')
      const data: Food = await res.json()
      setFoods(prev => prev.map(f => f.id === data.id ? data : f))
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [])

  const deleteFood = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setFoods(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  return { foods, loading, fetchFoods, createFood, updateFood, deleteFood }
}