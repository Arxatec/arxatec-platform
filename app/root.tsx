import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishContent from "./assets/lang/en.json";
import spanishContent from "./assets/lang/es.json";
import quechuaContent from "./assets/lang/qu.json";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "~/styles/index.css";
import "react-circular-progressbar/dist/styles.css";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

i18n.use(initReactI18next).init({
  resources: {
    en: englishContent,
    es: spanishContent,
    qu: quechuaContent,
  },
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId="16579426384-hcu4blgpob121572ud505r6bsl8csi0l.apps.googleusercontent.com">
      <Outlet />
    </GoogleOAuthProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
