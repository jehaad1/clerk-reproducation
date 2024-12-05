import dictionary from "@/dictionary";

export let appDictionary: { [key: string]: string };

if (typeof window !== "undefined") {
  if (!localStorage.theme) {
    localStorage.theme = /dark/.test(
      window.matchMedia("(prefers-color-scheme: dark)").media
    )
      ? "dark"
      : "white";
  }

  if (localStorage.theme === "dark") {
    document.querySelector("html")?.classList.add("dark");
  }

  appDictionary = dictionary[localStorage.lang || "en"] as Record<
    string,
    string
  >;
}

export function updateTheme(): void {
  if (localStorage.theme === "dark")
    document.querySelector("html")?.classList.add("dark");
  else document.querySelector("html")?.classList.remove("dark");
}
