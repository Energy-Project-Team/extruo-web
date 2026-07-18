// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import Footer from "./components/footer";
import LandingHeader from "./components/landing/landing-header";
import LandingIntro from "./components/landing/landing-intro";
import Features from "./components/landing/landing-features";

function App() {
  return (
    <div class="flex min-h-screen flex-col bg-bg-base">
      <LandingHeader />
      <main class="flex flex-1 flex-col gap-6 p-10">
        <LandingIntro />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
