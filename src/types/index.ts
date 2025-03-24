export interface ProjectData {
  id: string;
  title: string;
  capacity: string;
  description: string;
  image: string;
  logoImage?: string;
  monthlySavings: number;
}

export interface FacturasModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId: string | null;
}

export interface AIModalProps {
  toggleAIDemo: () => void;
  demoStep: number;
  advanceDemo: () => void;
}

export interface ProjectCardProps {
  image: string;
  logoImage?: string;
  title: string;
  capacity: string;
  description: string;
  monthlySavings: number;
  projectId: string;
  openModal: (id: string) => void;
}
