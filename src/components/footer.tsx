import { GithubIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Developed by</span>
          <Link
            href="https://github.com/CoderYashVij"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
          >
            <GithubIcon className="h-4 w-4" />
            CoderYashVij
          </Link>
        </div>
      </div>
    </footer>
  );
}