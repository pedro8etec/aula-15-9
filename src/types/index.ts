export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
};

export type User = {
  id: number;
  email: string;
  funcionarioId: number;
  ativo: boolean;
  criadoEm?: string;
};

export type Employee = {
  id: number;
  nome: string;
  matricula: string;
  cargo: string;
  setor: string;
};

export type Instructor = {
  id: number;
  nome: string;
  especialidade: string;
  registro: string;
  email: string;
  interno: boolean;
};

export type TrainingStatus = 'pendente' | 'em_andamento' | 'concluido';

export type Training = {
  id: number;
  titulo: string;
  descricao: string;
  cargaHoraria: number;
  status: TrainingStatus | string;
  dataInicio?: string;
  dataFim?: string;
};

export type Responsible = User & {
  funcionario?: Employee | null;
};

export type Participant = {
  id: number;
  treinamentoId: number;
  funcionarioId: number;
  status: string;
  inscritoEm: string;
  funcionario?: Employee | null;
};

export type Evidence = {
  id: number;
  treinamentoId: number;
  tipo: string;
  descricao: string;
  arquivo: string;
  registradoEm: string;
};

export type Signature = {
  id: number;
  treinamentoParticipantesId: number;
  tipo: string;
  assinadoEm: string;
  hash: string;
};

export type Certificate = {
  id: number;
  treinamentoParticipantesId: number;
  numero: string;
  dataEmissao: string;
  dataValidade: string;
  status: string;
};

export type DashboardData = {
  quantidadeFuncionarios: number;
  quantidadeUsuarios: number;
  quantidadeTreinamentos: number;
  quantidadeInstrutores: number;
  quantidadeCertificados: number;
};

export type TrainingDetail = {
  treinamento: Training;
  instrutores: Instructor[];
  responsaveis: User[];
  participantes: Participant[];
  evidencias: Evidence[];
};

export type ProfileData = {
  usuario: User;
  funcionario: Employee | null;
  perfis: Array<{ id: number; nome: string; descricao: string }>;
};

export type LoginPayload = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  usuario: User;
};

export type TrainingFormValues = {
  titulo: string;
  descricao: string;
  responsavel: string;
  dataInicio: string;
  cargaHoraria: string;
  status: string;
};
