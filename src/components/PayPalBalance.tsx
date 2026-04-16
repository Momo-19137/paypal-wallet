import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

import { useState, useRef, useCallback, useEffect } from "react";

const FIRST_NAMES = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
  "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Christopher", "Karen",
];
const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin",
];

function randomName() {
  return `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`;
}
function randomAmount() {
  return (Math.random() * 400).toFixed(2).replace(".", ",");
}

function BackArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function BankIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2" style={{ borderColor: "var(--paypal-icon-blue)" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--paypal-icon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M3 10h18" /><path d="M5 6l7-3 7 3" />
        <path d="M4 10v11" /><path d="M20 10v11" /><path d="M8 14v4" /><path d="M12 14v4" /><path d="M16 14v4" />
      </svg>
    </div>
  );
}

function QRIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2" style={{ borderColor: "var(--paypal-icon-blue)" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--paypal-icon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="3" height="3" />
        <path d="M21 14h-3v3" /><path d="M21 21h-3v-3" />
      </svg>
    </div>
  );
}

function PayPalLogo() {
  return (
    <svg width="28" height="32" viewBox="0 0 24 28" fill="none">
      <path d="M20.1 5.4C19.2 3.8 17.2 3 14.5 3H7.8C7.2 3 6.7 3.4 6.6 4L3.8 22.3C3.7 22.8 4.1 23.2 4.5 23.2H8.7L9.7 16.8V17.1C9.8 16.5 10.3 16.1 10.9 16.1H13C17.2 16.1 20.4 14.3 21.3 9.5V9.2C21.2 9.2 21.2 9.2 21.3 9.2C21.5 7.7 21.3 6.7 20.1 5.4Z" fill="#27346A" />
      <path d="M21.3 9.2C20.4 14.3 17.2 16.1 13 16.1H10.9C10.3 16.1 9.8 16.5 9.7 17.1L8.4 25.5C8.3 25.9 8.6 26.3 9.1 26.3H12.6C13.1 26.3 13.6 25.9 13.7 25.4L13.7 25.2L14.4 20.6L14.5 20.3C14.5 19.8 15 19.4 15.6 19.4H16.3C20 19.4 22.8 17.8 23.6 13.5C23.9 11.7 23.7 10.2 22.8 9.1C22.5 8.8 22 8.5 21.3 9.2Z" fill="#2790C3" />
    </svg>
  );
}

/* ─── Notification overlay banner ─── */
function NotificationBanner({ name, amount, onClose }: { name: string; amount: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed left-2 right-2 top-2 z-[9999] flex items-start gap-3 rounded-2xl bg-card p-3 pr-4"
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.18)", animation: "slideDown .35s ease-out" }}
      onClick={onClose}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "#002C8A" }}>
        <svg width="20" height="24" viewBox="0 0 24 28" fill="none">
          <path d="M20.1 5.4C19.2 3.8 17.2 3 14.5 3H7.8C7.2 3 6.7 3.4 6.6 4L3.8 22.3C3.7 22.8 4.1 23.2 4.5 23.2H8.7L9.7 16.8V17.1C9.8 16.5 10.3 16.1 10.9 16.1H13C17.2 16.1 20.4 14.3 21.3 9.5V9.2C21.2 9.2 21.2 9.2 21.3 9.2C21.5 7.7 21.3 6.7 20.1 5.4Z" fill="#fff" />
          <path d="M21.3 9.2C20.4 14.3 17.2 16.1 13 16.1H10.9C10.3 16.1 9.8 16.5 9.7 17.1L8.4 25.5C8.3 25.9 8.6 26.3 9.1 26.3H12.6C13.1 26.3 13.6 25.9 13.7 25.4L13.7 25.2L14.4 20.6L14.5 20.3C14.5 19.8 15 19.4 15.6 19.4H16.3C20 19.4 22.8 17.8 23.6 13.5C23.9 11.7 23.7 10.2 22.8 9.1C22.5 8.8 22 8.5 21.3 9.2Z" fill="#89CFF0" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-foreground">PayPal</p>
        <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
          You received €{amount} from {name}
        </p>
      </div>
      <span className="mt-0.5 shrink-0 text-[11px] text-muted-foreground">now</span>
    </div>
  );
}

/* ─── Notification Control Panel ─── */
function NotificationPanel({ onBack }: { onBack: () => void }) {
  const [interval, setInterval_] = useState("5");
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [banners, setBanners] = useState<{ id: number; name: string; amount: string }[]>([]);
  const idRef = useRef(0);

  const fire = useCallback(() => {
    const name = randomName();
    const amount = randomAmount();
    const body = `You received €${amount} from ${name}`;

    // Try native notification
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("PayPal", { body, icon: "/paypal.png" });
    } else {
      // Fallback: HTML overlay
      const id = ++idRef.current;
      setBanners((b) => [...b, { id, name, amount }]);
    }
  }, []);

  const start = useCallback(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
    const ms = Math.max(1, parseFloat(interval.replace(",", ".")) || 5) * 1000;
    timerRef.current = setInterval(fire, ms);
    setRunning(true);
    fire(); // fire first one immediately
  }, [interval, fire]);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const removeBanner = useCallback((id: number) => {
    setBanners((b) => b.filter((x) => x.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background font-[Inter,system-ui,sans-serif]">
      {/* banners */}
      {banners.map((b) => (
        <NotificationBanner key={b.id} name={b.name} amount={b.amount} onClose={() => removeBanner(b.id)} />
      ))}

      {/* Nav */}
      <div className="sticky top-0 z-10 flex items-center bg-background px-4 pb-3 pt-3" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
        <button className="mr-3 text-foreground" onClick={onBack}><BackArrow /></button>
        <h1 className="flex-1 text-center text-[17px] font-semibold text-foreground" style={{ marginRight: "24px" }}>Notification Panel</h1>
      </div>

      <div className="px-5 pt-8">
        <div className="rounded-2xl bg-card p-6" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.08)" }}>
          <label className="mb-2 block text-[13px] font-medium text-muted-foreground">Interval (seconds)</label>
          <input
            type="text"
            inputMode="decimal"
            value={interval}
            onChange={(e) => setInterval_(e.target.value.replace(/[^0-9.,]/g, ""))}
            className="mb-5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[16px] font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex gap-3">
            <button
              onClick={start}
              disabled={running}
              className="flex-1 rounded-full py-3.5 text-[15px] font-bold text-white disabled:opacity-40"
              style={{ background: running ? "#a3a3a3" : "#22c55e" }}
            >
              Start Notifications
            </button>
            <button
              onClick={stop}
              disabled={!running}
              className="flex-1 rounded-full py-3.5 text-[15px] font-bold text-white disabled:opacity-40"
              style={{ background: !running ? "#a3a3a3" : "#ef4444" }}
            >
              Stop Notifications
            </button>
          </div>
        </div>

        <p className="mt-5 text-center text-[12px] text-muted-foreground">
          {running ? "🔔 Notifications are active" : "Notifications paused"}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Wallet Screen ─── */
export default function PayPalBalance() {
  const [screen, setScreen] = useState<"wallet" | "notifications">("wallet");
  const balanceRef = useRef<HTMLSpanElement>(null);

  const handleBalanceInput = useCallback((e: React.FormEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    const sel = window.getSelection();
    // Save cursor position
    let cursorOffset = 0;
    if (sel && sel.rangeCount > 0) {
      cursorOffset = sel.getRangeAt(0).startOffset;
    }

    let text = el.textContent || "";
    // Strip anything not digit or comma
    text = text.replace(/[^0-9,]/g, "");
    // Allow only one comma
    const parts = text.split(",");
    if (parts.length > 2) {
      text = parts[0] + "," + parts.slice(1).join("");
    }

    if (el.textContent !== text) {
      el.textContent = text;
      // Restore cursor
      try {
        const range = document.createRange();
        const node = el.firstChild || el;
        range.setStart(node, Math.min(cursorOffset, text.length));
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      } catch {
        // noop
      }
    }
  }, []);

  const handleBalanceKeyDown = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End", "Tab"];
    if (allowed.includes(e.key)) return;
    // Allow digits
    if (/^[0-9]$/.test(e.key)) return;
    // Allow comma (only one)
    if (e.key === ",") {
      const text = e.currentTarget.textContent || "";
      if (text.includes(",")) e.preventDefault();
      return;
    }
    e.preventDefault();
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain").replace(/[^0-9,]/g, "");
    document.execCommand("insertText", false, text);
  }, []);

  if (screen === "notifications") {
    return <NotificationPanel onBack={() => setScreen("wallet")} />;
  }

  return (
    <div className="min-h-screen bg-background font-[Inter,system-ui,sans-serif]">
      {/* Nav bar */}
      <div className="sticky top-0 z-10 flex items-center bg-background px-4 pb-3 pt-3" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
        <button className="mr-3 text-foreground" onClick={() => setScreen("notifications")}>
          <BackArrow />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold text-foreground" style={{ marginRight: "24px" }}>
          PayPal balance
        </h1>
      </div>

      <div className="px-4 pt-5">
        {/* Balance card */}
        <div className="rounded-2xl bg-card p-5 pb-10" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.08)" }}>
          <div className="mb-6 flex items-center gap-2.5">
            <PayPalLogo />
            <span className="text-[15px] font-medium text-foreground">PayPal balance</span>
          </div>
          <p className="text-[34px] tracking-tight text-foreground" style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
            <span
              ref={balanceRef}
              contentEditable
              suppressContentEditableWarning
              inputMode="decimal"
              onInput={handleBalanceInput}
              onKeyDown={handleBalanceKeyDown}
              onPaste={handlePaste}
              className="outline-none"
              style={{ minWidth: "1ch", display: "inline-block" }}
            >
              0,00
            </span>
            {" €"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-7 flex gap-0 px-4">
        <button className="flex-1 rounded-full bg-foreground py-3 text-center text-[15px] font-semibold text-card">
          Activity
        </button>
        <button className="flex-1 rounded-full py-3 text-center text-[15px] font-medium text-muted-foreground">
          Currencies
        </button>
      </div>

      {/* Transactions */}
      <div className="mt-4 px-4">
        <div className="rounded-2xl bg-card p-4 pb-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.06)" }}>
          <div className="flex items-start gap-3">
            <BankIcon />
            <div className="flex-1">
              <p className="text-[15px] font-bold text-foreground">KBC Bank NV</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">27 Mar 2026</p>
              <div className="mt-2.5 flex items-center justify-between">
                <p className="text-[13px] text-muted-foreground">Instant transfer to bank - Completed</p>
                <p className="whitespace-nowrap text-[15px] font-bold text-foreground">-18.70 €</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-card p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.06)" }}>
          <div className="flex items-start gap-3">
            <QRIcon />
            <div className="flex-1">
              <p className="text-[15px] font-bold text-foreground">Alexander Kokonis</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">27 Mar 2026</p>
              <div className="mt-2.5 flex items-center justify-between">
                <p className="text-[13px] text-muted-foreground">Money received</p>
                <p className="whitespace-nowrap text-[15px] font-bold" style={{ color: "var(--paypal-green)" }}>+18.70 €</p>
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">"For 40 pack label please send labels to alexkonis7…</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show all */}
      <div className="mt-5 pb-10 text-center">
        <button className="text-[15px] font-semibold" style={{ color: "var(--paypal-blue)" }}>
          Show all
        </button>
      </div>
    </div>
  );
}
