import { useEffect } from 'react'

export default function Contact() {
  useEffect(() => {
    // Leaflet init (CDN global `L`)
    if (window.L) {
      const map = window.L.map('map').setView([51.505, -0.09], 13)
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map)
    }
  }, [])

  return (
    <>
      <style>{`
        body { font-family:"Marcellus","serif"; }
        .FAQS, .get-in-touch { margin:5%; }
        #map { height:400px; width:70%; }
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
          <div className="contact-details text-center">
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
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control small-input" id="name" placeholder="" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control small-input" id="email" placeholder="" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control small-input" id="message" rows="4" placeholder="Enter your message..."></textarea>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="agree" />
                    <label className="form-check-label" htmlFor="agree">I agree to the Terms</label>
                  </div>
                  <button type="submit" className="btn btn-secondary rounded-0">Send</button>
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
