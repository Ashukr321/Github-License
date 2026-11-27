"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronRight,
  FileText,
  Moon,
  PanelLeft,
  Search,
  Sun,
  X,
} from "lucide-react";
import type { NavData } from "@/lib/content";

const noop = () => () => {};
const useIsMac = () =>
  useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => false,
  );

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

// Every typed word must appear somewhere in the item's keywords.
const filter = (_value: string, search: string, keywords?: string[]) => {
  const hay = (keywords ?? []).join(" ").toLowerCase();
  return search
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w))
    ? 1
    : 0;
};

export default function DocsShell({
  nav,
  siteName,
  logo,
  children,
}: {
  nav: NavData;
  siteName: string;
  logo: React.ReactNode;
  children: React.ReactNode;
}) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const mod = useIsMac() ? "⌘" : "Ctrl";

  const toggleSidebar = useCallback(() => {
    if (isDesktop()) setDesktopOpen((o) => !o);
    else setMobileOpen((o) => !o);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        !!t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.code === "KeyK") {
        e.preventDefault();
        setSearchOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && !e.altKey && e.code === "KeyB") {
        e.preventDefault();
        toggleSidebar();
      } else if (e.key === "Escape") {
        setMobileOpen(false);
      } else if (
        e.code === "Slash" &&
        !typing &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        if (e.shiftKey) toggleSidebar();
        else setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-slate-200 bg-white/85 px-3 backdrop-blur sm:px-4 dark:border-slate-800 dark:bg-[#0b0d14]/85">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          title={`Toggle sidebar (${mod} B)`}
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <PanelLeft className="size-5" />
        </button>
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-semibold tracking-tight"
        >
          {logo}
          <span className="hidden truncate sm:inline">{siteName}</span>
        </Link>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="ml-auto flex h-9 w-full max-w-xs min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 hover:border-slate-300 sm:max-w-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700"
        >
          <Search className="size-4 shrink-0" />
          <span className="truncate">Search docs…</span>
          <kbd className="ml-auto hidden shrink-0 rounded border border-slate-200 bg-white px-1.5 font-mono text-[11px] sm:inline dark:border-slate-700 dark:bg-slate-800">
            {mod} K
          </kbd>
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <Sun className="hidden size-5 dark:block" />
          <Moon className="size-5 dark:hidden" />
        </button>
      </header>

      <div className="flex">
        {/* Desktop sidebar: width animates, inner wrapper keeps a fixed width so links don't reflow. */}
        <aside
          className={`sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 overflow-hidden border-slate-200 transition-[width,visibility] duration-300 ease-in-out lg:block dark:border-slate-800 ${desktopOpen ? "visible w-64 border-r" : "invisible w-0"}`}
          inert={!desktopOpen}
          data-sidebar="desktop"
        >
          <div className="h-full w-64 overflow-y-auto px-3 py-4">
            <Nav nav={nav} />
          </div>
        </aside>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
          inert={!mobileOpen}
          data-sidebar="mobile"
        >
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setMobileOpen(false)}
            data-backdrop
          />
          <div
            className={`absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-[#0b0d14] ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
              <span className="font-semibold">{siteName}</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <Nav nav={nav} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <Command.Dialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        label="Search docs"
        filter={filter}
        overlayClassName="fixed inset-0 z-50 bg-black/60"
        contentClassName="fixed left-1/2 top-[12vh] z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <Dialog.Title className="sr-only">Search docs</Dialog.Title>
        <Dialog.Description className="sr-only">
          Type to filter topics, then press Enter to open one.
        </Dialog.Description>
        <div className="flex items-center gap-2 border-b border-slate-200 px-3 dark:border-slate-800">
          <Search className="size-4 text-slate-400" />
          <Command.Input
            placeholder="Search topics…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-slate-500">
            No topics found.
          </Command.Empty>
          {nav.map((cat) => (
            <Command.Group key={cat.slug} heading={cat.title}>
              {cat.docs.map((d) => (
                <Command.Item
                  key={d.slug}
                  value={d.slug}
                  keywords={[d.title, d.group ?? "", cat.title]}
                  onSelect={() => {
                    setSearchOpen(false);
                    setMobileOpen(false);
                    router.push(`/docs/${d.slug}`);
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm data-[selected=true]:bg-violet-500/10 data-[selected=true]:text-violet-700 dark:data-[selected=true]:text-violet-300"
                >
                  <FileText className="size-4 shrink-0 opacity-60" />
                  <span className="truncate">{d.title}</span>
                  {d.group && (
                    <span className="ml-auto shrink-0 text-xs text-slate-400">
                      {d.group}
                    </span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </div>
  );
}

function Nav({ nav, onNavigate }: { nav: NavData; onNavigate?: () => void }) {
  return (
    <nav aria-label="Topics" className="space-y-1 text-sm">
      {nav.map((cat) => (
        <NavCategory key={cat.slug} cat={cat} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}

function NavCategory({
  cat,
  onNavigate,
}: {
  cat: NavData[number];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = cat.docs.some((d) => pathname === `/docs/${d.slug}`);
  const [toggled, setToggled] = useState<boolean | null>(null);
  const open = toggled ?? isActive;

  return (
    <div>
      <button
        type="button"
        onClick={() => setToggled(!open)}
        aria-expanded={open}
        className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left font-medium hover:bg-slate-100 dark:hover:bg-slate-800/60 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
      >
        <ChevronRight
          className={`size-4 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        />
        <span className="truncate">{cat.title}</span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        inert={!open}
      >
        <ul className="ml-3.5 overflow-hidden border-l border-slate-200 pl-2 dark:border-slate-800">
          {cat.docs.map((d, i) => (
            <li key={d.slug}>
              {d.group && d.group !== cat.docs[i - 1]?.group && (
                <p className="mt-2 mb-0.5 px-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  {d.group}
                </p>
              )}
              <Link
                href={`/docs/${d.slug}`}
                onClick={onNavigate}
                aria-current={pathname === `/docs/${d.slug}` ? "page" : undefined}
                className="block truncate rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 aria-[current=page]:bg-violet-500/10 aria-[current=page]:font-medium aria-[current=page]:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white dark:aria-[current=page]:text-violet-300"
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
