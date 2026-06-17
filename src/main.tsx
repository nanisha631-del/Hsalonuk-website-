/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import all Shopify customizer-enabled components
import HeaderMarquee from './components/HeaderMarquee';
import Navbar from './components/Navbar';
import CurrentlyObsessed from './components/CurrentlyObsessed';
import TrustCards from './components/TrustCards';
import WaveScrollSection from './components/WaveScrollSection';
import ParallaxSplit from './components/ParallaxSplit';
import AutoScrollCards from './components/AutoScrollCards';
import ShopTheLook from './components/ShopTheLook';
import GreetingSection from './components/GreetingSection';
import LightweightFormulas from './components/LightweightFormulas';
import ScrollingBanner from './components/ScrollingBanner';
import CommunitySection from './components/CommunitySection';
import HoverAccordion from './components/HoverAccordion';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ShopifyInstructionModal from './components/ShopifyInstructionModal';
import HeroSection from './components/HeroSection';
import BestsellersCarousel from './components/BestsellersCarousel';
import MakeupPouchFeature from './components/MakeupPouchFeature';
import FunEditorialSection from './components/FunEditorialSection';
import HSalonScrollSection from './components/HSalonScrollSection';

import { useSharedState } from './useSharedState';

// Keep references to active React roots to avoid mounting duplicate elements
let spaReactRoot: Root | null = null;
const shopifyReactRoots: Root[] = [];

/**
 * Global Overlays keeps Cart Drawer and Shopify instruction modals persistently active
 * across individual templates on your live Shopify site.
 */
function GlobalOverlays() {
  const { state, updateState, handleRemoveItem, handleUpdateQuantity } = useSharedState();
  return (
    <>
      <CartDrawer
        isOpen={state.cartOpen}
        onClose={() => updateState({ cartOpen: false })}
        cartItems={state.cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <ShopifyInstructionModal
        isOpen={state.shopifyModalOpen}
        onClose={() => updateState({ shopifyModalOpen: false })}
      />
    </>
  );
}

/**
 * Wraps Navbar inside shared state triggers to sync cart item quantites and slideouts.
 */
function NavbarSectionWrapper() {
  const { state, updateState, handleGoHome } = useSharedState();
  const cartCount = state.cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  return (
    <Navbar
      cartCount={cartCount}
      onCartClick={() => updateState({ cartOpen: true })}
      currentView={state.currentView}
      onGoHome={handleGoHome}
      onSearchClick={() => {
        alert("Dynamic Instant Search will look up collections in active store database!");
      }}
      onMenuClick={() => {
        const side = document.getElementById("bestsellers-section");
        if (side) side.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
}

/**
 * Wraps ShopTheLook section with the global state event handlers.
 */
function ShopTheLookSectionWrapper() {
  const { handleSelectProduct, handleAddToCart } = useSharedState();
  return (
    <ShopTheLook
      onSelectProduct={handleSelectProduct}
      onAddToCart={(p, qty) => handleAddToCart(p, qty, p.colors && p.colors.length > 0 ? p.colors[0].name : undefined)}
    />
  );
}

/**
 * Wraps the Footer with proper layout callbacks.
 */
function FooterSectionWrapper() {
  const { handleGoHome } = useSharedState();
  return <Footer onGoHome={handleGoHome} />;
}

// Maps component names in liquid templates directly to active React classes
const COMPONENT_MAP: Record<string, any> = {
  AnnouncementBar: HeaderMarquee,
  Navbar: NavbarSectionWrapper,
  HeroSection: HeroSection,
  BestsellersCarousel: BestsellersCarousel,
  CurrentlyObsessed: CurrentlyObsessed,
  TrustCards: TrustCards,
  HSalonScrollSection: HSalonScrollSection,
  WaveScrollSection: WaveScrollSection,
  ParallaxSplit: ParallaxSplit,
  AutoScrollCards: AutoScrollCards,
  ShopTheLook: ShopTheLookSectionWrapper,
  GreetingSection: GreetingSection,
  LightweightFormulas: LightweightFormulas,
  MakeupPouchFeature: MakeupPouchFeature,
  ScrollingBanner: ScrollingBanner,
  FunEditorialSection: FunEditorialSection,
  CommunitySection: CommunitySection,
  HoverAccordion: HoverAccordion,
  Footer: FooterSectionWrapper,
};

/**
 * Universal mount function matching the visual setup environment.
 */
function mountApp() {
  // Reset previous global settings cache to parse fresh customizer settings
  const win = window as any;
  win.__mergedShopifySettings = null;

  // 1. Check if we are running in multi-section Shopify host mode
  const sectionContainers = document.querySelectorAll('.shopify-react-section');
  
  if (sectionContainers.length > 0) {
    console.log(`Starting Shopify hybrid sections: found ${sectionContainers.length} target containers.`);
    
    // Unmount existing individual Shopify sections
    shopifyReactRoots.forEach((root) => {
      try {
        root.unmount();
      } catch (e) {
        // ignore
      }
    });
    shopifyReactRoots.length = 0;

    // Mount each section container separately
    sectionContainers.forEach((el) => {
      const compName = el.getAttribute('data-react-component');
      if (!compName) return;

      const Component = COMPONENT_MAP[compName];
      if (!Component) {
        console.warn(`Shopify React Mounting: component '${compName}' not resolved in module map.`);
        return;
      }

      try {
        const root = createRoot(el);
        shopifyReactRoots.push(root);
        root.render(
          <StrictMode>
            <Component />
          </StrictMode>
        );
      } catch (e) {
        console.error(`Failed to separate-mount Shopify component '${compName}':`, e);
      }
    });

    // Handle Persistent Drawer & Modal Overlays for checkout experience
    let overlaysContainer = document.getElementById('shopify-react-overlays-portal');
    if (!overlaysContainer) {
      overlaysContainer = document.createElement('div');
      overlaysContainer.id = 'shopify-react-overlays-portal';
      document.body.appendChild(overlaysContainer);
    }
    
    try {
      const root = createRoot(overlaysContainer);
      shopifyReactRoots.push(root);
      root.render(
        <StrictMode>
          <GlobalOverlays />
        </StrictMode>
      );
    } catch (e) {
      console.error("Failed to mount Global Overlays panel:", e);
    }

    return;
  }

  // 2. Default fallback: Classic single page SPA mode (AI Studio preview environment)
  const rootEl = document.getElementById('root');
  if (!rootEl) {
    console.warn("React Mount Node: '#root' target element not found in the DOM.");
    return;
  }

  if (spaReactRoot) {
    try {
      spaReactRoot.unmount();
    } catch (e) {
      // ignore
    }
    spaReactRoot = null;
  }

  try {
    const root = createRoot(rootEl);
    spaReactRoot = root;
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log("React application successfully mounted on standard single root");
  } catch (error) {
    console.error("Failed to mount React application:", error);
  }
}

// Perform initial mount
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}

// Re-compile and re-mount on Shopify Theme Customizer section load/refresh triggers
if (typeof document !== 'undefined') {
  document.addEventListener('shopify:section:load', () => {
    console.log("Shopify Customizer Event: section layout modified, rebuilding layout components...");
    mountApp();
  });
}
