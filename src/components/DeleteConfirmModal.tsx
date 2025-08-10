'use client'
import React, { useState } from 'react'

export default function DeleteConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => Promise<void> }) {
  const [deleting, setDeleting] = useState(false)
  async function confirm() {
    setDeleting(true)
    try {
      await onConfirm()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this restaurant?</p>
        <div className="modal-actions">
          <button className="restaurant-btn" onClick={onClose} disabled={deleting}>Cancel</button>
          <button className="restaurant-btn" onClick={confirm} disabled={deleting}>{deleting ? 'Deleting Restaurant...' : 'Delete'}</button>
        </div>
      </div>
    </div>
  )
}