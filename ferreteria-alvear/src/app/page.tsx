export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-text">Sistema Ferretería Alvear</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-secondary">Botones Principales</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors">
              Primary
            </button>
            <button className="px-6 py-3 bg-secondary hover:bg-secondary-hover text-text-inverse rounded-lg transition-colors">
              Secondary
            </button>
            <button className="px-6 py-3 bg-accent hover:bg-accent-hover text-text-inverse rounded-lg transition-colors">
              Accent
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-secondary">Estados</h2>
          <div className="flex gap-4 flex-wrap">
            <div className="px-6 py-3 bg-success text-text-inverse rounded-lg">Success</div>
            <div className="px-6 py-3 bg-error text-text-inverse rounded-lg">Error</div>
            <div className="px-6 py-3 bg-warning text-text-inverse rounded-lg">Warning</div>
            <div className="px-6 py-3 bg-info text-text-inverse rounded-lg">Info</div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-secondary">Superficies</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 bg-surface hover:bg-surface-hover border border-border rounded-lg transition-colors">
              <h3 className="font-semibold text-text">Surface</h3>
              <p className="text-text-secondary">Contenido de ejemplo</p>
            </div>
            <div className="p-6 bg-background-secondary rounded-lg">
              <h3 className="font-semibold text-text">Background Secondary</h3>
              <p className="text-text-secondary">Contenido de ejemplo</p>
            </div>
            <div className="p-6 bg-background-tertiary rounded-lg">
              <h3 className="font-semibold text-text">Background Tertiary</h3>
              <p className="text-text-tertiary">Contenido de ejemplo</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-secondary">Inputs</h2>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Input normal"
              className="w-full px-4 py-2 bg-surface border border-border focus:border-border-focus rounded-lg outline-none transition-colors"
            />
            <input 
              type="text" 
              placeholder="Input hover"
              className="w-full px-4 py-2 bg-surface border border-border hover:border-border-hover focus:border-border-focus rounded-lg outline-none transition-colors"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
