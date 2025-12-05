import { useEffect, useState } from 'react'
import { createReservation } from '../services/api.js';


export default function Reservation() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState({ type: '', message: '' })

  // Set minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('date')?.setAttribute('min', today)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setNotification({ type: '', message: '' })

    // Collect form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      people: parseInt(document.getElementById('people').value),
      specialRequests: document.getElementById('specialRequests')?.value || ''
    }

    try {
      // Send reservation to backend API
      const response = await fetch('http://localhost:3002/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        // Success: Show success message
        setNotification({
          type: 'success',
          message: `Thank you, ${formData.name}! Your reservation for ${formData.people} people on ${formData.date} at ${formData.time} has been confirmed. A confirmation email has been sent to ${formData.email}.`
        })

        // Show Bootstrap modal with cancellation policy
        if (window.bootstrap) {
          const modalEl = document.getElementById('cancellationPolicyModal')
          const modal = new window.bootstrap.Modal(modalEl)
          modal.show()
        }

        // Reset form
        document.getElementById('reservationForm').reset()
      } else {
        // Error: Show error message from backend
        setNotification({
          type: 'error',
          message: result.message || 'Failed to make reservation. Please try again.'
        })
      }
    } catch (error) {
      // Network error
      setNotification({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
      console.error('Reservation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Initialize form submission handler
  useEffect(() => {
    const form = document.getElementById('reservationForm')
    if (!form) return

    form.addEventListener('submit', handleSubmit)
    return () => form.removeEventListener('submit', handleSubmit)
  }, [])

  return (
    <>
      <style>{`
        body { font-family: "Marcellus", serif; }
        .intro, .main-1, .main-2 { padding: 2rem 0; }
        @keyframes rollDown { 
          0% { transform: translateY(-20px); opacity: 0; } 
          100% { transform: translateY(0); opacity: 1; } 
        }
        .reservation { padding: 2rem 0; opacity: 0; animation: rollDown .6s ease forwards; }
        .instructions, .faq { padding: 2rem 0; margin-top: 15px; }
        .instruction-step { display: flex; align-items: flex-start; margin-bottom: 1rem; padding-right: 10px; margin-left: 10px; }
        .instruction-step i { font-size: 2rem; margin-right: 1rem; margin-top: 15px; }
        .notification { transition: all 0.3s ease; }
        .notification.alert-success { background-color: #d4edda; border-color: #c3e6cb; color: #155724; }
        .notification.alert-error { background-color: #f8d7da; border-color: #f5c6cb; color: #721c24; }
        .btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      <section className="reservation">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="text-center mb-4 display-5">Make a Reservation</p>
              
              {/* Notification Area */}
              {notification.message && (
                <div className={`alert notification alert-${notification.type === 'success' ? 'success' : 'danger'}`} role="alert">
                  {notification.message}
                </div>
              )}

              <form id="reservationForm">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    required 
                    minLength="2"
                    maxLength="100"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone *</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="phone" 
                    required 
                    minLength="10"
                    maxLength="20"
                    pattern="[0-9+\-\s()]*"
                    title="Please enter a valid phone number"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date *</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="date" 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Time *</label>
                  <input 
                    type="time" 
                    className="form-control" 
                    id="time" 
                    required 
                    min="10:00"
                    max="22:00"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="people" className="form-label">Number of People *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="people" 
                    required 
                    min="1"
                    max="20"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="specialRequests" className="form-label">Special Requests (Optional)</label>
                  <textarea 
                    className="form-control" 
                    id="specialRequests" 
                    rows="3"
                    maxLength="500"
                    placeholder="Any dietary restrictions, allergies, or special occasions?"
                  ></textarea>
                  <div className="form-text">Maximum 500 characters</div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-outline-primary rounded-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : 'Submit Reservation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="instructions mt-5">
        <div className="container">
          <p className="text-center mb-4 display-5">How to Make a Reservation</p>
          <div className="row">
            <div className="col-md-4">
              <div className="instruction-step">
                <i className="bi bi-pencil-square"></i>
                <div>
                  <h5>Step 1: Fill the Reservation Form</h5>
                  <p>Complete the reservation form above with your details.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="instruction-step">
                <i className="bi bi-envelope"></i>
                <div>
                  <h5>Step 2: Email Confirmation</h5>
                  <p>Check your email for a confirmation message from us.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="instruction-step">
                <i className="bi bi-calendar-check"></i>
                <div>
                  <h5>Step 3: Enjoy Your Dining Experience</h5>
                  <p>Visit Boho Bistro on the reserved date and time and enjoy your meal!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cancellation Policy Modal */}
      <div className="modal fade" id="cancellationPolicyModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cancellationPolicyModalLabel">Reservation Confirmed!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-success mb-3">
                <i className="bi bi-check-circle me-2"></i>
                Your reservation has been successfully submitted!
              </div>
              
              <h6>Cancellation Policy:</h6>
              <ul>
                <li>Cancellations must be made at least 24 hours in advance.</li>
                <li>Failure to cancel within this period may result in a cancellation fee.</li>
                <li>For large groups (8+ people), a deposit may be required.</li>
                <li>Please arrive 5-10 minutes before your reservation time.</li>
              </ul>
              
              <p className="mb-0"><strong>Need to modify or cancel?</strong><br />
              Call us at (123) 456-7890 or reply to your confirmation email.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}