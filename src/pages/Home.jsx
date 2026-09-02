import HeroScene from '../components/scene/HeroScene.jsx'

function Home() {
  return (
    <section className="relative w-full flex-1 overflow-hidden bg-[#0a0a0c]">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="m-0 select-none font-sans text-[18vw] font-black uppercase leading-none tracking-tighter text-[#f5f5f5] sm:text-[14vw]">
          Hi
        </h1>
      </div>
    </section>
  )
}

export default Home
