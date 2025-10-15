export default function Footer() {
  return (
    <footer className="footer text-center text-lg-start text-white">
      <div className="container p-4 pb-0">
        <section>
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-uppercase mb-4 font-weight-bold text-white">
                Boho Barkada
              </h6>
              <p className="text-white">
                Is your escape to a world of bohemian charm and warm camaraderie.
                Experience the perfect blend of artistic flair, delicious food, and
                genuine connections.
              </p>

              <a className="btn btn-outline-light btn-floating m-1 text-white" role="button">
                <i className="fab fa-facebook-f text-white"></i>
              </a>
              <a className="btn btn-outline-light btn-floating m-1 text-white" role="button">
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a className="btn btn-outline-light btn-floating m-1 text-white" role="button">
                <i className="fab fa-google text-white"></i>
              </a>
              <a className="btn btn-outline-light btn-floating m-1 text-white" role="button">
                <i className="fab fa-instagram text-white"></i>
              </a>
            </div>

            <div className="col-md-6">
              <h6 className="text-uppercase mb-4 font-weight-bold text-white">Contact</h6>
              <p className="text-white">
                <i className="fas fa-home mr-3"></i> 1 Bay St, Toronto, ON, M1M 1M1, CA
              </p>
              <p className="text-white">
                <i className="fas fa-envelope mr-3"></i> info@gmail.com
              </p>
              <p className="text-white">
                <i className="fas fa-print mr-3"></i> + 01 416 221 2112
              </p>
            </div>
          </div>
        </section>

        <hr className="my-3" />

        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center">
              <p className="p-3 text-white">© {new Date().getFullYear()} Copyright: Boho-Barkada</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
