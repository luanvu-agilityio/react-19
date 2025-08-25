# React 19 Upgrade Plan for Your Project

## 1. Audit and Update React Version
- **Step:** Ensure your project uses React 19 and the latest React DOM, and update related dependencies.
- **Why:** React 19 unlocks new features and performance improvements. All new APIs require the latest version.

## 2. Refactor Event Handlers with `useEvent`
- **Where:** Components in `src/components/` (e.g., `SelectedTag.tsx`, `CartModal`, etc.) that pass callbacks to children or use event handlers.
- **Why:** `useEvent` provides stable event callbacks, preventing unnecessary re-renders and improving performance, especially in deeply nested or frequently updated components.

## 3. Use New Hooks (e.g., `useOptimistic`, `useFormStatus`)
- **Where:** Hooks and components managing async state or optimistic UI, such as cart operations, tag removal, or product updates (`src/hooks/`, `src/components/Cart/`, `src/components/SelectedTag/`).
- **Why:** `useOptimistic` enables instant UI updates while waiting for server responses, improving user experience. `useFormStatus` helps manage form state and feedback in a more declarative way.

## 4. Introduce Server Components
- **Where:** Pages/components that fetch data from the server, such as product lists and details (`src/pages/ProductDetails/ProductDetails.tsx`, `src/services/product.ts`).
- **Why:** Server components allow you to fetch data and render on the server, reducing client bundle size and improving load times. They also enable streaming UI and better SEO.

## 5. Refactor Data Mutations with Actions
- **Where:** Any place you perform data mutations (e.g., add/remove cart items, update products, submit forms).
- **Why:** Actions in React 19 unify server and client mutations, making code more maintainable and secure. They also work seamlessly with server components and optimistic UI.

## 6. Gradual Migration and Testing
- **Step:** Migrate one feature/component at a time, test thoroughly, and ensure no regressions.
- **Why:** Incremental upgrades reduce risk and make debugging easier.

---

## Summary Table

| Area                        | File/Folder Example                        | React 19 Concept      | Why Upgrade?                                 |
|-----------------------------|--------------------------------------------|-----------------------|----------------------------------------------|
| Event Handlers              | `SelectedTag.tsx`, `CartModal`            | `useEvent`            | Prevents unnecessary re-renders              |
| Async/Optimistic State      | `Cart/`, `SelectedTag/`, custom hooks      | `useOptimistic`       | Smoother, faster UI updates                  |
| Data Fetching/Rendering     | `ProductDetails.tsx`, `services/product.ts`| Server Components     | Smaller bundles, faster loads, better SEO    |
| Data Mutations              | Cart/product actions, forms                | Actions               | Unified, secure, and maintainable mutations  |

---

> If you want to start with a concrete example or need help with a specific step, let me know!


# React 19 Upgrade Opportunities: Component-by-Component Table

Below is a detailed table listing components that can be upgraded, which React 19 hook/concept to use, and the reason for each upgrade:

| Component/Area                                      | React 19 Concept(s)                | Why Upgrade?                                                                                 |
|-----------------------------------------------------|-------------------------------------|---------------------------------------------------------------------------------------------|
| `src/components/Sorting/Sorting.tsx`                | `useEvent`                          | Stable event handlers, prevents unnecessary re-renders in sorting UI                        |
| `src/components/Filter/PriceFilter/PriceFilter.tsx` | `useEvent`, `useOptimistic`         | Stable callbacks for filter changes, instant UI feedback for price filter adjustments        |
| `src/components/SelectedTag/SelectedTag.tsx`        | `useEvent`, `useOptimistic`         | Stable tag removal/addition handlers, optimistic UI for tag changes                         |
| `src/components/Cart/CartModal/CartModal.tsx`       | `useEvent`, `useOptimistic`         | Stable cart operation handlers, optimistic UI for add/remove/update cart actions             |
| `src/pages/ProductDetails/ProductDetails.tsx`       | Server Components                   | Move data fetching/rendering to server, reduce client bundle, enable streaming UI            |
| `src/services/product.ts`                           | Server Components, Actions          | Move data fetching/mutations to server, unify logic, improve security and maintainability    |
| Cart/product actions, forms (anywhere in codebase)  | `useServerAction`, `useActionState`, `useFormStatus` | Unified, secure, and maintainable mutations, better form state and optimistic UI             |

## Notes
- No current usage of `useFormStatus`, `useActionState`, or `useServerAction` was found. If you have forms or server mutations, consider introducing these hooks for better state management and user experience.
- Focus on components that handle user input, async state, or data fetching for the most meaningful upgrades.

---
