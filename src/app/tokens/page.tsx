"use client";

import { ArrowRight } from "lucide-react";
import {
  Content,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Link,
  Button,
} from "../../../lib";
import ColorsPicture from "../../../public/images/token_colors_card_image.png";
import TypographyPicture from "../../../public/images/token_typography_card_image.png";
import SpacingPicture from "../../../public/images/token_spacing_card_image.png";

export default function TokensPage() {
  return (
    <Content>
      <Content.Heading>Design Tokens</Content.Heading>

      <Content.Body>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={ColorsPicture.src}
                alt="Colors preview"
                className="w-auto h-30"
              />
            </CardContent>
            <CardFooter>
              <Link href={"/tokens/colors"}>
                <Button variant="default" size="sm">
                  <ArrowRight className="w-4 h-4" />
                  View Colors
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={TypographyPicture.src}
                alt="Typography preview"
                className="w-auto h-30"
              />
            </CardContent>
            <CardFooter>
              <Link href={"/tokens/typography"}>
                <Button variant="default" size="sm">
                  <ArrowRight className="w-4 h-4" />
                  View Typography
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Spacing & Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={SpacingPicture.src}
                alt="Spacing and Grid preview"
                className="w-auto h-30"
              />
            </CardContent>
            <CardFooter>
              <Link href={"/tokens/spacing-grid"}>
                <Button variant="default" size="sm">
                  <ArrowRight className="w-4 h-4" />
                  View Spacings and Grid
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Content.Body>
    </Content>
  );
}
