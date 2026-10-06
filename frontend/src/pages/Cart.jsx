import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowUpRight,
  ShoppingBag,
} from 'lucide-react';

export default function Cart() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((a, i) => a + i.produit.prix * i.quantite, 0);

  if (!items.length) {
    return (
      <div className="pb-empty">
        <ShoppingBag size={25} />
        <small>LEXIGAM / BAG</small>
        <h1>Your bag is empty.</h1>
        <p>Discover the latest pieces from the collection.</p>
        <Link className="pb-btn" to="/shop">
          CONTINUE SHOPPING <ArrowUpRight size={15} />
        </Link>
      </div>
    );
  }

  const src = (p) =>
    p?.image?.startsWith('http')
      ? p.image
      : p?.image?.startsWith('/')
      ? p.image
      : 'http://localhost:8000' + (p?.image || '');

  return (
    <div className="pb-cart">
      <div className="pb-cart-head">
        <small>LEXIGAM / BAG</small>
        <h1>
          Your shopping bag <sup>{items.length}</sup>
        </h1>
        <Link to="/shop">
          <ArrowLeft size={14} /> CONTINUE SHOPPING
        </Link>
      </div>
      <div className="pb-cart-layout">
        <section className="pb-cart-items">
          {items.map((i, n) => (
            <article className="pb-cart-row" key={i.produit.id}>
              <img src={src(i.produit)} alt={i.produit.nom} />
              <div className="pb-cart-product">
                <small>0{n + 1} / LEXIGAM</small>
                <h2>{i.produit.nom}</h2>
                <span>{i.produit.prix} DH</span>
                <div className="pb-cart-qty">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: i.produit.id,
                          quantite: Math.max(1, i.quantite - 1),
                        })
                      )
                    }
                  >
                    <Minus size={13} />
                  </button>
                  <b>{i.quantite}</b>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: i.produit.id,
                          quantite: i.quantite + 1,
                        })
                      )
                    }
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
              <div className="pb-cart-side">
                <strong>{i.produit.prix * i.quantite} DH</strong>
                <button onClick={() => dispatch(removeFromCart(i.produit.id))}>
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </section>
        <aside className="pb-cart-summary">
          <small>SUMMARY</small>
          <div>
            <span>SUBTOTAL</span>
            <strong>{total} DH</strong>
          </div>
          <p>Shipping and taxes calculated at checkout.</p>
          <Link className="pb-btn full" to="/checkout">
            CHECKOUT <ArrowUpRight size={15} />
          </Link>
          <div className="pb-benefits">
            <span>FREE SHIPPING OVER 900 DH</span>
            <span>SECURE CHECKOUT</span>
          </div>
        </aside>
      </div>
    </div>
  );
}