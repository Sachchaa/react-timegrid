import { Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { DocsLayout } from "./components/DocsLayout";
import { ScrollToTop } from "./components/ScrollToTop";

import { Home } from "./pages/Home";
import { Playground } from "./pages/Playground";
import { NotFound } from "./pages/NotFound";

import { Introduction } from "./pages/docs/Introduction";
import { Installation } from "./pages/docs/Installation";
import { QuickStart } from "./pages/docs/QuickStart";
import { Views } from "./pages/docs/Views";
import { Events } from "./pages/docs/Events";
import { Controlled } from "./pages/docs/Controlled";
import { Internationalization } from "./pages/docs/Internationalization";
import { Theming } from "./pages/docs/Theming";
import { Accessibility } from "./pages/docs/Accessibility";
import { Ssr } from "./pages/docs/Ssr";
import { ErrorHandling } from "./pages/docs/ErrorHandling";
import { ApiCalendar } from "./pages/docs/ApiCalendar";
import { ApiTypes } from "./pages/docs/ApiTypes";
import { ApiHooks } from "./pages/docs/ApiHooks";

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="playground" element={<Playground />} />

          <Route path="docs" element={<DocsLayout />}>
            <Route index element={<Introduction />} />
            <Route path="installation" element={<Installation />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="views" element={<Views />} />
            <Route path="events" element={<Events />} />
            <Route path="controlled" element={<Controlled />} />
            <Route path="i18n" element={<Internationalization />} />
            <Route path="theming" element={<Theming />} />
            <Route path="accessibility" element={<Accessibility />} />
            <Route path="ssr" element={<Ssr />} />
            <Route path="error-handling" element={<ErrorHandling />} />
            <Route path="api/calendar" element={<ApiCalendar />} />
            <Route path="api/types" element={<ApiTypes />} />
            <Route path="api/hooks" element={<ApiHooks />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
