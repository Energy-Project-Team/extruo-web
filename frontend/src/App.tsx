import Footer from "./components/footer";
import LandingHeader from "./components/landing/landing-header";
import LandingIntro from "./components/landing/landing-intro";

function App() {
  return (
    <div class="flex min-h-screen flex-col bg-bg-base">
      <LandingHeader />
      <main class="flex flex-1 flex-col gap-6 p-10">
        <LandingIntro />
      </main>
      <Footer />
    </div>
  );
}

export default App;
