import "./footer.css"

const year = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center justify-content-center text-center bg-dark text-light px-3">
      <span>Copyright © {year} GreenCity: All rights reserved.</span>
    </footer>
  )
}

