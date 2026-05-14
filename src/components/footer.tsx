import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">
            © 2026{' '}
            <span>
              <a
                href="https://instagram.com/dafa.ghani"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                dafa.ghani
              </a>
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Image
            src="/assets/hu-tao-speechless.gif"
            alt="Pixel character reaction"
            width={48}
            height={48}
            className="size-12 rounded-md"
          />
          <p className="text-sm text-muted-foreground">Hummm...</p>
        </div>
      </div>
    </footer>
  );
}
