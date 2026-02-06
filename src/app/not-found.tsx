import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center">
      <Container>
        <div className="max-w-lg">
          <p className="text-sm font-mono text-accent mb-4">404</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The page you&#39;re looking for doesn&#39;t exist or has been moved.
          </p>
          <nav className="flex gap-6 text-sm">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="text-foreground hover:text-accent transition-colors"
            >
              Home
            </a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/projects"
              className="text-foreground hover:text-accent transition-colors"
            >
              Projects
            </a>
          </nav>
        </div>
      </Container>
    </main>
  );
}
