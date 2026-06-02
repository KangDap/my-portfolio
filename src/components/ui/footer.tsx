import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between gap-4 px-6 py-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">
            © 2026{' '}
            <span>
              <Link
                href="https://instagram.com/dafa.ghani"
                target="_blank"
                rel="noreferrer"
                className="group text-sm font-medium text-foreground"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
                  dafa.ghani
                </span>
              </Link>
            </span>
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
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
