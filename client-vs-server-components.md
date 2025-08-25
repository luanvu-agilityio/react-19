# Client vs Server Components in Your Project

This document provides guidance on which components should be client components and which should be server components, based on their responsibilities and React 19 best practices.

---

## Client Components

Client components handle user interactions, local state, and browser-only APIs. They should be used for:

- UI elements with event handlers (click, input, drag, etc.)
- Components using hooks like useState, useEffect, useEvent, useOptimistic
- Components that depend on browser APIs (window, document, localStorage, etc.)

**Recommended Client Components:**
| Component Path | Reason |
|--------------------------------------------------------|---------------------------------------------------------------|
| src/components/Sorting/Sorting.tsx | Handles sorting UI and user events |
| src/components/Filter/PriceFilter/PriceFilter.tsx | Manages filter state, user input, and slider interactions |
| src/components/SelectedTag/SelectedTag.tsx | Handles tag selection/removal and user events |
| src/components/Cart/CartModal/CartModal.tsx | Manages cart UI, modal state, and user actions |
| src/components/ProductCard/ProductCard.tsx | Handles product display, add-to-cart, and user interactions |
| Any component with local state or event handlers | Needs to run in the browser |

---

## Server Components

Server components fetch data, perform server-side logic, and render static or streamed content. They should be used for:

- Data fetching from APIs or databases
- Rendering content that does not require interactivity
- Reducing client bundle size by offloading logic to the server

**Recommended Server Components:**
| Component Path | Reason |
|--------------------------------------------------------|---------------------------------------------------------------|
| src/pages/ProductDetails/ProductDetails.tsx | Fetches product data, can render static/streamed details |
| src/services/product.ts | Handles data fetching and server-side logic |
| src/pages/ProductList/ProductList.tsx (if exists) | Fetches and renders product lists from the server |
| Any page-level component that only displays data | Can be rendered on the server for performance and SEO |

---

## Notes

- Components that need both server and client logic can be split: use a server component for data fetching and a client component for interactivity.
- Use server components to minimize client bundle size and improve performance, especially for data-heavy or static content.
- Use client components for anything interactive or dependent on browser APIs.

If you need help refactoring a specific component to a client or server component, let me know!

# Component Classification Table

Below is a table listing all main components in `src/components/`, classifying each as a client or server component:

| Component Path                                | Type   | Reason/Notes                                   |
| --------------------------------------------- | ------ | ---------------------------------------------- |
| Sorting/Sorting.tsx                           | Client | Handles sorting UI and user events             |
| SelectedTag/SelectedTag.tsx                   | Client | Handles tag selection/removal and user events  |
| common/Badge/index.tsx                        | Client | UI badge, may have interactivity               |
| common/Button/Button.tsx                      | Client | Button with event handlers                     |
| common/Toast/Toast.tsx                        | Client | Toast notifications, UI state                  |
| common/Toast/ToastRoot.tsx                    | Client | Toast root, manages notifications              |
| common/TextField/index.tsx                    | Client | Text input, user interaction                   |
| common/Select/index.tsx                       | Client | Select input, user interaction                 |
| common/Tag/Tag.tsx                            | Client | Tag UI, may have click handlers                |
| common/FormError/FormError.tsx                | Client | Displays form errors, UI state                 |
| common/ImageIcon/ImageIcon.tsx                | Client | Renders images/icons, may have UI logic        |
| common/LoadingSpinner/LoadingSpinner.tsx      | Client | Loading spinner, UI state                      |
| common/Link/Link.tsx                          | Client | Navigation, may handle click events            |
| Filter/FilteringComponents.tsx                | Client | Filtering UI, user interaction                 |
| Filter/CategoryFilter/CategoryFilter.tsx      | Client | Category filter, user interaction              |
| Filter/PriceFilter/PriceFilter.tsx            | Client | Price filter, user interaction                 |
| Pagination/ProductCount/ProductCount.tsx      | Client | Pagination UI, user interaction                |
| Pagination/ProductPerPage/ProductsPerPage.tsx | Client | Pagination UI, user interaction                |
| ProductCard/ProductCard.tsx                   | Client | Product display, add-to-cart, user interaction |
| ProductCard/ProductListing.tsx                | Client | Product list, user interaction                 |
| Searchbar/Searchbar.tsx                       | Client | Search input, user interaction                 |
| Cart/CartModal/CartModal.tsx                  | Client | Cart modal, add/remove items, user interaction |
| Cart/CartItem/CartItem.tsx                    | Client | Cart item, user interaction                    |

> Note: Most components are client components due to interactivity. Page-level or data-fetching components (usually in `src/pages/`) are better suited as server components.

# React 19 Upgrade Checklist (Official Concepts Only)

Below is a step-by-step checklist for updating your project with officially released React 19 concepts:

1. **Upgrade React and React DOM to v19**

   - Ensure your dependencies are set to `react@19` and `react-dom@19`.
   - Update related packages (e.g., types, testing libraries) as needed.

2. **Adopt Server Components**

   - Refactor page-level and data-fetching components (e.g., in `src/pages/`, `src/services/`) to server components where possible.
   - Move data fetching and static rendering logic out of client components.

3. **Use Actions for Mutations**

   - Refactor data mutation logic (e.g., cart operations, product updates, form submissions) to use React 19 Actions.
   - Place server mutations in server components or action files.

4. **Implement useOptimistic for Optimistic UI**

   - Use `useOptimistic` in components that update UI in response to async actions (e.g., cart, tag, or product updates).
   - Provide instant feedback to users while awaiting server responses.

5. **Adopt useFormStatus and useActionState for Forms**

   - Refactor forms to use `useFormStatus` for tracking form submission state and errors.
   - Use `useActionState` to manage form state and server responses.

6. **Test and Validate**
   - Test each migration step thoroughly.
   - Ensure no regressions in UI or data flow.

---

> This checklist excludes useEvent and focuses only on officially released React 19 features. For each step, prioritize components and features that handle data fetching, mutations, or async UI updates for the most meaningful improvements.

# React 19 Upgrade Opportunities: Component & Hook Table

Below is a table listing each component/hook, the React 19 concept to apply, and the reason for the upgrade:

| Component/Hook Path                               | React 19 Concept(s)                            | Why Upgrade?                                                                              |
| ------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| src/components/Sorting/Sorting.tsx                | useEvent                                       | Stable event handlers, prevents unnecessary re-renders in sorting UI                      |
| src/components/Filter/PriceFilter/PriceFilter.tsx | useEvent, useOptimistic                        | Stable callbacks for filter changes, instant UI feedback for price filter adjustments     |
| src/components/SelectedTag/SelectedTag.tsx        | useEvent, useOptimistic                        | Stable tag removal/addition handlers, optimistic UI for tag changes                       |
| src/components/Cart/CartModal/CartModal.tsx       | useEvent, useOptimistic                        | Stable cart operation handlers, optimistic UI for add/remove/update cart actions          |
| src/components/ProductCard/ProductCard.tsx        | useEvent                                       | Handles product display, add-to-cart, and user interactions                               |
| src/hooks/useCartMutation.ts                      | useOptimistic, useEvent                        | Optimistic cart updates, stable mutation callbacks                                        |
| src/hooks/useProductFetch.ts                      | useOptimistic                                  | Optimistic product data fetching and UI updates                                           |
| src/hooks/useFilterOptions.ts                     | useEvent                                       | Stable filter option change handlers                                                      |
| src/hooks/useProductNavigation.ts                 | useEvent                                       | Stable navigation event handlers                                                          |
| src/services/product.ts                           | Server Components, Actions                     | Move data fetching/mutations to server, unify logic, improve security and maintainability |
| src/pages/ProductDetails/ProductDetails.tsx       | Server Components                              | Move data fetching/rendering to server, reduce client bundle, enable streaming UI         |
| Any form or mutation logic                        | useFormStatus, useActionState, useServerAction | Unified, secure, and maintainable mutations, better form state and optimistic UI          |

## Notes

- No current usage of useEvent, useOptimistic, useFormStatus, useActionState, or useServerAction was found. These are all opportunities for meaningful upgrades.
- Focus on components that handle user input, async state, or data fetching for the most impactful React 19 improvements.
