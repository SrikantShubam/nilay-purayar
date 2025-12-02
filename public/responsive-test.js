/**
 * Responsive Layout Testing Script
 * This script tests your website across multiple viewports and identifies layout issues
 */

const viewports = [
  { name: 'iPhone SE', width: 320, height: 568 },
  { name: 'iPhone 6/7/8', width: 375, height: 667 },
  { name: 'iPhone 12 Pro', width: 390, height: 844 },
  { name: 'Large Mobile', width: 425, height: 844 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Tablet Landscape', width: 1024, height: 768 },
  { name: 'Desktop Small', width: 1280, height: 720 },
  { name: 'Desktop Medium', width: 1440, height: 900 },
  { name: 'Desktop Large', width: 1920, height: 1080 },
];

function analyzeLayout() {
  const results = [];
  const bodyWidth = document.body.scrollWidth;
  const viewportWidth = window.innerWidth;
  const hasHorizontalScroll = bodyWidth > viewportWidth;

  // Find elements that overflow
  const allElements = document.querySelectorAll('*');
  const overflowingElements = [];

  allElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.right > viewportWidth || rect.left < 0) {
      const styles = window.getComputedStyle(el);
      overflowingElements.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || 'none',
        class: el.className || 'none',
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        computedWidth: styles.width,
        computedMargin: `${styles.marginLeft} ${styles.marginRight}`,
        computedPadding: `${styles.paddingLeft} ${styles.paddingRight}`,
      });
    }
  });

  return {
    viewport: {
      width: viewportWidth,
      height: window.innerHeight,
    },
    body: {
      scrollWidth: bodyWidth,
      clientWidth: document.body.clientWidth,
      offsetWidth: document.body.offsetWidth,
    },
    hasHorizontalScroll,
    overflowAmount: Math.max(0, bodyWidth - viewportWidth),
    overflowingElements: overflowingElements.slice(0, 10), // Top 10
  };
}

function generateReport() {
  const currentViewport = `${window.innerWidth}x${window.innerHeight}`;
  const analysis = analyzeLayout();

  console.group(`📊 Layout Analysis - ${currentViewport}`);
  console.log('Viewport Width:', analysis.viewport.width);
  console.log('Body Scroll Width:', analysis.body.scrollWidth);
  console.log('Has Horizontal Scroll:', analysis.hasHorizontalScroll ? '❌ YES' : '✅ NO');
  
  if (analysis.hasHorizontalScroll) {
    console.warn(`⚠️ Overflow Amount: ${analysis.overflowAmount}px`);
    console.group('Overflowing Elements:');
    analysis.overflowingElements.forEach((el, i) => {
      console.log(`${i + 1}. <${el.tag}> ${el.id !== 'none' ? `#${el.id}` : ''} .${el.class}`);
      console.log(`   Position: left=${el.left}px, right=${el.right}px, width=${el.width}px`);
      console.log(`   Computed: width=${el.computedWidth}, margin=${el.computedMargin}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
  
  return analysis;
}

// Auto-run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateReport);
} else {
  generateReport();
}

// Make function available globally for manual testing
window.testResponsiveLayout = generateReport;
window.viewports = viewports;

console.log(`
🔍 Responsive Testing Tools Loaded!

To manually test a viewport:
  window.testResponsiveLayout()

To see recommended viewports:
  console.table(window.viewports)

Tip: Resize your browser and run window.testResponsiveLayout() to see what's overflowing
`);

export { generateReport, analyzeLayout, viewports };
