'use client';

import { useState } from 'react';
import { Star, ThumbsUp, Flag, Check, X } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
  date: Date;
  verified: boolean;
  helpful: number;
  images?: string[];
  size?: string;
  color?: string;
}

interface ReviewsSectionProps {
  productId: string;
  averageRating?: number;
  totalReviews?: number;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    rating: 5,
    title: 'Absolutely love it!',
    content: 'This product exceeded my expectations. The quality is outstanding and it fits perfectly. Highly recommend!',
    date: new Date('2024-10-15'),
    verified: true,
    helpful: 24,
    size: 'M',
    color: 'Black'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Michael Chen',
    rating: 4,
    title: 'Great quality, runs a bit small',
    content: 'Really happy with the purchase. Material feels premium. Only issue is it runs slightly small, so I recommend sizing up.',
    date: new Date('2024-10-10'),
    verified: true,
    helpful: 18,
    images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80'],
    size: 'L',
    color: 'Navy'
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Emma Davis',
    rating: 5,
    title: 'Perfect!',
    content: 'Exactly what I was looking for. Fast shipping and excellent customer service.',
    date: new Date('2024-10-05'),
    verified: false,
    helpful: 12,
    size: 'S',
    color: 'White'
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'James Wilson',
    rating: 3,
    title: 'Good but not great',
    content: 'It\'s okay. Quality is decent for the price, but I expected a bit more based on the reviews.',
    date: new Date('2024-09-28'),
    verified: true,
    helpful: 5,
    size: 'XL',
    color: 'Grey'
  }
];

export default function ReviewsSection({ productId, averageRating = 4.5, totalReviews = 128 }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  // Rating distribution
  const ratingDistribution = {
    5: 78,
    4: 32,
    3: 12,
    2: 4,
    1: 2
  };

  const filteredReviews = reviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'helpful':
          return b.helpful - a.helpful;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
        default:
          return b.date.getTime() - a.date.getTime();
      }
    });

  const handleHelpful = (reviewId: string) => {
    const newHelpful = new Set(helpfulReviews);
    if (newHelpful.has(reviewId)) {
      newHelpful.delete(reviewId);
    } else {
      newHelpful.add(reviewId);
    }
    setHelpfulReviews(newHelpful);
  };

  const StarRating = ({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-12">
      {/* Rating Overview */}
      <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl font-bold">{averageRating.toFixed(1)}</div>
              <div>
                <StarRating rating={Math.round(averageRating)} size="lg" />
                <p className="text-sm text-gray-600 mt-1">{totalReviews} reviews</p>
              </div>
            </div>
            <button
              onClick={() => setShowWriteReview(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Write a Review
            </button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution];
              const percentage = (count / totalReviews) * 100;

              return (
                <button
                  key={rating}
                  onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                  className={`flex items-center gap-3 w-full hover:bg-gray-50 p-2 rounded transition ${
                    filterRating === rating ? 'bg-primary/10' : ''
                  }`}
                >
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {filterRating && (
          <button
            onClick={() => setFilterRating(null)}
            className="text-sm text-primary hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.userName}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        <Check className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="text-sm text-gray-500">
                      {review.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <button className="text-gray-400 hover:text-gray-600">
                <Flag className="w-5 h-5" />
              </button>
            </div>

            {/* Review Content */}
            <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

            {/* Purchase Details */}
            {(review.size || review.color) && (
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                {review.size && <span>Size: {review.size}</span>}
                {review.color && <span>Color: {review.color}</span>}
              </div>
            )}

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Review image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleHelpful(review.id)}
                className={`flex items-center gap-2 text-sm transition ${
                  helpfulReviews.has(review.id)
                    ? 'text-primary font-semibold'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${helpfulReviews.has(review.id) ? 'fill-primary' : ''}`} />
                Helpful ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredReviews.length < totalReviews && (
        <div className="text-center mt-8">
          <button className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-primary hover:text-primary transition">
            Load More Reviews
          </button>
        </div>
      )}

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Write a Review</h3>
              <button
                onClick={() => setShowWriteReview(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block font-semibold mb-2">Your Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="p-2 hover:scale-110 transition"
                    >
                      <Star className="w-8 h-8 text-gray-300 hover:text-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold mb-2">Review Title *</label>
                <input
                  type="text"
                  placeholder="Sum up your experience"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-semibold mb-2">Your Review *</label>
                <textarea
                  rows={5}
                  placeholder="Tell us what you think"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              {/* Purchase Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Size Purchased</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Select size</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Color Purchased</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Select color</option>
                    <option>Black</option>
                    <option>White</option>
                    <option>Navy</option>
                    <option>Grey</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowWriteReview(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
