import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="ma-footer">
      <div className="ma-footer-main">
        <div className="ma-footer-brand">
          <Link to="/">LEXIGAM®</Link>
          <p>Independent uniforms, graphic objects and everyday pieces from Casablanca.</p>
          <div className="ma-footer-big">LEXIGAM</div>
        </div>
        <div>
          <small>EXPLORE</small>
          <Link to="/shop">SHOP</Link>
          <Link to="/men">MEN</Link>
          <Link to="/women">WOMEN</Link>
          <Link to="/new-arrivals">NEW IN</Link>
        </div>
        <div>
          <small>INFO</small>
          <Link to="/about">ABOUT</Link>
          <Link to="/blog">JOURNAL</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/cart">BAG</Link>
        </div>
        <div>
          <small>FOLLOW</small>
          <a href="#" onClick={(e) => e.preventDefault()}>
            INSTAGRAM <ArrowUpRight size={12} />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            TIKTOK <ArrowUpRight size={12} />
          </a>
          <a href="mailto:support@lexigam.com">
            EMAIL <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <div className="ma-footer-bottom">
        <span>© 2026 LEXIGAM</span>
        <span>CASABLANCA / MOROCCO</span>
        <span>MADE FOR THE EVERYDAY</span>
        <span>PRIVACY · TERMS</span>
      </div>
    </footer>
  );
}
