export const siteConfig = {
  name: "STOCKNEXUS",
  description: "Precision Intelligence for Modern Trading",
  theme: {
    primary: "blue-600",
    primaryHover: "blue-700",
    accent: "indigo-500",
    background: "#0a0a0c",
  },
  contact: {
    email: "support@stocknexus.com",
    twitter: "@stocknexus",
  },
  features: [
    {
      id: "latency",
      title: "Ultra-Low Latency",
      description: "Live price updates delivered in milliseconds. Never miss a pivot point again.",
    },
    {
      id: "sentiment",
      title: "AI News Sentiment",
      description: "We scan thousands of articles per second to determine market sentiment instantly.",
    },
    {
      id: "security",
      title: "Portfolio Security",
      description: "Enterprise-grade encryption and secure API management for your financial data.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
