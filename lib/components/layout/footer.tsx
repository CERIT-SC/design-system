import React from "react";
import { Clock, Mail, MoveRight, Phone } from "lucide-react";
import eInfraLogoDefault from "./e-INFRA_logo_RGB_lilek.png";

const Version = Date.now();

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
      <a href={href} className="text-fd-primary flex items-center gap-2">
        <MoveRight className="pt-[3px]" />
        {text}
      </a>
    </li>
  );
};

interface FooterProps {
  logo?: LogoSrc;
  logoAlt?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo = eInfraLogoDefault,
  logoAlt = "e-INFRA CZ Logo",
}) => {
  return (
    <footer className="flex flex-col mt-0 items-center px-5 bg-gray-100 border-t border-gray-300 pb-5">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start max-w-[1100px] w-full mx-auto">
        <div className="flex-1 px-6 mt-8 flex justify-center">
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-3">e-INFRA CZ</h4>
            <ul>
              <li>
                <p className="text-sm text-fd-muted-foreground">
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

        <div className="hidden md:block w-px bg-gray-300 self-stretch my-8"></div>

        <div className="flex-1 px-6 mt-8 flex justify-center">
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-2">General information</h4>
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

        <div className="hidden md:block w-px bg-gray-300 self-stretch my-8"></div>

        <div className="flex-1 px-6 mt-8 flex justify-center">
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-2">e-INFRA CZ Support</h4>
            <ul className="inline-flex flex-col items-center md:items-start">
              <li className="flex items-center gap-2">
                <Clock className="w-4 pt-[2px] h-4 text-fd-primary" />
                <p className="text-fd-muted-foreground">Available non-stop</p>
              </li>
              <li className="flex pt-[2px] items-center gap-2">
                <Mail className="w-4 h-4 text-fd-primary" />
                <a
                  href="mailto:support@e-infra.cz"
                  className="text-fd-primary hover:underline"
                >
                  support@e-infra.cz
                </a>
              </li>
              <li className="flex pt-[2px] items-center gap-2">
                <Phone className="w-4 h-4 text-fd-primary" />
                <p className="text-fd-muted-foreground">+420 234 680 222</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 max-w-[1100px] w-full mx-auto">
        <img src={resolveLogoSrc(logo)} alt={logoAlt} className="h-22 w-auto" />
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center max-w-[1100px] w-full mx-auto">
        <div className="flex items-center justify-center md:justify-start gap-1">
          <p className="text-sm text-fd-muted-foreground">
            Copyright © 2025 e-INFRA CZ
          </p>
          <p className="text-sm text-fd-muted-foreground px-1 pb-[1px]">|</p>
          <a
            href="https://www.e-infra.cz/en/personal-data-processing"
            className="text-sm text-fd-primary hover:underline"
          >
            Privacy Policy
          </a>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-1 pt-4 md:pt-0">
          <p className="text-sm text-fd-muted-foreground">
            Version: {new Date(Version).toLocaleDateString("cs-CS")}
          </p>
        </div>
      </div>
    </footer>
  );
};
