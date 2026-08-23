import Link from "next/link";
import { footer, site } from "@/lib/site";
import { InstagramIcon } from "./icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="fgrid">
          <div>
            <Logo />
            <p className="fmotto">{site.motto}</p>
            <p className="fabout">{footer.about}</p>
            <div className="fsocial">
              {footer.social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label}: ${item.handle}`}
                >
                  <InstagramIcon />
                  {item.handle}
                </a>
              ))}
            </div>
          </div>
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.includes("#") ? (
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
