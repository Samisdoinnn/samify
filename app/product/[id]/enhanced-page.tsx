'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, Share2, Star, ChevronLeft, ChevronRight, 
  Truck, RefreshCw, Shield, Check, Plus, Minus, ZoomIn 
} from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import GSAPScrollReveal from '@/components/gsap/GSAPScrollReveal';
import GSAPTiltCard from '@/components/gsap/GSAPTiltCard';

export default function EnhancedProductPage() {
  const params = useParams();
  const product = products.find(p => p.id === params.id);
  const { addItem } = useCartStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    alert('Added to cart!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-primary">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <GSAPScrollReveal>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-4 group">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {hasDiscount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                    -{discountPercentage}% OFF
                  </div>
                )}
                <button
                  onClick={() => setShowZoom(true)}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </GSAPScrollReveal>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <GSAPScrollReveal delay={0.2}>
              {/* Title & Rating */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(128 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice!.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-semibold">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-semibold text-gray-900">Size:</label>
                  <button className="text-sm text-primary hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="font-semibold text-gray-900 block mb-3">
                  Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="font-semibold text-gray-900 block mb-3">Quantity:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">Only 12 items left</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border-2 rounded-lg transition ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 hover:border-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary transition"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm font-medium">Free Shipping</span>
                  <span className="text-xs text-gray-500">On orders over $50</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RefreshCw className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm font-medium">Easy Returns</span>
                  <span className="text-xs text-gray-500">30-day return policy</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm font-medium">Secure Payment</span>
                  <span className="text-xs text-gray-500">100% secure</span>
                </div>
              </div>
            </GSAPScrollReveal>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <GSAPScrollReveal>
            <div className="border-b border-gray-200 mb-8">
              <div className="flex gap-8">
                {(['description', 'specs', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-semibold capitalize transition ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="prose max-w-none">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Premium quality materials</li>
                    <li>Comfortable fit for all-day wear</li>
                    <li>Easy care and maintenance</li>
                    <li>Available in multiple sizes and colors</li>
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Specifications</h3>
                  <table className="w-full">
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 font-semibold">Category</td>
                        <td className="py-3 text-gray-600">{product.category}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">Available Sizes</td>
                        <td className="py-3 text-gray-600">{product.sizes.join(', ')}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">Available Colors</td>
                        <td className="py-3 text-gray-600">{product.colors.join(', ')}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">Material</td>
                        <td className="py-3 text-gray-600">100% Premium Cotton</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Shipping & Returns</h3>
                  <div className="space-y-4 text-gray-600">
                    <p><strong>Free Shipping:</strong> On all orders over $50</p>
                    <p><strong>Standard Delivery:</strong> 5-7 business days</p>
                    <p><strong>Express Delivery:</strong> 2-3 business days (additional fee)</p>
                    <p><strong>Returns:</strong> 30-day return policy. Items must be unworn and in original packaging.</p>
                  </div>
                </div>
              )}
            </div>
          </GSAPScrollReveal>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <GSAPScrollReveal>
              <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="group"
                  >
                    <GSAPTiltCard className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-300"
                      />
                    </GSAPTiltCard>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-primary font-bold mt-1">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </Link>
                ))}
              </div>
            </GSAPScrollReveal>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-4xl w-full aspect-[3/4]">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain"
            />
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
