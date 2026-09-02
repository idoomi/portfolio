import HeroScene from '../components/scene/HeroScene.jsx'

function Home() {
  return (
    <section className="relative w-full flex-1 overflow-hidden bg-[#0a0a0c]">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
    </section>
  )
}

export default Home
