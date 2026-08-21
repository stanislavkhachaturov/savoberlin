import Link from "next/link";
import { footer } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="fgrid">
          <div>
            <Logo />
            <p className="fabout">{footer.about}</p>
          </div>
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      // Impressum и Datenschutz открывают единицы — предзагрузка не нужна
                      <Link href={link.href} prefetch={false}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="fbottom">
          <span>{footer.copyright}</span>
          <span>{footer.places}</span>
        </div>
      </div>
    </footer>
  );
}
