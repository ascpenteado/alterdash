export type Perfil = {
  id: number;
  descricao: string;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  foto: string;
  perfil: Perfil;
  dataCadastro: string; // ou poderia ser um objeto Date
};

export type ObjetoUsuario = {
  usuario: Usuario;
  token: string;
};

export type ApiError = {
  message: string;
};
