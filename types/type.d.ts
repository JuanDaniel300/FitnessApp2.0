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
  usuario: string;
  name: string;
  perfil: number;
  edad?: number | any;
  photo?: string;
  fecha_nacimiento?: string;
  peso?: number;
  estautra?: number;
  genero?: string;
};
