"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AgeId, CategoryId } from "@/types/product";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

export type CartItem = {
  productId: string;
  variant: string;
  quantity: number;
};

export interface CatalogFilter {
  query: string;
  category: CategoryId | "all";
  age: AgeId | "all";
  dealsOnly: boolean;
}
export const emptyFilter: CatalogFilter = {
  query: "",
  category: "all",
  age: "all",
  dealsOnly: false,
};
type Notice = { title: string; description: string };
const StorefrontContext = createContext<{
  filter: CatalogFilter;
  filterProducts: (filter: Partial<CatalogFilter>) => void;
  showNotice: (notice: Notice) => void;
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  updateCartQuantity: (productId: string, variant: string, quantity: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  clearCart: () => void;
} | null>(null);

const cartStorageKey = "tiem-be-xiu-cart";

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const filter = emptyFilter;
  const router = useRouter();
  const [notice, setNotice] = useState<Notice>({ title: "", description: "" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(cartStorageKey) ?? "[]");
      if (Array.isArray(saved)) {
        const validCart = saved.filter(
            (item): item is CartItem =>
              typeof item?.productId === "string" &&
              typeof item?.variant === "string" &&
              Number.isInteger(item?.quantity) &&
              item.quantity > 0 &&
              item.quantity <= 10,
          );
        queueMicrotask(() => setCart(validCart));
      }
    } catch {
      localStorage.removeItem(cartStorageKey);
    }
  }, []);

  function commitCart(change: (current: CartItem[]) => CartItem[]) {
    setCart((current) => {
      const next = change(current);
      localStorage.setItem(cartStorageKey, JSON.stringify(next));
      return next;
    });
  }

  function addToCart(item: CartItem) {
    commitCart((current) => {
      const found = current.find(
        (entry) => entry.productId === item.productId && entry.variant === item.variant,
      );
      if (!found) return [...current, { ...item, quantity: Math.min(10, item.quantity) }];
      return current.map((entry) =>
        entry === found
          ? { ...entry, quantity: Math.min(10, entry.quantity + item.quantity) }
          : entry,
      );
    });
  }

  function updateCartQuantity(productId: string, variant: string, quantity: number) {
    commitCart((current) =>
      current.map((item) =>
        item.productId === productId && item.variant === variant
          ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) }
          : item,
      ),
    );
  }

  function removeFromCart(productId: string, variant: string) {
    commitCart((current) =>
      current.filter(
        (item) => item.productId !== productId || item.variant !== variant,
      ),
    );
  }

  function clearCart() {
    commitCart(() => []);
  }

  function filterProducts(next: Partial<CatalogFilter>) {
    const params = new URLSearchParams();
    if (next.query) params.set("q", next.query);
    if (next.age && next.age !== "all") params.set("age", next.age);
    if (next.dealsOnly) params.set("deals", "1");
    const path =
      next.category && next.category !== "all"
        ? "/danh-muc/" + next.category
        : "/san-pham";
    router.push(path + (params.size ? "?" + params.toString() : ""));
  }

  function showNotice(next: Notice) {
    setNotice(next);
    dialog.current?.showModal();
  }

  return (
    <StorefrontContext.Provider
      value={{
        filter,
        filterProducts,
        showNotice,
        cart,
        cartCount: cart.reduce((total, item) => total + item.quantity, 0),
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
      <dialog
        ref={dialog}
        className="notice-dialog"
        aria-labelledby="notice-title"
        aria-describedby="notice-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="notice-content">
          <button
            className="icon-button dialog-close"
            aria-label="Đóng thông báo"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
          <span className="notice-icon">
            <Icon name="heart" size={32} />
          </span>
          <p className="eyebrow">MỘT CHÚT TỪ TIỆM</p>
          <h2 id="notice-title">{notice.title}</h2>
          <p id="notice-description">{notice.description}</p>
          <button
            className="button button-primary"
            onClick={() => dialog.current?.close()}
          >
            Mình hiểu rồi <Icon name="check" size={18} />
          </button>
        </div>
      </dialog>
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context)
    throw new Error("Storefront components require StorefrontProvider");
  return context;
}
