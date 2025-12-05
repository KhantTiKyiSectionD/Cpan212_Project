import { useEffect, useState } from 'react'
import { createContact } from '../services/api.js'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState({ type: '', message: '' })

  useEffect(() => {
    // Leaflet init (CDN global `L`)
    if (window.L) {
      const map = window.L.map('map').setView([43.651070, -79.347015], 13) // Toronto coordinates
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setNotification({ type: '', message: '' })

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      subject: document.getElementById('subject')?.value || 'General Inquiry',
      agreeToTerms: document.getElementById('agree').checked
    }

    try {
      const response = await fetch('http://localhost:3002/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setNotification({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon.'
        })
        
        // Reset form
        document.getElementById('contactForm').reset()
      } else {
        setNotification({
          type: 'error',
          message: result.message || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Initialize form submission handler
  useEffect(() => {
    const form = document.getElementById('contactForm')
    if (!form) return

    form.addEventListener('submit', handleSubmit)
    return () => form.removeEventListener('submit', handleSubmit)
  }, [])

  return (
    <>
      <style>{`
        body { font-family:"Marcellus","serif"; }
        .FAQS, .get-in-touch { margin:5%; }
        #map { height:400px; width:70%; }
        .btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      <div className="ms-3">
        <p className="display-3 text-center">Contact Us</p>
        <p className="lead-5 text-secondary text-center">
          Get in touch with us to learn more about our bistro and offerings
        </p>
      </div>

      <section className="contact-info">
        <div className="container-fluid">
          <div id="map" className="mx-auto"></div>
          <div className="contact-details text-center mt-3">
            <p className="lead-5 text-secondary">
              <i className="fas fa-home mr-3 mt-3"></i> 1 Bay St, Toronto, ON, M1M 1M1, CA
              <i className="fas fa-envelope mr-3 ms-3"></i> info@gmail.com
              <i className="fas fa-phone mr-3 ms-3"></i> + 01 416 221 1221
              <i className="fas fa-print mr-3 ms-3"></i> + 01 416 221 2112
            </p>
          </div>
        </div>
      </section>

      <div className="spacing"></div>

      <section className="FAQS">
        <div className="mx-3">
          <div className="row">
            <div className="col-md-5 col-sm-12 mb-5">
              <p className="display-5">FAQs</p>
              <p className="text-secondary lead-5">
                Find answers to commonly asked questions about our bistro, including our opening hours, parking availability, and special accomodations.
              </p>
              <button className="btn btn-outline-secondary rounded-0">Contact</button>
            </div>

            <div className="col-md-7 col-sm-12">
              {[
                ['What are your opening hours?','Our Bistro is open from 9am to 10pm, Monday to Sunday. We are here to serve you throughout the day, offering breakfast,lunch, and dinner options.'],
                ['Do you offer vegetarian options?','Yes, we offer a variety of vegetarian and vegan options on our menu.'],
                ['Can I make a reservation online?','Yes, you can make a reservation through our website. Visit our reservation page for more details.'],
                ['Do you have special Accomodations?','Absolutely! We strive to provide a welcoming environment for all our guests. If you have any special requests or requirements, please let us know, we will do our best to accomodate you.'],
                ['Is parking available?','Yes, we have parking available for our customers. There is a parking lot located next to the bistro, making it convenient for you to dine with us'],
              ].map(([q,a])=>(
                <div className="card border mb-2" key={q}>
                  <div className="card-body">
                    <h5 className="card-title text-primary">{q}</h5>
                    <p className="card-subtitle mb-2 text-secondary">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="spacing"></div>
      <div className="spacing"></div>

      <section className="get-in-touch">
        <div className="container-lg mx-5"></div>
        <div className="row mx-3">
          <div className="col-6">
            <div className="form">
              <div className="mt-5">
                <p className="display-5">Get in Touch</p>
                <p className="lead-5 text-secondary">We would love to hear from you! Please fill out the form below</p>
                
                {/* Notification Area */}
                {notification.message && (
                  <div className={`alert alert-${notification.type === 'success' ? 'success' : 'danger'}`} role="alert">
                    {notification.message}
                  </div>
                )}
                
                <form id="contactForm">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name *</label>
                    <input 
                      type="text" 
                      className="form-control small-input" 
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
                      className="form-control small-input" 
                      id="email" 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input 
                      type="text" 
                      className="form-control small-input" 
                      id="subject"
                      maxLength="200"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea 
                      className="form-control small-input" 
                      id="message" 
                      rows="4" 
                      required
                      minLength="10"
                      maxLength="1000"
                      placeholder="Enter your message..."
                    ></textarea>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="agree" />
                    <label className="form-check-label" htmlFor="agree">I agree to the Terms</label>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-secondary rounded-0"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-6">
            <img src="/assets/landing-7.jpg" className="card-img-top img-sizing-large" alt="" />
          </div>
        </div>
      </section>

      <div className="spacing"></div>
    </>
  )
}