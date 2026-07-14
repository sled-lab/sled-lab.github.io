// PurgeCSS 7 loads CommonJS configuration through import(), so named exports
// keep these options visible to the CLI (see FullHuman/purgecss#1327).
exports.skippedContentGlobs = ["_site/assets/**/*.html"];
exports.safelist = [
  // vanilla-back-to-top injects this id at runtime.
  "back-to-top",
  "collapse",
  "collapsing",
  "show",
  "dropdown-menu",
  "dropdown-item",
  "table",
  "table-dark",
  "table-hover",
  "table-responsive",
  "af-tooltip",
  "af-popover",
  "font-weight-bold",
  "font-weight-medium",
  "font-weight-lighter",
  // medium-zoom injects these at runtime, so they never appear in the static
  // HTML PurgeCSS scans; without them the zoom overlay's z-index rule is purged
  // and page chrome (scroll-progress bar, ToC) bleeds through a zoomed image.
  "medium-zoom-overlay",
  "medium-zoom-image--opened",
];
