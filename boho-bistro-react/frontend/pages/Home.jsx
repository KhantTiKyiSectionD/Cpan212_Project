import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // fade-in & slide-in animations
    const onScroll = () => {
      const makeVisible = (selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('visible')
        })
      }
      makeVisible('.fade-in')
      makeVisible('.slide-in-right')
      makeVisible('.slide-in-left')
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        body { font-family: "Marcellus", serif; }
        .fade-in { opacity: 0; transition: opacity 2s ease-in; }
        .fade-in.visible { opacity: 1; }
        .slide-in-right { transform: translateX(100%); transition: transform 1s ease-in; }
        .slide-in-left { transform: translateX(-100%); transition: transform 1s ease-in; }
        .slide-in-right.visible, .slide-in-left.visible { transform: translateX(0); }
      `}</style>

      {/* INTRO */}
      <section className="intro">
        <nav className="sr-only" aria-hidden="true"></nav>
        <div className="container-md">
          <div className="justify-content-center align-items-center">
            <p className="lead-5 text-secondary text-center">Unleash</p>
            <p className="display-5 text-center">Discover a Haven of Creativity and Friendship</p>
            <p className="lead-5 text-muted text-justify-custom text-center">
              At Boho Barkada Bistro, we embrace the Boho spirit and celebrate the power of friendship. Our urban rustic
              haven combines the charm of a French bistro with an inviting atmosphere that sparks creativity and fosters
              a sense of belonging.
            </p>
          </div>
        </div>

        <div className="container my-4">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0">
                <img src="/assets/landing-image.jpg" className="card-img-top img-sizing-small fade-in" alt="" />
                <div className="card-body">
                  <h4 className="card-text mb-4 text-secondary">Creative Freedom to inspire your soul</h4>
                  <p className="text-muted">Express yourself and find inspiration in our artistic community.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0">
                <img src="/assets/landing-image2.jpg" className="card-img-top img-sizing-small fade-in" alt="" />
                <div className="card-body">
                  <h4 className="card-text text-secondary">Feel the Warmth of Friendship and Support</h4>
                  <p className="text-muted">Connect with like-minded individuals and create lasting memories.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0">
                <img
                  src="/assets/Above-the-fold-Harrys-Piccolo.jpg"
                  className="card-img-top img-sizing-small fade-in"
                  alt=""
                />
                <div className="card-body">
                  <h4 className="card-text text-secondary">Relaxed Dining with a Touch of Elegance</h4>
                  <p className="text-muted">Indulge in high-quality food and drinks in a laid back setting.</p>
                </div>
              </div>
            </div>

            <div className="container my-4">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <button className="btn btn-outline-secondary rounded-0">Learn More</button>
                </div>
                <div className="col-auto">
                  <button className="btn btn-custom">
                    Sign Up <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN-1 */}
      <section className="main-1">
        <div className="container mt-5">
          <div className="row py-5">
            <div className="col-12 col-sm-6 align-items-center">
              <p className="lead-5 text-muted">Inspire</p>
              <h1 className="mb-4">Where Art, Friendship, and Culinary Excellence Meet</h1>
              <p className="text-muted">
                Boho Barkada Bistro is a unique blend of Boho artistry, the friendly Barakada vibe, and the casual
                sophistication of a bistro. Experience a culinary journey that celebrates creativity, friendship, and
                community
              </p>
              <div className="row">
                <div className="col-12 col-md-6">
                  <h5 className="text-secondary">Artistic Haven</h5>
                  <p className="text-muted">Immerse yourself in a vibrant atmosphere that sparks inspiration.</p>
                </div>
                <div className="col-12 col-md-6">
                  <h5 className="text-secondary">Community Hub</h5>
                  <p className="text-muted">Join our Barkada and become part of a close-knit community of creative souls.</p>
                </div>
              </div>
              <div className="row g-0 custom-row-spacing">
                <div className="col-auto me-2">
                  <button className="btn btn-outline-secondary rounded-0">Learn More</button>
                </div>
                <div className="col-auto">
                  <button className="btn btn-custom">
                    Sign Up <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <img src="/assets/landing-8.jpg" className="card-img-top img-sizing-large slide-in-right" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN-2 */}
      <section className="main-2">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-6 align-items-center">
              <img src="/assets/landing-6.jpg" className="card-img-top img-sizing-large slide-in-left" alt="" />
            </div>
            <div className="col-12 col-sm-6 mt-3 mt-sm-0">
              <p className="lead-5 text-muted">Gather</p>
              <h1 className="mb-4">A Cozy Retreat for Friends and Food Lovers</h1>
              <p className="text-muted">
                Our bistro is the perfect place to gather with friends, share stories, and enjoy delightful meals.
              </p>
              <div className="row">
                <div className="col-12 col-md-6">
                  <h5 className="text-secondary">Delicious Cuisine</h5>
                  <p className="text-muted">Savor a diverse menu crafted with love and creativity.</p>
                </div>
                <div className="col-12 col-md-6">
                  <h5 className="text-secondary">Warm Ambiance</h5>
                  <p className="text-muted">Experience a cozy and welcoming atmosphere that makes every visit memorable.</p>
                </div>
              </div>
              <div className="row g-0 custom-row-spacing">
                <div className="col-auto me-2">
                  <button className="btn btn-outline-secondary rounded-0">Learn More</button>
                </div>
                <div className="col-auto">
                  <button className="btn btn-custom">
                    Sign Up <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL (MDB) */}
      <section>
        <div className="row text-center">
          <div className="col-md-12">
            <div id="carouselBasicExample" data-mdb-carousel-init className="carousel slide carousel-dark" data-mdb-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <p className="lead font-italic mx-4 mx-md-5">
                    "Lovely atmosphere with attentive service. A great place to unwind and enjoy a meal with friends or
                    family. Highly recommend!"
                  </p>
                  <div className="mt-5 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                      className="rounded-circle img-fluid shadow-1-strong"
                      alt="sample"
                      width="100"
                      height="100"
                    />
                  </div>
                  <p className="text-muted mb-0">- Anna Morian</p>
                </div>

                <div className="carousel-item">
                  <p className="lead font-italic mx-4 mx-md-5">
                    "Fantastic bistro experience with friendly staff and a cozy setting. Perfect for a casual yet
                    delightful dining experience."
                  </p>
                  <div className="mt-5 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                      className="rounded-circle img-fluid shadow-1-strong"
                      alt="sample"
                      width="100"
                      height="100"
                    />
                  </div>
                  <p className="text-muted mb-0">- Teresa May</p>
                </div>

                <div className="carousel-item">
                  <p className="lead font-italic mx-4 mx-md-5">
                    "Exceptional service and a warm, inviting ambiance. An ideal spot for a relaxed and enjoyable dining outing."
                  </p>
                  <div className="mt-5 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                      className="rounded-circle img-fluid shadow-1-strong"
                      alt="sample"
                      width="100"
                      height="100"
                    />
                  </div>
                  <p className="text-muted mb-0">- Kate Allise</p>
                </div>
              </div>

              <button data-mdb-button-init className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button data-mdb-button-init className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="spacing"></div>
      <div className="spacing"></div>
    </>
  )
}
