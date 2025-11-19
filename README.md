# Samify - Fashion E-Commerce Store
<div align="center">
  <img height="150" src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif"  />
</div>




###

A modern, fully-functional e-commerce store built with Next.js 14, TypeScript, TailwindCSS, and Zustand for state management.
<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="40" alt="nextjs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg" height="40" alt="storybook logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" height="40" alt="nestjs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="40" alt="jest logo"  />
</div>


## Features
- 🛍️ **Product Catalog** - Browse through 16 curated fashion items
- 🔍 **Product Details** - Detailed product pages with image galleries, size & color selection
- 🛒 **Shopping Cart** - Add items to cart with quantity management and smooth animations
- 💳 **Checkout Process** - Complete checkout flow with form validation
- 📱 **Responsive Design** - Fully responsive across all devices
- 🎨 **Modern UI** - Clean, contemporary design with advanced animations
- ⚡ **Fast Performance** - Built with Next.js 14 for optimal performance
- ✨ **Expert-Level Animations** - GSAP-powered professional animations throughout
- 🎭 **3D Card Tilt** - Interactive 3D tilt effects on product cards
- 🧲 **Magnetic Buttons** - Magnetic hover effects on interactive elements
- 📜 **Scroll Animations** - Scroll-triggered reveal animations
- 🌊 **Parallax Effects** - Smooth parallax scrolling on hero section
- 💫 **Text Reveal** - Word-by-word text reveal animations
- 🎯 **Page Transitions** - Smooth transitions between pages
- 🎨 **Custom Scrollbar** - Styled scrollbar matching the theme

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** GSAP (GreenSock Animation Platform) with ScrollTrigger
- **State Management:** Zustand
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image component

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd "clothe store"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```



###
## Project Structure

```
clothe store/
├── app/                    # Next.js app directory
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── product/[id]/      # Dynamic product detail pages
│   ├── shop/              # Shop page with filters
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── gsap/              # GSAP animation components
│   │   ├── GSAPPageTransition.tsx
│   │   ├── GSAPTextReveal.tsx
│   │   ├── GSAPScrollReveal.tsx
│   │   ├── GSAPMagneticButton.tsx
│   │   ├── GSAPTiltCard.tsx
│   │   ├── GSAPParallax.tsx
│   │   ├── GSAPStaggerGrid.tsx
│   │   ├── HorizontalScrollSection.tsx
│   │   └── SVGLineDrawing.tsx
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   └── ProductCard.tsx    # Product card component
├── data/                  # Static data
│   └── products.ts        # Product catalog (16 products)
├── store/                 # State management
│   └── cartStore.ts       # Cart state with Zustand
├── lib/                   # Utility libraries
│   └── gsap-animations.ts # GSAP animation utilities
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
└── package.json           # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Product Catalog
- 16 sample products across different categories
- Featured products section on homepage
- Product filtering by category on shop page
- Discount badges for sale items
- 3D tilt effect on product cards
- Staggered animation on product grid

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Size and color selection
- Real-time price calculation
- Persistent cart state

### Checkout
- Multi-step form with validation
- Contact information
- Shipping address
- Payment details
- Order summary

## Customization

### Adding Products
Edit `data/products.ts` to add or modify products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  originalPrice: 129.99, // Optional
  images: ['image-url-1', 'image-url-2'],
  category: 'Category',
  sizes: ['S', 'M', 'L'],
  colors: ['Color1', 'Color2'],
  inStock: true,
  featured: true // Optional
}
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Colors are defined in the Tailwind config

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with one click

## Animation Features (Expert-Level GSAP Implementation)

### Implemented Animations
1. ✅ **Smooth Page Transitions** - GSAP timeline-based transitions with power4 easing
2. ✅ **Text Reveal / Split Text Animation** - Word-by-word reveal with 3D rotation and back.out easing
3. ✅ **Scroll-Triggered Animations** - ScrollTrigger plugin with scrubbing and pinning
4. ✅ **Parallax Scrolling** - Multi-layer parallax with yPercent transforms
5. ✅ **Magnetic Buttons / Hover Effects** - Elastic cursor-following with friction physics
6. ✅ **Morphing Shapes** - SVG path morphing capabilities (ready for implementation)
7. ✅ **Staggered Grid Animations** - Advanced stagger with grid-based timing
8. ✅ **Horizontal Scrolling Panels** - Pin and scrub horizontal scroll sections
9. ✅ **3D Card Tilt** - Perspective-based 3D rotation with elastic bounce-back
10. ✅ **SVG Line Drawing** - Stroke-dasharray animation with ScrollTrigger
11. ✅ **Infinite Animations** - Continuous rotation and pulse effects
12. ✅ **Custom Scrollbar** - Themed scrollbar design

### GSAP Features Used
- **ScrollTrigger** - Advanced scroll-based animations with markers and scrubbing
- **Timeline Control** - Orchestrated animation sequences
- **Easing Functions** - power4.out, back.out, elastic.out, sine.inOut
- **Transform Properties** - GPU-accelerated transforms (x, y, scale, rotation)
- **Stagger System** - Grid-based and sequential staggering
- **3D Transforms** - rotationX, rotationY with perspective

## Future Enhancements

- Horizontal scrolling panels for product showcase
- SVG line drawing animations
- Morphing shapes on hover
- User authentication
- Product search functionality
- Product reviews and ratings
- Wishlist feature
- Order history
- Payment gateway integration
- Admin dashboard
- Email notifications
- Product recommendations





###

<h1 align="center">hey there 👋</h1>

###

<h3 align="left">👩‍💻  About Me</h3>

###

<p align="left">I'm ... from ....<br><br>- 🔭 I’m working as ...<br>- 📚 I'm currently learning ...<br>- ⚡ In my free time I ...</p>

###

<h3 align="left">🛠 Language and tools</h3>

###

<div align="left">
 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain-wordmark.svg" height="40" alt="ruby logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-plain-wordmark.svg" height="40" alt="dot-net logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg" height="40" alt="firebase logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-line-wordmark.svg" height="40" alt="amazonwebservices logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/circleci/circleci-plain.svg" height="40" alt="circleci logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" height="40" alt="kubernetes logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height="40" alt="docker logo"  />
</div>

###

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js and TailwindCSS

**Samify** - The Real-Time E-commerce Experience
