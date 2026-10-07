import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ChevronLeft,ChevronRight,ShieldCheck} from 'lucide-react';
import SEO from '../components/SEO';
import './molimao-home.css';

const featured = [
  {name:'Ljubav, ženska majica kratki rukav',price:'50.00 KM',sizes:['XS','S','M','L'],image:'/webpImage/image-14.jpg'},
  {name:'Šibica, muška oversize majica kratki rukav',price:'50.00 KM',sizes:['XS','S','M','L','XL','XXL'],image:'/webpImage/image-1.jpg'},
  {name:'Molimao “FRAME” novčanik',price:'120.00 KM',sizes:[],image:'/webpImage/image-11 copy.jpg'},
  {name:'Icon, kačket',price:'60.00 KM',sizes:[],image:'/webpImage/image-17.jpg'},
  {name:'TAG, ceker',price:'40.00 KM',sizes:[],image:'/webpImage/image-1 copy.jpg'},
  {name:'Krom, muška oversize majica kratki rukav',price:'60.00 KM',sizes:['XS','S','M','L','XL','XXL'],image:'/webpImage/image-4.jpg'},
  {name:'Dijamant, ženska oversize majica kratki rukav',price:'50.00 KM',sizes:['S','M','L'],image:'/webpImage/image-7.jpg'},
  {name:'Before, muška majica kratki rukav',price:'50.00 KM',sizes:['M','XS','S','L','XL','XXL'],image:'/webpImage/image-15.jpg'},
];

const newProducts = [
  {name:'Grow, muška oversize majica kratki rukav',price:'50.00 KM',sizes:['M','XS','S','L','XL','XXL'],image:'/webpImage/image-12.jpg'},
  {name:'Before, muška majica kratki rukav',price:'50.00 KM',sizes:['M','XS','S','L','XL','XXL'],image:'/webpImage/image-15.jpg'},
  {name:'Cupid, ženska oversize majica kratki rukav',price:'50.00 KM',sizes:['S','M','L'],image:'/webpImage/image-9.jpg'},
  {name:'Dijamant, ženska oversize majica kratki rukav',price:'50.00 KM',sizes:['S','M','L'],image:'/webpImage/image-28.jpg'},
];

const artPrints = [
  '/webpImage/image-14 copy.jpg',
  '/webpImage/image-26.jpg',
  '/webpImage/image-21 copy.jpg',
  '/webpImage/image-2 copy.jpg',
  '/webpImage/image-11.jpg',
  '/webpImage/image-8.jpg',
];

function ProductCard({product}){
  return <article className="mm-product-card">
    <Link to="/shop" className="mm-product-image">
      <img src={product.image} alt={product.name} loading="lazy"/>
    </Link>
    {product.sizes.length>0 && <div className="mm-sizes">{product.sizes.map(s=><span key={s}>{s}</span>)}</div>}
    <div className="mm-product-name">{product.name}</div>
    <div className="mm-product-price">{product.price}</div>
  </article>;
}

export default function Home(){
  const [artSlide,setArtSlide]=useState(0);
  const [products,setProducts]=useState(newProducts);

  useEffect(()=>{
    fetch('/api/produits').then(r=>r.ok?r.json():Promise.reject()).then(data=>{
      const items=data?.data||data;
      if(Array.isArray(items)&&items.length){
        setProducts(items.slice(0,4).map((p,i)=>({
          name:p.nom||newProducts[i].name,
          price:p.prix?Number(p.prix).toFixed(2)+' KM':newProducts[i].price,
          sizes:newProducts[i].sizes,
          image:p.image||newProducts[i].image
        })));
      }
    }).catch(()=>{});
  },[]);

  const visibleArt=[0,1,2,3].map(offset=>artPrints[(artSlide+offset)%artPrints.length]);

  return <><SEO title="LEXIGAM — Made of Sarajevo" description="New collection, featured products, photobook and art prints."/><main className="mm-home">
    <section className="mm-hero">
      <div className="mm-hero-copy"><div className="mm-eyebrow">FLAGSHIP STORE</div><h1>LEXIGAM<br/>FLAGSHIP<br/>STORE</h1><p>Od 2021. naš studio okuplja odjeću, grafiku i svakodnevne komade. Otkrijte novu kolekciju i vizuelni svijet brenda.</p><Link to="/about" className="mm-outline-btn">NASTAVI ČITANJE...</Link></div>
      <div className="mm-hero-media"><img src="/webpImage/image-3.jpg" alt="Flagship store"/></div>
    </section>

    <section className="mm-service-top"><div className="mm-service-grid">
      <article><img src="/webpImage/image-10.png" alt="" aria-hidden="true"/><div><h3>OPCIJE DOSTAVE BRZOM POŠTOM</h3><p>Opcija dostave brzom poštom je dostupna za sve isporuke unutar Bosne i Hercegovine. Vrijeme isporuke putem kurirske službe BH PostExpress je u roku 24–48 sati. Cijena poštarine iznosi 7,00 KM dok za narudžbe preko 100,00 KM poštarina je besplatna.</p></div></article>
      <article><ShieldCheck className="mm-shield" size={40} strokeWidth={1.4}/><div><h3>SIGURNO PLAĆANJE</h3><p>Monri predstavlja brz i siguran online sistem plaćanja narudžbi. Garantuje 100% sigurne transakcije i sigurnost podataka koje pošaljete. Podaci nikad neće biti dostupni trećim licima, a sigurnost Vaše kartice je garantovana najnaprednijom tehnologijom enkripcije zahvaljujući SSL protokolu.</p></div></article>
    </div></section>

    <section className="mm-products-section"><header className="mm-section-heading centered"><div className="mm-eyebrow">NOVO!</div></header><div className="mm-new-grid">{products.map((p,i)=><ProductCard product={p} key={p.name+i}/>)}</div><div className="mm-center-btn"><Link to="/shop" className="mm-outline-btn">SVI PROIZVODI</Link></div></section>

    <section className="mm-story"><div className="mm-story-image"><img src="/webpImage/image-20.jpg" alt="Summer collection 26 Urbex"/></div><div className="mm-story-copy"><div className="mm-eyebrow">PHOTOBOOK</div><h2>LJETNA KOLEKCIJA 26 URBEX</h2><p>Urbex dolazi od izraza urban exploration - istraživanje napuštenih i zaboravljenih gradskih prostora. Tako smo i tokom ovog photoshootinga sa našim domaćinima u novom studiju agencije Beyond Adria</p><Link to="/blog" className="mm-outline-btn">NASTAVI ČITANJE...</Link></div></section>

    <section className="mm-products-section mm-featured"><header className="mm-section-heading"><div className="mm-eyebrow">ISTAKNUTO</div></header><div className="mm-featured-grid">{featured.map((p,i)=><ProductCard product={p} key={p.name+i}/>)}</div><div className="mm-center-btn"><Link to="/shop" className="mm-outline-btn">SVI PROIZVODI</Link></div></section>

    <section className="mm-flagship"><div className="mm-flagship-copy"><div className="mm-eyebrow">MOLIMAO FLAGSHIP STORE</div><h2>LEXIGAM FLAGSHIP STORE</h2><p>Od augusta 2021. nas možete posjetiti u Sarajevu na jednom od najpoznatijih uglova na svijetu.</p><Link to="/about" className="mm-outline-btn">NASTAVI ČITANJE...</Link></div><div className="mm-flagship-image"><img src="/webpImage/image-3.jpg" alt="Flagship store Sarajevo"/></div></section>

    <section className="mm-art"><div className="mm-art-stage"><button type="button" aria-label="Previous art print" className="mm-art-arrow" onClick={()=>setArtSlide(v=>(v-1+artPrints.length)%artPrints.length)}><ChevronLeft size={18}/></button><div className="mm-art-track">{visibleArt.map((src,i)=><div className="mm-art-frame" key={src+i}><img src={src} alt="Art print" loading="lazy"/></div>)}</div><button type="button" aria-label="Next art print" className="mm-art-arrow" onClick={()=>setArtSlide(v=>(v+1)%artPrints.length)}><ChevronRight size={18}/></button></div><div className="mm-art-dots">{artPrints.slice(0,4).map((_,i)=><button key={i} className={i===artSlide%4?'active':''} onClick={()=>setArtSlide(i)} aria-label={'Art print '+(i+1)}/>)}</div><div className="mm-center-btn"><Link to="/shop" className="mm-outline-btn">ART PRINTOVI</Link></div></section>

    <section className="mm-service-bottom"><div className="mm-service-grid"><article><img src="/webpImage/image-10.png" alt="" aria-hidden="true"/><div><h3>OPCIJE DOSTAVE BRZOM POŠTOM</h3><p>Opcija dostave brzom poštom je dostupna za sve isporuke unutar Bosne i Hercegovine. Vrijeme isporuke putem kurirske službe BH PostExpress je u roku 24–48 sati. Cijena poštarine iznosi 7,00 KM dok za narudžbe preko 100,00 KM poštarina je besplatna.</p></div></article><article><ShieldCheck className="mm-shield" size={40} strokeWidth={1.4}/><div><h3>SIGURNO PLAĆANJE</h3><p>Monri predstavlja brz i siguran online sistem plaćanja narudžbi. Garantuje 100% sigurne transakcije i sigurnost podataka koje pošaljete.</p></div></article></div></section>
  </main></>;
}
