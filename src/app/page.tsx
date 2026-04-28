import { LayoutGrid, Server, Shield, HardDrive, Play, Activity, Settings, ExternalLink } from "lucide-react";

interface Service {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    name: "Minecraft Server",
    description: "Servidor de Minecraft para jogar com amigos.",
    url: "http://minecraft.local:25565",
    icon: <Play className="w-6 h-6" />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-sans)]">
      <header className="mb-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Maiconda Homelab Dashboard</h1>
        <p className="text-zinc-400">Página de controle centralizado para meu servidor pessoal.</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <a
              key={service.name}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-6 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:bg-zinc-800/50 hover:border-zinc-700 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:bg-zinc-900 group-hover:border-zinc-700 transition-colors">
                  {service.icon}
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </a>
          ))}
          
          {/* Settings/Add Card */}
          {/* <button className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 transition-all hover:bg-zinc-900 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300">
            <Settings className="w-8 h-8 mb-2" />
            <span className="font-medium">Edit Services</span>
          </button> */}
        </div>
      </main>

      <footer className="mt-20 text-center text-zinc-600 text-sm">
        <p>Built with Next.js & Lucide Icons</p>
      </footer>
    </div>
  );
}
