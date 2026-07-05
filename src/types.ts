export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  audioUrl?: string; // local object URL or server base64 audio
  image?: string;    // base64 or path
  timestamp: Date;
  isVoice?: boolean;
  simulated?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
  benefits: string[];
  details: string[];
}

export interface TechItem {
  name: string;
  category: "languages" | "databases" | "cloud" | "quality" | "hardware";
  level?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectDescription: string;
  budget?: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}
