// Customer testimonials, shown in the homepage carousel and the
// dedicated /reviews page.

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Prema Kishor",
    rating: 5,
    review:
      "We ordered 4-5 lehengas for my daughter and the results were beyond our expectations — and well within budget. Designer Megha guided us through every choice with so much patience.",
  },
  {
    id: 2,
    name: "Savitha Arunkumar",
    rating: 5,
    review:
      "The outfits were excellent in fit, fabric quality and were delivered right on time. Truly impressed with the craftsmanship.",
  },
  {
    id: 3,
    name: "Pooja Kumar",
    rating: 5,
    review:
      "Perfect fitting every single time! Megha's communication and help with selecting the right designs made the whole experience so easy.",
  },
  {
    id: 4,
    name: "Komma Suguna",
    rating: 5,
    review:
      "I bought 10 dresses from PV Designer Studio — the stitching is awesome, quality is great, the designs are unique, and the prices are lower than other boutiques.",
  },
  {
    id: 5,
    name: "Poongodi Sivakumar",
    rating: 5,
    review:
      "My go-to destination for stunning lehengas. Exceptional quality, perfect fit and always delivered on time.",
  },
  {
    id: 6,
    name: "Mona Udayakumar",
    rating: 5,
    review:
      "My favourite and most trustworthy designer. I always come back to PV Designer Studio for every special occasion.",
  },
];
