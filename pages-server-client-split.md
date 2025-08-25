# Pages and Components to Consider for Server Component Conversion

Below is a list of your main page-level and data-related components. Use this as a reference for your React 19 upgrade, focusing on which files are candidates for server components (for SSR, SEO, and data fetching) and which should remain client components (for interactivity and UI state).

| File Path                                                    | Type    | Recommendation/Notes                                                  |
| ------------------------------------------------------------ | ------- | --------------------------------------------------------------------- |
| src/pages/HomePage/HomePage.tsx                              | Page    | Convert to server component if you want SSR/SEO for product/blog data |
| src/pages/HomePage/sections/Banner.tsx                       | Section | Client component (UI state, navigation)                               |
| src/pages/HomePage/sections/BestSelling.tsx                  | Section | Server component if you want SSR/SEO for best-selling products        |
| src/pages/HomePage/sections/BlogPreview.tsx                  | Section | Server component if blog data comes from API                          |
| src/pages/HomePage/sections/Product.tsx                      | Section | Server component if you want SSR/SEO for product data                 |
| src/pages/ProductDetails/ProductDetails.tsx                  | Page    | Convert to server component for product data fetching                 |
| src/pages/ProductDetails/RelatedProducts/RelatedProducts.tsx | Section | Server component if it fetches related products                       |
| src/pages/Category/CategoryPage.tsx                          | Page    | Convert to server component for category/product data fetching        |
| src/pages/Category/CategoryPageHeader.tsx                    | Section | Client component (UI only)                                            |
| src/pages/Category/ViewModeOption.tsx                        | Section | Client component (UI only)                                            |
| src/pages/Category/NoResultSection.tsx                       | Section | Client component (UI only)                                            |
| src/pages/Checkout/CheckoutPage.tsx                          | Page    | Server component for SSR, keep form logic in client component         |
| src/pages/Checkout/sections/CheckoutContent.tsx              | Section | Client component (form state, interactivity)                          |
| src/pages/Checkout/sections/BillingInfo.tsx                  | Section | Client component (form state, interactivity)                          |
| src/pages/Checkout/sections/AdditionalInfo.tsx               | Section | Client component (form state, interactivity)                          |
| src/pages/Checkout/sections/Confirmation.tsx                 | Section | Client component (form state, interactivity)                          |
| src/pages/Checkout/sections/FormErrorSummary.tsx             | Section | Client component (UI only)                                            |
| src/pages/Checkout/sections/MobileCheckoutAccordion.tsx      | Section | Client component (UI only)                                            |
| src/pages/Checkout/sections/OrderSummary.tsx                 | Section | Client component (form state, interactivity)                          |
| src/pages/Checkout/sections/PaymentMethod.tsx                | Section | Client component (form state, interactivity)                          |
| src/pages/Checkout/sections/SecurityNotice.tsx               | Section | Client component (UI only)                                            |
| src/pages/Checkout/sections/ShippingMethod.tsx               | Section | Client component (form state, interactivity)                          |
| src/pages/Checkout/sections/ThankyouModal.tsx                | Section | Client component (UI only)                                            |

> For each page, move data fetching and static rendering logic to a server component. Keep all interactivity, state, and effects in client components with 'use client' at the top.

If you add new pages or data-heavy sections, consider this split for future maintainability and performance.
