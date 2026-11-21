// The sidebar's theme control: cycles System → Light → Dark; the choice is kept per browser, or by the host (theme.ts).
import { type ComponentType, useSyncExternalStore } from "react";
import { useWebText } from "../runtime/web.tsx";
import { MoonIcon, SunIcon, SystemThemeIcon } from "./icons.tsx";
import { getTheme, setTheme, subscribeTheme, type ThemePreference } from "./theme.ts";

/** Each theme preference's label and icon, and the one the sidebar's button switches to next. */
export const THEME_CHOICES: Readonly<
	Record<ThemePreference, { readonly label: string; readonly icon: ComponentType; readonly next: ThemePreference }>
> = {
	system: { label: "System", icon: SystemThemeIcon, next: "light" },
	light: { label: "Light", icon: SunIcon, next: "dark" },
	dark: { label: "Dark", icon: MoonIcon, next: "system" },
};

/** Cycles System → Light → Dark; the choice is kept per browser, or by the Radius shell or p2-mac hosting the page. */
export function ThemeButton() {
	const text = useWebText();
	const theme = useThemePreference();
	const { label, icon: Icon, next } = THEME_CHOICES[theme];
	return (
		<button
			type="button"
			className="icon-button theme-toggle"
			onClick={() => setTheme(next)}
			aria-label={`${text("Theme")}: ${text(label)}. ${text("Switch to")} ${text(THEME_CHOICES[next].label)}`}
			title={`${text("Theme")}: ${text(label)}`}
		>
			<Icon />
		</button>
	);
}

/** The theme preference (this browser's or its host's), re-rendering on change. */
export function useThemePreference(): ThemePreference {
	return useSyncExternalStore(subscribeTheme, getTheme, getTheme);
}
