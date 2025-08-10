'use client'
import React, { useEffect, useState } from 'react'
import { Food } from '@/types/Food'

type Props = {
  initial?: Food | null
  onClose: () => void
  onSave: (payload: Partial<Food> & { id?: string }) => Promise<void>
}

export default function RestaurantFormModal({ initial, onClose, onSave }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [rating, setRating] = useState(initial?.rating?.toString() ?? '5')
  const [image, setImage] = useState(initial?.image ?? '')
  const [open, setOpen] = useState<boolean>(initial?.open ?? true) // default to open
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setName(initial?.name ?? '')
    setRating(initial?.rating?.toString() ?? '5')
    setImage(initial?.image ?? '')
    setOpen(initial?.open ?? true)
  }, [initial])

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e['restaurant_name'] = 'Restaurant Name is required'
    const r = Number(rating)
    if (Number.isNaN(r) || r < 1 || r > 5) e['restaurant_rating'] = 'Restaurant Rating must be a number between 1 and 5'
    try {
      new URL(image)
    } catch {
      e['restaurant_image'] = 'Restaurant Logo URL is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    const payload: Partial<Food> & { id?: string } = {
      id: initial?.id,
      name: name.trim(),
      rating: String(Number(rating)),
      image: image.trim(),
      open,
    }
    try {
      await onSave(payload)
      // reset
      setName('')
      setRating('5')
      setImage('')
      setOpen(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true">
        <h2>{initial ? 'Edit Food' : 'Add Food'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Restaurant Name
            <input
              name="restaurant_name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter restaurant name"
              className="restaurant-input"
              aria-describedby={errors['restaurant_name'] ? 'restaurant_name-error' : undefined}
            />
            {errors['restaurant_name'] && <div id="restaurant_name-error" className="error">{errors['restaurant_name']}</div>}
          </label>

          <label>
            Rating
            <input
              name="restaurant_rating"
              value={rating}
              onChange={e => setRating(e.target.value)}
              placeholder="Rating (1-5)"
              className="restaurant-input"
              aria-describedby={errors['restaurant_rating'] ? 'restaurant_rating-error' : undefined}
            />
            {errors['restaurant_rating'] && <div id="restaurant_rating-error" className="error">{errors['restaurant_rating']}</div>}
          </label>

          <label>
            Image URL
            <input
              name="restaurant_image"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="Enter restaurant logo URL"
              className="restaurant-input"
              aria-describedby={errors['restaurant_image'] ? 'restaurant_image-error' : undefined}
            />
            {errors['restaurant_image'] && <div id="restaurant_image-error" className="error">{errors['restaurant_image']}</div>}
          </label>

          <label>
            Status
            <select value={open ? 'open' : 'closed'} onChange={e => setOpen(e.target.value === 'open')}>
              <option value="open">Open Now</option>
              <option value="closed">Closed</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="restaurant-btn" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="restaurant-btn" disabled={saving}>
              {saving ? (initial ? 'Updating Food...' : 'Adding Food...') : (initial ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
