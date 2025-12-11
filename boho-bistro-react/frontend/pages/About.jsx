import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    )

    document.querySelectorAll('.slide-left, .slide-right').forEach((img) => observer.observe(img))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        body { font-family: "Marcellus", serif; }
        .slide-left { opacity:0; transform: translateX(-100%); transition: transform 1s ease-out, opacity 1s ease-out; }
        .slide-right { opacity:0; transform: translateX(100%); transition: transform 1s ease-out, opacity 1s ease-out; }
        .visible { opacity:1; transform: translateX(0); }
      `}</style>

      <section className="intro">
        <div className="container-md">
          <p className="display-5 text-center">Our Story</p>
          <p className="lead text-secondary">
            Boho Barkada was born out of an idea conceived by two chefs who met while attending Humber College in Toronto, Canada...
          </p>
          <p className="lead text-secondary">
            Upon returning to Toronto, Mateo and Colette reunited to turn their dream into reality...
          </p>
          <p className="lead text-secondary">
            Boho Barkada Bistro is set to be Toronto&apos;s next urban rustic haven...
          </p>

          <div className="spacing"></div>

          <p className="text-muted text-center">Meet Our Executive Chefs</p>
          <h2 className="display-5 text-center">Chef Mateo DaVinci</h2>
          <p className="lead text-secondary">
            Born to Italian immigrant parents, Mateo found joy in cooking at an early age...
          </p>

          <div className="row gx-2 gx-lg-3">
            <div className="col-6">
              <div className="mb-2">
                <img
                  className="card-img-top img-sizing-small slide-left"
                  src="https://reportergourmet.com/upload/chef/324/d_metullio-news-970-copertina_2023-05-08_11-32-34.jpg"
                  alt="Chef Mateo DaVinci Image 1"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <img
                  className="card-img-top img-sizing-small slide-right"
                  src="https://harrystrieste.it/wp-content/uploads/2023/11/Espressione-dellanima.jpg"
                  alt="Chef Mateo DaVinci Image 2"
                />
              </div>
            </div>
          </div>

          <div className="spacing"></div>
          <h2 className="display-5 text-center">Chef Colette Cortez</h2>
          <p className="lead text-secondary">
            With French and Spanish parentage, Colette thrived from a young age in the kitchen...
          </p>
          <p className="lead text-secondary">
            Together, Mateo and Colette bring their rich cultural backgrounds...
          </p>

          <div className="row gx-2 gx-lg-3">
            <div className="col-6">
              <div className="mb-2">
                <img
                  className="card-img-top img-sizing-small slide-left"
                  src="https://img.freepik.com/premium-photo/woman-standing-restaurant-with-her-arms-crossed-observing-her-surroundings-photo-female-chef-restaurant-ai-generated_538213-16719.jpg"
                  alt="Chef Colette Cortez Image 1"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <img
                  className="card-img-top img-sizing-small slide-right"
                  src="https://static.vecteezy.com/system/resources/previews/035/756/557/large_2x/ai-generated-young-female-chef-preparing-food-in-the-kitchen-of-a-restaurant-or-hotel-a-female-chef-in-the-kitchen-ai-generated-free-photo.jpg"
                  alt="Chef Colette Cortez Image 2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="spacing"></div>
    </>
  )
}
