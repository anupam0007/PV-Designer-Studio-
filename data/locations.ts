// Contact details, social links and studio locations.

export const contact = {
  email: "Pvdesignerstudio5009@gmail.com",
  whatsappNumber: "918147505009",
  whatsappLink:
    "https://api.whatsapp.com/send/?phone=918147505009&text=Hello%20PV%20Designer%20Studio%2C%20I%27m%20interested%20in%20your%20collections%21",
  phones: [
    { label: "Founder — Chitra Murugaiyan", number: "+91 72045 05009" },
    { label: "Jayanagar & Nelamangala", number: "+91 81477 64113" },
    { label: "Electronic City", number: "+91 74835 05009" },
    { label: "General / WhatsApp", number: "+91 81475 05009" },
  ],
};

export const socials = {
  instagram: "https://www.instagram.com/pvdesignerstudio/",
  facebook: "https://www.facebook.com/profile.php?id=61555700580856",
  youtube: "https://www.youtube.com/channel/UC6D4WQVCtCIJfNXWDNg-kzg",
};

export interface StudioLocation {
  id: number;
  name: string;
  address: string;
  mapEmbedUrl: string;
}

export const locations: StudioLocation[] = [
  {
    id: 1,
    name: "PV Designer Studio — Jayanagar",
    address:
      "No 28, Second Floor, 9th Main Rd, Jaya Nagar 1st Block, Jayanagar 3rd Block, Bengaluru, Karnataka 560011",
    mapEmbedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent(
        "No 28, Second Floor, 9th Main Rd, Jaya Nagar 1st Block, Jayanagar 3rd Block, Bengaluru, Karnataka 560011"
      ) +
      "&output=embed",
  },
  {
    id: 2,
    name: "PV Designer Studio — Nelamangala",
    address:
      "BH Rd, Jyothi Nagar, Vajarahalli, Subhash Nagar, Nelamangala Town, Bengaluru, Karnataka 562123",
    mapEmbedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent(
        "BH Rd, Jyothi Nagar, Vajarahalli, Subhash Nagar, Nelamangala Town, Bengaluru, Karnataka 562123"
      ) +
      "&output=embed",
  },
  {
    id: 3,
    name: "PV Designer Studio — Electronic City",
    address: "Electronic City, Bengaluru, Karnataka",
    mapEmbedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("PV Designer Studio Electronic City Bengaluru") +
      "&output=embed",
  },
];
