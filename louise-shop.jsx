import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Menu, X, Star, Check, ArrowRight, Phone, Mail, Instagram, Facebook, MapPin, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

const LouiseShop = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactForm, setContactForm] = useState({
    nom: '',
    email: '',
    sujet: 'Question sur un produit',
    message: ''
  });

  // Produits du catalogue
  const products = [
    {
      id: 1,
      name: "Robe Louise Élégance",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      category: "Robes",
      description: "Une robe élégante parfaite pour toutes vos occasions spéciales. Tissu fluide et coupe flatteuse.",
      rating: 4.8,
      reviews: 127
    },
    {
      id: 2,
      name: "Sac Audrey Rose",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
      category: "Accessoires",
      description: "Sac à main en cuir véritable, spacieux et raffiné. L'accessoire parfait pour compléter votre look.",
      rating: 4.9,
      reviews: 94
    },
    {
      id: 3,
      name: "Ensemble Camille Chic",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      category: "Ensembles",
      description: "Ensemble deux pièces ultra tendance. Parfait pour un look professionnel et élégant.",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Bijoux Précieux",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop",
      category: "Bijoux",
      description: "Collier délicat en argent sterling avec pendentif raffiné. Élégance intemporelle.",
      rating: 5.0,
      reviews: 203
    },
    {
      id: 5,
      name: "Manteau Sophie Luxe",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
      category: "Manteaux",
      description: "Manteau long en laine mélangée, doublure satinée. Chaleur et élégance assurées.",
      rating: 4.9,
      reviews: 78
    },
    {
      id: 6,
      name: "Escarpins Glamour",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop",
      category: "Chaussures",
      description: "Escarpins en cuir verni avec talon confortable. Féminité et confort réunis.",
      rating: 4.6,
      reviews: 142
    }
  ];

  // Témoignages clients
  const testimonials = [
    {
      name: "Marie Dubois",
      text: "Louise Shop a transformé ma garde-robe ! La qualité est exceptionnelle et le service client irréprochable.",
      rating: 5,
      city: "Paris"
    },
    {
      name: "Sophie Laurent",
      text: "Je commande régulièrement chez Louise Shop. Les produits sont toujours conformes aux photos et la livraison est rapide.",
      rating: 5,
      city: "Lyon"
    },
    {
      name: "Camille Martin",
      text: "Une boutique en ligne qui comprend vraiment les femmes ! Des pièces élégantes à des prix accessibles.",
      rating: 5,
      city: "Marseille"
    }
  ];

  // Slides de la bannière
  const bannerSlides = [
    {
      title: "Nouvelle Collection Printemps",
      subtitle: "Découvrez l'élégance au bout de vos doigts",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop"
    },
    {
      title: "Offre Spéciale -30%",
      subtitle: "Sur toute la collection accessoires",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop"
    },
    {
      title: "Livraison Offerte",
      subtitle: "Dès 75Ar d'achat",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Fonctions du panier
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Navigation
  const NavigationBar = () => (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => setCurrentPage('home')}>
          <div className="logo-icon">
            <img src="/louise.jpeg" alt="Logo Louise Shop" className="logo-img" />
          </div>
          <span className="logo-text">Louise Shop</span>
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}>Accueil</a>
          <a onClick={() => { setCurrentPage('shop'); setMenuOpen(false); }}>Boutique</a>
          <a onClick={() => { setCurrentPage('about'); setMenuOpen(false); }}>À Propos</a>
          <a onClick={() => { setCurrentPage('contact'); setMenuOpen(false); }}>Contact</a>
        </div>

        <div className="nav-actions">
          <button className="icon-btn">
            <Heart size={22} />
          </button>
          <button className="icon-btn cart-btn" onClick={() => setCurrentPage('cart')}>
            <ShoppingCart size={22} />
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );

  // Page d'accueil
  const HomePage = () => (
    <div className="home-page">
      {/* Bannière principale avec carousel */}
      <div className="hero-banner">
        <div className="banner-slider">
          {bannerSlides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <button className="cta-btn" onClick={() => setCurrentPage('shop')}>
                  Découvrir <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button onClick={() => setCurrentSlide((currentSlide - 1 + bannerSlides.length) % bannerSlides.length)}>
            <ChevronLeft size={24} />
          </button>
          <div className="slider-dots">
            {bannerSlides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <button onClick={() => setCurrentSlide((currentSlide + 1) % bannerSlides.length)}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Produits populaires */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Produits Populaires</h2>
            <p>Découvrez nos articles les plus appréciés</p>
          </div>

          <div className="products-grid">
            {products.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="section-cta">
            <button className="btn-secondary" onClick={() => setCurrentPage('shop')}>
              Voir toute la collection
            </button>
          </div>
        </div>
      </section>

      {/* Offre spéciale */}
      <section className="promo-section">
        <div className="container">
          <div className="promo-card">
            <div className="promo-content">
              <span className="promo-badge">Offre Limitée</span>
              <h2>-30% sur tous les accessoires</h2>
              <p>Profitez de notre promotion exclusive jusqu'à la fin du mois</p>
              <button className="cta-btn" onClick={() => setCurrentPage('shop')}>
                J'en profite
              </button>
            </div>
            <div className="promo-image">
              <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop" alt="Promo" />
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Ce que disent nos clientes</h2>
            <p>Plus de 100 clientes satisfaites</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#d4a574" color="#d4a574" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">✓</div>
              <h3>Livraison Rapide</h3>
              <p>2-3 jours ouvrés</p>
            </div>
            <div className="feature">
              <div className="feature-icon">↻</div>
              <h3>Retours Gratuits</h3>
              <p>Sous 30 jours</p>
            </div>
            <div className="feature">
              <div className="feature-icon">★</div>
              <h3>Qualité Premium</h3>
              <p>Sélection rigoureuse</p>
            </div>
            <div className="feature">
              <div className="feature-icon">♡</div>
              <h3>Service Client</h3>
              <p>À votre écoute 7j/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Carte produit
  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button className="wishlist-btn">
          <Heart size={20} />
        </button>
        <span className="product-category">{product.category}</span>
        {product.id === 1 && <span className="product-badge">🎉 NOUVEAU</span>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? "#d4a574" : "none"}
                color="#d4a574"
              />
            ))}
          </div>
          <span className="reviews">({product.reviews} avis)</span>
        </div>
        <p className="product-price">{product.price.toFixed(2)}Ar</p>
        <div className="product-actions">
          <button
            className="btn-primary"
            onClick={() => {
              setSelectedProduct(product);
              setCurrentPage('product');
            }}
          >
            Voir le produit
          </button>
          <button
            className="btn-icon"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  // Page boutique
  const ShopPage = () => (
    <div className="shop-page">
      <div className="page-header">
        <h1>Notre Collection</h1>
        <p>Découvrez tous nos produits soigneusement sélectionnés</p>
      </div>

      <div className="container">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );

  // Page produit détaillée
  const ProductPage = () => {
    if (!selectedProduct) return null;

    return (
      <div className="product-page">
        <div className="container">
          <button className="back-btn" onClick={() => setCurrentPage('shop')}>
            ← Retour à la boutique
          </button>

          <div className="product-detail">
            <div className="product-detail-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="product-detail-info">
              <span className="product-category-badge">{selectedProduct.category}</span>
              <h1>{selectedProduct.name}</h1>

              <div className="product-rating-large">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(selectedProduct.rating) ? "#d4a574" : "none"}
                      color="#d4a574"
                    />
                  ))}
                </div>
                <span>{selectedProduct.rating} ({selectedProduct.reviews} avis)</span>
              </div>

              <p className="product-price-large">{selectedProduct.price.toFixed(2)}Ar</p>

              <p className="product-description-large">{selectedProduct.description}</p>

              <div className="product-features">
                <div className="feature-item">
                  <Check size={18} color="#d4a574" />
                  <span>Livraison gratuite dès 75Ar</span>
                </div>
                <div className="feature-item">
                  <Check size={18} color="#d4a574" />
                  <span>Retours gratuits sous 30 jours</span>
                </div>
                <div className="feature-item">
                  <Check size={18} color="#d4a574" />
                  <span>Paiement sécurisé</span>
                </div>
              </div>

              <button
                className="btn-primary btn-large"
                onClick={() => {
                  addToCart(selectedProduct);
                  setCurrentPage('cart');
                }}
              >
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>
            </div>
          </div>

          {/* Avis clients */}
          <div className="product-reviews">
            <h2>Avis Clients</h2>
            <div className="reviews-list">
              {testimonials.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div>
                      <strong>{review.name}</strong>
                      <div className="stars">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#d4a574" color="#d4a574" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Page panier
  const CartPage = () => (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Mon Panier</h1>
          <p>{getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={64} color="#e8d5c4" />
            <h2>Votre panier est vide</h2>
            <p>Découvrez notre collection et ajoutez vos articles préférés</p>
            <button className="btn-primary" onClick={() => setCurrentPage('shop')}>
              Découvrir la boutique
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">{item.price.toFixed(2)}Ar</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="cart-item-total">{(item.price * item.quantity).toFixed(2)}Ar</p>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Récapitulatif</h3>
              <div className="summary-line">
                <span>Sous-total</span>
                <span>{getTotalPrice()}Ar</span>
              </div>
              <div className="summary-line">
                <span>Livraison</span>
                <span>{parseFloat(getTotalPrice()) >= 75 ? 'GRATUITE' : '4.99Ar'}</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>{(parseFloat(getTotalPrice()) + (parseFloat(getTotalPrice()) >= 75 ? 0 : 4.99)).toFixed(2)}Ar</span>
              </div>
              <a href="https://wa.me/261347310555" className="btn-primary btn-large" target="_blank" rel="noopener noreferrer">
                Procéder au paiement
              </a>
              <p className="security-note">
                <Check size={16} color="#d4a574" />
                Paiement 100% sécurisé
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Page À Propos
  const AboutPage = () => (
    <div className="about-page">
      <div className="about-hero">
        <h1>À Propos de Louise Shop</h1>
        <p>L'élégance au bout de vos doigts</p>
      </div>

      <div className="container">
        <div className="about-content">
          <div className="about-section">
            <h2>Notre Histoire</h2>
            <p>
              Louise Shop est née d'une passion pour la mode féminine et le désir de rendre l'élégance accessible à toutes les femmes.
              Fondée en 2020, notre boutique en ligne s'est rapidement imposée comme une référence pour les femmes en quête de qualité,
              de style et de sophistication.
            </p>
            <p>
              Chaque pièce de notre collection est soigneusement sélectionnée pour sa qualité exceptionnelle, son design intemporel
              et sa capacité à sublimer la féminité de celle qui la porte. Nous croyons que chaque femme mérite de se sentir belle,
              confiante et unique.
            </p>
          </div>

          <div className="about-section">
            <h2>Nos Valeurs</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Qualité</h3>
                <p>Nous sélectionnons uniquement des produits de haute qualité, confectionnés avec soin et attention aux détails.</p>
              </div>
              <div className="value-card">
                <h3>Élégance</h3>
                <p>Chaque article reflète notre engagement envers la beauté et le raffinement dans la simplicité.</p>
              </div>
              <div className="value-card">
                <h3>Service Client</h3>
                <p>Votre satisfaction est notre priorité. Notre équipe est à votre écoute pour vous accompagner.</p>
              </div>
              <div className="value-card">
                <h3>Accessibilité</h3>
                <p>L'élégance doit être accessible. Nous proposons des prix justes sans compromis sur la qualité.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Notre Engagement</h2>
            <p>
              Chez Louise Shop, nous nous engageons à vous offrir une expérience d'achat exceptionnelle. De la sélection de nos produits
              à la livraison à votre porte, chaque étape est pensée pour votre confort et votre satisfaction.
            </p>
            <p>
              Nous travaillons avec des fournisseurs de confiance qui partagent nos valeurs de qualité et d'éthique. Chaque achat chez
              Louise Shop est une promesse de style, de durabilité et de service irréprochable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Page Contact
  const ContactPage = () => (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contactez-nous</h1>
        <p>Notre équipe est à votre écoute</p>
      </div>

      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Restons en Contact</h2>
            <p>
              Vous avez une question sur nos produits, votre commande ou nos services ?
              N'hésitez pas à nous contacter, nous sommes là pour vous aider.
            </p>

            <div className="contact-methods">
              <a href="https://wa.me/33612345678" className="contact-method">
                <Phone size={24} />
                <div>
                  <strong>WhatsApp</strong>
                  <p>+33 6 12 34 56 78</p>
                </div>
              </a>

              <a href="mailto:contact@louiseshop.fr" className="contact-method">
                <Mail size={24} />
                <div>
                  <strong>Email</strong>
                  <p>contact@louiseshop.fr</p>
                </div>
              </a>

              <div className="contact-method">
                <MapPin size={24} />
                <div>
                  <strong>Adresse</strong>
                  <p>75008 Paris, France</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h3>Suivez-nous</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <Instagram size={24} />
                </a>
                <a href="#" className="social-icon">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formattedMessage = `Nom: ${contactForm.nom}\nEmail: ${contactForm.email}\nSujet: ${contactForm.sujet}\nMessage: ${contactForm.message}`;
                const encodedMessage = encodeURIComponent(formattedMessage);
                window.open(`https://m.me/tolonjanahary.marcelo.1?text=${encodedMessage}`, '_blank');
                setContactForm({ nom: '', email: '', sujet: 'Question sur un produit', message: '' });
              }}
            >
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  placeholder="Marie Dupont"
                  value={contactForm.nom}
                  onChange={(e) => setContactForm({ ...contactForm, nom: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="marie@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Sujet</label>
                <select
                  value={contactForm.sujet}
                  onChange={(e) => setContactForm({ ...contactForm, sujet: e.target.value })}
                >
                  <option>Question sur un produit</option>
                  <option>Suivi de commande</option>
                  <option>Retour/Échange</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="5"
                  placeholder="Votre message..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary btn-large">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <div className="logo-icon footer-logo-icon">
                <img src="/louise.jpeg" alt="Louise Shop" className="footer-logo-img" />
              </div>
              <span>Louise Shop</span>
            </div>
            <p>L'élégance au bout de vos doigts. Découvrez notre sélection de produits raffinés pour sublimer votre style.</p>
            <div className="social-icons">
              <a href="#"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61584913733977" target="_blank"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Informations</h4>
            <ul>
              <li><a onClick={() => setCurrentPage('about')}>À propos</a></li>
              <li><a href="#">Nos engagements</a></li>
              <li><a href="#">Blog</a></li>
              <li><a onClick={() => setCurrentPage('contact')}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Service Client</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Livraison</a></li>
              <li><a href="#">Retours & Échanges</a></li>
              <li><a href="#">Guide des tailles</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Légal</h4>
            <ul>
              <li><a href="#">Conditions générales</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">CGV</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Louise Shop. Tous droits réservés.</p>
          <p>Paiement sécurisé • Livraison rapide • Retours gratuits</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="louise-shop">
      <NavigationBar />

      <main className="main-content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .louise-shop {
          font-family: 'Montserrat', sans-serif;
          color: #2d2d2d;
          background: #fefcfa;
          min-height: 100vh;
        }

        /* Navigation */
        .nav-bar {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #f0e6dc;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 20px rgba(212, 165, 116, 0.08);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.7rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .nav-logo:hover {
          transform: translateY(-2px);
        }

        .logo-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #d4a574 0%, #b66f34 100%);
          color: white;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          box-shadow: 0 6px 18px rgba(120, 80, 40, 0.25);
          border: 2px solid rgba(255,255,255,0.09);
          transform-origin: left center;
        }

        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.05) contrast(1.05);
        }

        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          color: #111111;
          letter-spacing: 0.2px;
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }

        .nav-logo:hover .logo-icon {
          transform: scale(1.03) translateY(-2px);
          box-shadow: 0 14px 36px rgba(150,100,50,0.5), inset 0 -6px 14px rgba(0,0,0,0.14);
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .nav-links a {
          color: #2d2d2d;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .nav-links a:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #d4a574;
          transition: width 0.3s ease;
        }

        .nav-links a:hover {
          color: #d4a574;
        }

        .nav-links a:hover:after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.6rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          color: #2d2d2d;
          position: relative;
        }

        .icon-btn:hover {
          background: #f9f3ee;
          transform: translateY(-2px);
        }

        .cart-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: #d4a574;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #2d2d2d;
        }

        /* Hero Banner */
        .hero-banner {
          position: relative;
          height: 420px;
          overflow: hidden;
        }

        .banner-slider {
          position: relative;
          height: 100%;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease;
          background-size: cover;
          background-position: center;
        }

        .slide.active {
          opacity: 1;
        }

        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(212, 165, 116, 0.5) 0%, rgba(45, 45, 45, 0.7) 100%);
        }

        .slide-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          animation: slideIn 1s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 44px;
          font-weight: 700;
          color: white;
          margin-bottom: 0.6rem;
          text-shadow: 0 3px 14px rgba(0, 0, 0, 0.28);
          letter-spacing: 0.8px;
        }

        .slide-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          font-weight: 300;
          letter-spacing: 0.8px;
        }

        .slider-controls {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 2rem;
          z-index: 20;
        }

        .slider-controls button {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #2d2d2d;
        }

        .slider-controls button:hover {
          background: white;
          transform: scale(1.1);
        }

        .slider-dots {
          display: flex;
          gap: 0.8rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: white;
          width: 30px;
          border-radius: 5px;
        }

        /* Buttons */
        .cta-btn, .btn-primary {
          background: linear-gradient(135deg, #d4a574 0%, #c99159 100%);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(212, 165, 116, 0.3);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .cta-btn:hover, .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(212, 165, 116, 0.4);
        }

        a.btn-primary {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        a.btn-primary:visited {
          color: white;
        }

        .btn-secondary {
          background: transparent;
          color: #d4a574;
          border: 2px solid #d4a574;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .btn-secondary:hover {
          background: #d4a574;
          color: white;
          transform: translateY(-3px);
        }

        .btn-large {
          padding: 1.2rem 3rem;
          font-size: 16px;
          width: 100%;
        }

        .btn-icon {
          background: #f9f3ee;
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #2d2d2d;
        }

        .btn-icon:hover {
          background: #d4a574;
          color: white;
          transform: translateY(-3px);
        }

        /* Sections */
        .section {
          padding: 5rem 0;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .section-header p {
          font-size: 18px;
          color: #666;
          font-weight: 300;
        }

        .section-cta {
          text-align: center;
          margin-top: 3rem;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.5rem;
          margin-bottom: 2rem;
        }

        .product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 40px rgba(212, 165, 116, 0.2);
        }

        .product-image {
          position: relative;
          overflow: hidden;
          height: 400px;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.1);
        }

        .wishlist-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #2d2d2d;
          opacity: 0;
        }

        .product-card:hover .wishlist-btn {
          opacity: 1;
        }

        .wishlist-btn:hover {
          background: #d4a574;
          color: white;
        }

        .product-category {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background: rgba(212, 165, 116, 0.95);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .product-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #d4a574 0%, #c99560 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(212, 165, 116, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: #2d2d2d;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .reviews {
          font-size: 13px;
          color: #999;
        }

        .product-price {
          font-size: 24px;
          font-weight: 600;
          color: #d4a574;
          margin-bottom: 1rem;
          font-family: 'Cormorant Garamond', serif;
        }

        .product-actions {
          display: flex;
          gap: 0.8rem;
        }

        .product-actions .btn-primary {
          flex: 1;
          justify-content: center;
        }

        /* Promo Section */
        .promo-section {
          background: linear-gradient(135deg, #f9f3ee 0%, #f0e6dc 100%);
          padding: 5rem 0;
        }

        .promo-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          background: white;
          border-radius: 30px;
          padding: 4rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .promo-badge {
          display: inline-block;
          background: #d4a574;
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .promo-content h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2d2d2d;
        }

        .promo-content p {
          font-size: 16px;
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .promo-image {
          border-radius: 20px;
          overflow: hidden;
          height: 400px;
        }

        .promo-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Testimonials */
        .testimonials-section {
          background: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: #f9f3ee;
          padding: 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(212, 165, 116, 0.15);
        }

        .testimonial-card .stars {
          margin-bottom: 1rem;
        }

        .testimonial-text {
          font-size: 15px;
          line-height: 1.7;
          color: #555;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .testimonial-author strong {
          color: #2d2d2d;
          font-size: 16px;
        }

        .testimonial-author span {
          color: #999;
          font-size: 13px;
        }

        /* Features */
        .features-section {
          background: #2d2d2d;
          padding: 4rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }

        .feature {
          text-align: center;
          color: white;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: #d4a574;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 28px;
          font-weight: 600;
        }

        .feature h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          margin-bottom: 0.5rem;
        }

        .feature p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        /* Page Headers */
        .page-header {
          text-align: center;
          padding: 4rem 2rem 2rem;
          background: linear-gradient(135deg, #f9f3ee 0%, #f0e6dc 100%);
        }

        .page-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 1rem;
        }

        .page-header p {
          font-size: 18px;
          color: #666;
        }

        /* Shop Page */
        .shop-page {
          min-height: 80vh;
        }

        /* Product Detail Page */
        .product-page {
          padding: 3rem 0;
        }

        .back-btn {
          background: none;
          border: none;
          color: #d4a574;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          transform: translateX(-5px);
        }

        .product-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .product-detail-image {
          border-radius: 20px;
          overflow: hidden;
          height: 600px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .product-detail-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-category-badge {
          display: inline-block;
          background: #f9f3ee;
          color: #d4a574;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .product-detail-info h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 1.5rem;
        }

        .product-rating-large {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .product-rating-large span {
          color: #666;
          font-size: 15px;
        }

        .product-price-large {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 600;
          color: #d4a574;
          margin-bottom: 2rem;
        }

        .product-description-large {
          font-size: 16px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 2rem;
        }

        .product-features {
          background: #f9f3ee;
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.5rem 0;
          font-size: 14px;
          color: #555;
        }

        .product-reviews {
          margin-top: 4rem;
        }

        .product-reviews h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          margin-bottom: 2rem;
        }

        .reviews-list {
          display: grid;
          gap: 1.5rem;
        }

        .review-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          border: 1px solid #f0e6dc;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .review-card strong {
          display: block;
          margin-bottom: 0.5rem;
          color: #2d2d2d;
        }

        .review-card p {
          color: #555;
          line-height: 1.6;
        }

        /* Cart Page */
        .cart-page {
          min-height: 80vh;
          padding: 3rem 0;
        }

        .empty-cart {
          text-align: center;
          padding: 5rem 2rem;
        }

        .empty-cart svg {
          margin-bottom: 2rem;
        }

        .empty-cart h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          margin-bottom: 1rem;
          color: #2d2d2d;
        }

        .empty-cart p {
          color: #666;
          margin-bottom: 2rem;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          margin-top: 2rem;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 100px 1fr auto auto auto;
          gap: 1.5rem;
          align-items: center;
          background: white;
          padding: 1.5rem;
          border-radius: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .cart-item img {
          width: 100px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
        }

        .cart-item-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          margin-bottom: 0.5rem;
        }

        .cart-item-price {
          color: #999;
          font-size: 14px;
        }

        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f9f3ee;
          padding: 0.5rem;
          border-radius: 30px;
        }

        .cart-item-quantity button {
          width: 30px;
          height: 30px;
          border: none;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          color: #2d2d2d;
          transition: all 0.3s ease;
        }

        .cart-item-quantity button:hover {
          background: #d4a574;
          color: white;
        }

        .cart-item-quantity span {
          min-width: 30px;
          text-align: center;
          font-weight: 600;
        }

        .cart-item-total {
          font-size: 20px;
          font-weight: 600;
          color: #d4a574;
          font-family: 'Cormorant Garamond', serif;
          min-width: 100px;
          text-align: right;
        }

        .cart-item-remove {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 0.5rem;
          transition: all 0.3s ease;
        }

        .cart-item-remove:hover {
          color: #ff4444;
        }

        .cart-summary {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .cart-summary h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          margin-bottom: 1.5rem;
          color: #2d2d2d;
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid #f0e6dc;
          color: #555;
        }

        .summary-line.total {
          border-top: 2px solid #d4a574;
          border-bottom: none;
          margin-top: 1rem;
          padding-top: 1.5rem;
          font-size: 20px;
          font-weight: 600;
          color: #2d2d2d;
        }

        .summary-line.total span:last-child {
          color: #d4a574;
          font-family: 'Cormorant Garamond', serif;
        }

        .cart-summary .btn-primary {
          margin-top: 1.5rem;
        }

        .security-note {
          text-align: center;
          color: #999;
          font-size: 13px;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        /* About Page */
        .about-hero {
          background: linear-gradient(135deg, #f9f3ee 0%, #f0e6dc 100%);
          padding: 5rem 2rem;
          text-align: center;
        }

        .about-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 1rem;
        }

        .about-hero p {
          font-size: 20px;
          color: #666;
        }

        .about-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .about-section {
          margin-bottom: 4rem;
        }

        .about-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 1.5rem;
        }

        .about-section p {
          font-size: 16px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .value-card {
          background: #f9f3ee;
          padding: 2rem;
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(212, 165, 116, 0.15);
        }

        .value-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #d4a574;
          margin-bottom: 1rem;
        }

        .value-card p {
          font-size: 14px;
          line-height: 1.6;
          color: #555;
        }

        /* Contact Page */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 3rem;
        }

        .contact-info h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          margin-bottom: 1.5rem;
          color: #2d2d2d;
        }

        .contact-info p {
          font-size: 16px;
          line-height: 1.7;
          color: #555;
          margin-bottom: 2rem;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: white;
          border-radius: 15px;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .contact-method:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 20px rgba(212, 165, 116, 0.15);
        }

        .contact-method svg {
          color: #d4a574;
          flex-shrink: 0;
        }

        .contact-method strong {
          display: block;
          color: #2d2d2d;
          margin-bottom: 0.3rem;
        }

        .contact-method p {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .social-links h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          margin-bottom: 1rem;
          color: #2d2d2d;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          background: #f9f3ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #2d2d2d;
        }

        .social-icon:hover {
          background: #d4a574;
          color: white;
          transform: translateY(-5px);
        }

        .contact-form-container {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #2d2d2d;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 1rem;
          border: 2px solid #f0e6dc;
          border-radius: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4a574;
        }

        /* Footer */
        .footer {
          background: #2d2d2d;
          color: white;
          padding: 4rem 0 2rem;
          margin-top: 5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .footer-logo span {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
        }

        .footer-logo-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.06);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
          border: 2px solid rgba(255,255,255,0.06);
        }

        .footer-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .footer-column p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .footer-column h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          margin-bottom: 1.5rem;
          color: #d4a574;
        }

        .footer-column ul {
          list-style: none;
        }

        .footer-column ul li {
          margin-bottom: 0.8rem;
        }

        .footer-column ul li a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .footer-column ul li a:hover {
          color: #d4a574;
          padding-left: 5px;
        }

        .footer-column .social-icons {
          display: flex;
          gap: 1rem;
        }

        .footer-column .social-icon {
          background: rgba(255, 255, 255, 0.1);
        }

        .footer-column .social-icon:hover {
          background: #d4a574;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bottom p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          margin-bottom: 0.5rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: white;
            flex-direction: column;
            padding: 2rem;
            transition: left 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .nav-links.active {
            left: 0;
          }

          .menu-toggle {
            display: block;
          }

          .promo-card {
            grid-template-columns: 1fr;
          }

          .product-detail {
            grid-template-columns: 1fr;
          }

          .cart-content {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .slide-title {
            font-size: 40px;
          }

          .slide-subtitle {
            font-size: 16px;
          }

          .section-header h2 {
            font-size: 36px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .cart-item {
            grid-template-columns: 80px 1fr;
            gap: 1rem;
          }

          .cart-item-quantity,
          .cart-item-total,
          .cart-item-remove {
            grid-column: 2;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LouiseShop;