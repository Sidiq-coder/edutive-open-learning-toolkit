import type { NavigationItem } from "../../types";

interface NavbarProps {
  items: NavigationItem[];
}

export function Navbar({ items }: NavbarProps) {
  return (
    <header className="navbar">
      <a className="brand" href="#top" aria-label="Edutive home">
        <span className="brand__mark">E</span>
        <span>
          <strong>Edutive Toolkit</strong>
          <small>Open learning infrastructure</small>
        </span>
      </a>
      <nav className="navbar__links" aria-label="Main navigation">
        {items.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
