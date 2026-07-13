// @ts-check
// Deep-module boundary enforcement for a single Next.js/TS app.
//
// The seams `codebase-design` designs by hand are enforced here so they can't
// erode. Each folder under MODULES_ROOT is a DEEP MODULE: its PUBLIC SURFACE is
// its ENTRY POINTS — the files at the module root (e.g. index.ts, and any other
// root file). Implementation lives in SUBFOLDERS (`lib/`, `internal/`, `ui/`,
// `tests/`, …) and is PRIVATE. Outside code may reach a module only through its
// entry points — never past them into a subfolder. That "reach past the entry
// point into an internal" is the SHALLOW CROSS-LAYER IMPORT these rules block.
//
// The only thing you normally edit is MODULES_ROOT and the LAYERING block.

/** Where deep modules live. One immediate child dir per module (flat, no nesting). */
const MODULES_ROOT = "src/features";

// --- derived patterns (no need to edit) -------------------------------------
const R = MODULES_ROOT;
/**
 * A module's private internals: anything nested inside a module subfolder.
 * The module's root files are its entry points and are NOT matched here —
 * they stay importable from outside.
 */
const MODULE_INTERNALS = `^${R}/[^/]+/[^/]+/`;

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "entrypoint-boundary-from-outside",
      comment:
        "App/page/shared code may import a module's entry points (its root files) but nothing inside its subfolders. Reaching an internal is a shallow cross-layer import — go through the entry point.",
      severity: "error",
      from: { pathNot: `^${R}/` }, // importer is NOT inside any module
      to: { path: MODULE_INTERNALS },
    },
    {
      name: "entrypoint-boundary-across-modules",
      comment:
        "A module's own files import each other freely, but may reach OTHER modules only through their entry points — never their internals.",
      severity: "error",
      // importer is inside a module ($1), but is not a test file
      from: { path: `^${R}/([^/]+)/`, pathNot: `^${R}/[^/]+/tests/` },
      to: {
        path: MODULE_INTERNALS,
        pathNot: `^${R}/$1/`, // same module → intra-module freedom
      },
    },
    {
      name: "tests-through-entrypoints",
      comment:
        "A module's tests exercise it through its entry points like everyone else: they import any module's entry points and their own tests/ fixtures, never any module's internals — not even their own.",
      severity: "error",
      from: { path: `^${R}/([^/]+)/tests/` }, // a test file, in module $1
      to: {
        path: MODULE_INTERNALS,
        pathNot: `^${R}/$1/tests/`, // own tests/ fixtures → allowed
      },
    },
    {
      name: "no-circular",
      comment: "No dependency cycles.",
      severity: "error",
      from: {},
      to: { circular: true },
    },

    // --- Layering (ONE concrete rule active — edit for your layers) -----------
    // Interface-hiding (above) controls HOW you cross a seam (via entry points).
    // Layering controls WHICH layers may depend on which. Lower layers must not
    // reach up. Below: shared `src/lib` may not import from a feature. Add your
    // own (e.g. server-only modules unreachable from client components).
    {
      name: "shared-lib-may-not-import-features",
      comment:
        "The shared/lower layer (src/lib) is a leaf: it must not depend upward on any feature. If it needs a feature's behavior, the dependency points the wrong way.",
      severity: "error",
      from: { path: `^src/lib/` },
      to: { path: `^${R}/` },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      mainFields: ["module", "main", "types", "typings"],
    },
  },
};
