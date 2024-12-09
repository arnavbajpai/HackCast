import Cards from "./components/Cards";
import { LampDemo } from "./components/ui/lamp";
import { Testimonals } from "./components/testimonials";
import Intro from "./components/Intro";

function App() {
  return (
    <div className="bg-slate-950">
      <LampDemo />

      <Intro />

      <section className="bg-slate-950">
        <h1 className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          Features
        </h1>
        <Cards />
      </section>
      <section>
        <h1 className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          Reviews
        </h1>
        <Testimonals />
      </section>
    </div>
  );
}

export default App;
