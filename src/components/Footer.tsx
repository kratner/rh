import React, { ReactElement } from "react";

interface FooterProps {
  footerText?: string;
}

const Footer = ({ footerText }: FooterProps): ReactElement => {
  return (
    <footer className="footer">
      <div className="copyright">
        {footerText}
      </div>
      <nav className="footer-links">
        <ul>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Disclaimer</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
