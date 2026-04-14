import { Clock, Mail, MoveRight, Phone } from "lucide-react";
import eInfraLogoDefault from "./e-INFRA_logo_RGB_lilek.png";

/** Accepts a plain URL string or a Next.js / bundler static-import object. */
type LogoSrc = string | { src: string; width?: number; height?: number };

function resolveLogoSrc(logo: LogoSrc): string {
  return typeof logo === "string" ? logo : logo.src;
}

interface RedirectListItemProps {
  href: string;
  text: string;
}

const RedirectListItem: React.FC<RedirectListItemProps> = ({ href, text }) => {
  return (
    <li>
      <a
        href={href}
        className="text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
      >
        <MoveRight className="pt-0.75" />
        {text}
      </a>
    </li>
  );
};

interface FooterProps {
  logo?: LogoSrc;
  logoAlt?: string;
  tag?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo = eInfraLogoDefault,
  logoAlt = "e-INFRA CZ Logo",
  tag,
}) => {
  return (
    <footer className="mt-0 flex flex-col items-center border-t border-border bg-background px-5 pb-5">
      <div className="mx-auto flex w-full max-w-275 flex-col items-center justify-between md:flex-row md:items-start">
        <div className="flex-1 px-6 mt-8 flex justify-center">
          <div className="text-center md:text-left">
            <h4 className="mb-3 font-semibold text-text-heading">e-INFRA CZ</h4>
            <ul>
              <li>
                <p className="text-sm text-text">
                  <span className="whitespace-nowrap">CERIT-SC</span>,{" "}
                  <span className="whitespace-nowrap">CESNET</span>, and{" "}
                  <span className="whitespace-nowrap">IT4Innovations</span> are
                  the three{" "}
                  <span className="whitespace-nowrap">e-infrastructures</span>{" "}
                  that constitute the national{" "}
                  <span className="whitespace-nowrap">e-INFRA CZ</span> research
                  infrastructure.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8 hidden w-px self-stretch bg-border md:block"></div>

        <div className="flex-1 px-6 mt-8 flex justify-center">
          <div className="text-center md:text-left">
            <h4 className="mb-2 font-semibold text-text-heading">
              General information
            </h4>
            <ul className="inline-flex flex-col items-center md:items-start">
              <RedirectListItem
                href="https://blog.e-infra.cz/"
                text="e-INFRA CZ Blog"
              />
              <RedirectListItem
                href="https://e-infra.cz/"
                text="e-INFRA CZ Website"
              />
            </ul>
          </div>
        </div>

        <div className="my-8 hidden w-px self-stretch bg-border md:block"></div>

        <div className="flex-1 px-6 mt-8 flex justify-center">
          <div className="text-center md:text-left">
            <h4 className="mb-2 font-semibold text-text-heading">
              e-INFRA CZ Support
            </h4>
            <ul className="inline-flex flex-col items-center md:items-start">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 pt-0.5 text-primary" />
                <p className="text-text">Available non-stop</p>
              </li>
              <li className="flex items-center gap-2 pt-0.5">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:support@e-infra.cz"
                  className="text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  support@e-infra.cz
                </a>
              </li>
              <li className="flex items-center gap-2 pt-0.5">
                <Phone className="h-4 w-4 text-primary" />
                <p className="text-text">+420 234 680 222</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-275 items-center justify-center">
        <img src={resolveLogoSrc(logo)} alt={logoAlt} className="h-22 w-auto" />
      </div>
      <div className="mx-auto flex w-full max-w-275 flex-col items-center justify-center md:flex-row md:justify-between">
        <div className="flex items-center justify-center md:justify-start gap-1">
          <p className="text-sm text-text">Copyright © 2025 e-INFRA CZ</p>
          <p className="px-1 pb-px text-sm text-text">|</p>
          <a
            href="https://www.e-infra.cz/en/personal-data-processing"
            className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Privacy Policy
          </a>
        </div>

        {tag && <p className="mt-2 text-xs text-text-muted md:mt-0">{tag}</p>}
      </div>
    </footer>
  );
};
