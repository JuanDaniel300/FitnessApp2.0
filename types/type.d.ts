export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: "latest" | "top" } | undefined;
};

export type sliderList = {
  id: number;
  title: string;
  description: string;
  image: any;
};

export type User = {
  id: number;
  name: string;
  perfil: number; // 1 usuario y 2 nutriologo
  edad?: number | any;
  email?: string;
  photo?: string;
  fecha_nacimiento?: string;
  peso?: number;
  estautra?: number;
  genero?: string;
};
