import { useEffect } from 'react'

export default function Gallery() {
  useEffect(() => {
    // card reveal animation
    const cards = document.querySelectorAll('.card')
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // bootstrap modal: set clicked image src
    const imageModal = document.getElementById('imageModal')
    if (!imageModal) return
    const handler = (event) => {
      const button = event.relatedTarget
      const src = button?.getAttribute('src') || ''
      const modalImage = document.getElementById('modalImage')
      if (modalImage) modalImage.setAttribute('src', src)
    }
    imageModal.addEventListener('show.bs.modal', handler)
    return () => imageModal.removeEventListener('show.bs.modal', handler)
  }, [])

  return (
    <>
      <style>{`
        body { font-family: "Marcellus","serif"; }
        footer { margin:0; }
        .gallery-title { text-align:center; color:#343a40; }
        .card { transition: transform .3s; margin-top:20px; padding-right:0; opacity:0; transform: translateY(20px); transition: opacity .6s, transform .6s; }
        .card.visible { opacity:1; transform: translateY(0); }
        .card:hover { transform: scale(1.05); }
        .gallery-image { cursor:pointer; transition: opacity .3s; }
        .gallery-image:hover { opacity:.8; }
        .modal-body { padding:0; }
        .modal-content { background-color:transparent; border:none; }
        .card-img-top { height:300px; object-fit:cover; }
        .img-fluid { height:800px; width:100%; margin:0; object-fit:cover; }
        h3 { text-align:center; font-family:"Soria", serif; color:#9f6f56; }
      `}</style>

      <p className="display-5 text-center">Gallery</p>
      <img
        src="/assets/Gallery-Main-Photo.jpg"
        className="img-fluid"
        alt="Big"
        data-bs-toggle="modal"
        data-bs-target="#imageModal"
      />

      <div className="row">
        {[
          '/images/image18.jpg','/images/image2.png','/images/image38.jpg','/images/image36.jpeg','/images/image17.jpg',
          '/images/image6.png','/images/image7.png','/images/image8.png','/images/image9.webp','/images/image10.jpg',
          '/images/image11.jpg','/images/image21.png','/images/image19.png','/images/image39.jpg','/images/image12.jpg',
          '/images/image22.png','/images/image14.png','/images/image15.png','/images/image16.jpg','/images/image20.png',
          '/images/chef.jpg','/images/image40.jpg','/images/image28.jpg','/images/image29.jpg','/images/image30.png',
          '/images/image41.png','/images/image32.jpg'
        ].map((src, i) => (
          <div className="col-md-4" key={i}>
            <div className="card">
              <img
                src={src}
                className="card-img-top gallery-image"
                alt={`Gallery ${i+1}`}
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <img src="" className="img-fluid" id="modalImage" alt="Modal" />
            </div>
          </div>
        </div>
      </div>

      <div className="spacing"></div>
    </>
  )
}
