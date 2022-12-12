/* 
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... } */

export function Layout({ children }) {
  return <div className="flex justify-center mx-3 sm:gap-3 md:gap-7 lg:gap-9">{children}</div>;
}

export function Left({ children }) {
  return <div className="w-full sm:w-11/12 md:w-8/12 lg:w-13/24 xl:w-6/12">{children}</div>;
}

export function Right({ children }) {
  return <div className="hidden md:flex md:w-3/12 opacity-50 bg-gray-100">{children}</div>;
}
