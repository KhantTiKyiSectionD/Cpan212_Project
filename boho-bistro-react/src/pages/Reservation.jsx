import { useEffect } from 'react'

export default function Reservation() {
  useEffect(() => {
    const form = document.getElementById('reservationForm')
    if (!form) return

    const handler = (event) => {
      event.preventDefault()
      const name = document.getElementById('name').value
      const email = document.getElementById('email').value
      const phone = document.getElementById('phone').value
      const date = document.getElementById('date').value
      const time = document.getElementById('time').value
      const people = document.getElementById('people').value

      const notification = document.getElementById('notification')
      if (notification) {
        notification.innerHTML = `
          <div class="alert alert-success" role="alert">
            Thank you, ${name}! Your reservation for ${people} people on ${date} at ${time} has been received. We will send a confirmation to ${email}.
          </div>`
      }

      // show Bootstrap modal
      if (window.bootstrap) {
        const modalEl = document.getElementById('cancellationPolicyModal')
        const modal = new window.bootstrap.Modal(modalEl)
        modal.show()
      }

      form.reset()
    }

    form.addEventListener('submit', handler)
    return () => form.removeEventListener('submit', handler)
  }, [])

  return (
    <>
      <style>{`
        body { font-family: "Marcellus", serif; }
        .intro, .main-1, .main-2 { padding: 2rem 0; }
        @keyframes rollDown { 0% { transform: translateY(-20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .reservation { padding: 2rem 0; opacity: 0; animation: rollDown .6s ease forwards; }
        .instructions, .faq { padding: 2rem 0; margin-top: 15px; }
        .instruction-step { display:inline-block; align-items:flex-start; margin-bottom:1rem; padding-right:10px; margin-left:10px; }
        .instruction-step i { font-size:2rem; margin-right:1rem; margin-top:15px; }
      `}</style>

      <section className="reservation">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="text-center mb-4 display-5">Make a Reservation</p>
              <form id="reservationForm">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="tel" className="form-control" id="phone" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input type="date" className="form-control" id="date" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Time</label>
                  <input type="time" className="form-control" id="time" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="people" className="form-label">Number of People</label>
                  <input type="number" className="form-control" id="people" required />
                </div>
                <button type="submit" className="btn btn-outline-primary rounded-0">Submit</button>
              </form>
              <div id="notification" className="mt-3"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="instructions mt-5">
        <div className="container">
          <p className="text-center mb-4 display-5">How to Make a Reservation</p>
          <div className="row">
            <div className="col">
              <div className="instruction-step">
                <i className="bi bi-pencil-square"></i>
                <h5>Step 1: Fill the Reservation Form</h5>
                <p>Complete the reservation form above with your details.</p>
              </div>
            </div>
            <div className="col">
              <div className="instruction-step">
                <i className="bi bi-envelope"></i>
                <div>
                  <h5>Step 2: Email Confirmation</h5>
                  <p>Check your email for a confirmation message from us.</p>
                </div>
              </div>
            </div>
            <div className="col">
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
        <div className="modal-dialog"><div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cancellationPolicyModalLabel">Cancellation Policy</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Our cancellation policy is as follows:</p>
            <ul>
              <li>Cancellations must be made at least 24 hours in advance.</li>
              <li>Failure to cancel within this period will result in a charge.</li>
              <li>For large groups, a deposit may be required.</li>
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div></div>
      </div>
    </>
  )
}
