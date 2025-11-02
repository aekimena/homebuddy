export type ListingProp = {
  id: string;
  title: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  location: string;
  image: string;
  rating: number;
  features: ["Accessible Road", "Kitchen", "Balcony"];
  category: string;
};
