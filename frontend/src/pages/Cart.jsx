import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { ArrowUpRight, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((a, i) => a + i.produit.prix * i.quantite, 0);

  if (!items.length) {
    return (
      <div className="empty-page container-wide">
        <ShoppingBag size={28} />
        <span className="eyebrow">YOUR BAG</span>
        <h1>Nothing here yet.</h1>
        <p>Start with a few pieces from the archive.</p>
        <Link className="fashion-cta" to="/shop">
          SHOP THE COLLECTION <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container-wide">
      <div className="cart-title">
        <span className="eyebrow">LEXIGAM / BAG</span>
        <h1>
          Your bag <sup>{items.length}</sup>
        </h1>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((i) => (
            <article className="cart-item" key={i.produit.id}>
              <img
                src={
                  i.produit.image?.startsWith('http')
                    ? i.produit.image
                    : 'http://localhost:8000' + i.produit.image
                }
                alt={i.produit.nom}
              />
              <div className="cart-item-info">
                <span className="eyebrow">
                  OBJECT / {String(i.produit.id).padStart(3, '0')}
                </span>
                <h2>{i.produit.nom}</h2>
                <p>{i.produit.prix} DH</p>
                <div className="qty">
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
              <div className="cart-item-total">
                <strong>{i.produit.prix * i.quantite} DH</strong>
                <button onClick={() => dispatch(removeFromCart(i.produit.id))}>
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <span className="eyebrow">SUMMARY</span>
          <div>
            <span>SUBTOTAL</span>
            <strong>{total} DH</strong>
          </div>
          <p>Shipping and taxes calculated at checkout.</p>
          <Link className="fashion-cta" to="/checkout">
            CHECKOUT <ArrowUpRight size={17} />
          </Link>
        </aside>
      </div>
    </div>
  );
}