# UI/UX & Performance Improvements Plan

This plan outlines a comprehensive set of improvements for the MUD Escola de Cerâmica website to enhance both the user experience and technical performance.

## 🎨 UI/UX Improvements

### 1. Tactile Feedback (`active:scale-[0.98]`)
- **Action**: Add `active:scale-[0.98]` to all interactive elements to provide immediate tactile response when tapped/clicked.
- **Files**: 
  - `src/components/ui/button.tsx`
  - `src/components/cards/blog-card.tsx`
  - `src/components/cards/class-card.tsx`

### 2. Scroll Animations (framer-motion)
- **Action**: Install `framer-motion` and implement lightweight "fade-up" animations (`translate-y-4 opacity-0` -> `translate-y-0 opacity-100`) as users scroll down the page.
- **Dependencies**: `npm install framer-motion`
- **Implementation**: Create a reusable `ScrollReveal` component wrapping major sections in `home-page.tsx`, `classes-page.tsx`, etc.

### 3. Smart Sticky Header
- **Action**: Update the header to hide when scrolling down (to maximize screen real estate on mobile) and reveal immediately when scrolling up.
- **Files**: `src/components/site/site-header.tsx`
- **Implementation**: Track `window.scrollY` in a `useEffect` and apply a `-translate-y-full` class dynamically based on scroll direction.

### 4. Fluid Typography
- **Action**: Replace hardcoded breakpoints (e.g., `text-[1.75rem] sm:text-[2rem]`) with fluid `clamp()` values.
- **Files**: `src/components/ui/section-heading.tsx`

### 5. Skeleton Loaders
- **Action**: Create localized loading UI for page transitions to prevent "blank screens" while App Router fetches new routes.
- **Files**: 
  - `src/app/loading.tsx`
  - `src/app/[locale]/loading.tsx`

---

## ⚡ Performance Optimizations

### 6. Image Sizes Refinement
- **Action**: Provide specific `sizes` attributes to `ArtImage` components based on their layout usage, rather than the generic fallback.
- **Files**: 
  - `src/components/ui/art-image.tsx`
  - `src/components/cards/class-card.tsx`
  - `src/components/cards/blog-card.tsx`

### 7. Dynamic Imports
- **Action**: Lazy-load the heavy iframe-based Map component to prevent it from blocking the main thread during initial page load.
- **Files**: 
  - `src/components/pages/contact-page.tsx`
  - `src/components/pages/home-page.tsx`
- **Implementation**: Use `next/dynamic` to load `MapEmbed` only when needed.

### 8. Preload LCP (Largest Contentful Paint)
- **Action**: Explicitly mark the hero image as the LCP element and ensure it is eagerly loaded.
- **Files**: `src/components/pages/home-page.tsx` (ensure `priority` is set on the hero `ArtImage`).

### 9. Touch Target Optimization
- **Action**: Ensure all buttons and links on mobile devices have a minimum hit area of 44x44px.
- **Files**: 
  - `src/components/site/mobile-dock.tsx`
  - `src/components/site/language-switcher.tsx`