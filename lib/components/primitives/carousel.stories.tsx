import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Card, CardContent } from "./card";

const meta = {
  title: "Primitives/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const SLIDES = [1, 2, 3, 4, 5];

export const Default: Story = {
  render: () => (
    <div className="px-12">
      <Carousel aria-label="Numbered slides" className="w-full max-w-xs">
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n} aria-label={`Slide ${n} of ${SLIDES.length}`}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{n}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <div className="px-12">
      <Carousel
        aria-label="Numbered slides"
        opts={{ align: "start" }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem
              key={n}
              aria-label={`Slide ${n} of ${SLIDES.length}`}
              className="basis-1/2"
            >
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{n}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="py-14">
      <Carousel
        aria-label="Numbered slides"
        orientation="vertical"
        opts={{ align: "start" }}
        className="w-full max-w-xs"
      >
        <CarouselContent className="h-[200px]">
          {SLIDES.map((n) => (
            <CarouselItem
              key={n}
              aria-label={`Slide ${n} of ${SLIDES.length}`}
              className="basis-1/2"
            >
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{n}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
