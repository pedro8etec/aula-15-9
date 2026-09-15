import { ApiResponse, Certificate, DashboardData, Employee, Instructor, LoginPayload, LoginResponse, ProfileData, Training, TrainingDetail, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? '';

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    const message = payload?.error?.message || payload?.message || 'Não foi possível carregar os dados.';
    throw new Error(message);
  }

  const payload = await res.json();
  return payload.data ?? payload;
}

export const authService = {
  login: (payload: LoginPayload) => apiFetch<LoginResponse>('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  me: () => apiFetch<ProfileData>('/api/me'),
};

export const dashboardService = {
  get: () => apiFetch<DashboardData>('/api/dashboard'),
};

export const employeeService = {
  list: () => apiFetch<Employee[]>('/api/funcionarios'),
};

export const instructorService = {
  list: () => apiFetch<Instructor[]>('/api/instrutores'),
};

export const trainingService = {
  list: () => apiFetch<Training[]>('/api/treinamentos'),
  detail: (id: number) => apiFetch<TrainingDetail>(`/api/treinamentos/${id}/completo`),
  create: (payload: Partial<Training>) => apiFetch<Training>('/api/treinamentos', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  update: (id: number, payload: Partial<Training>) => apiFetch<Training>(`/api/treinamentos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  remove: (id: number) => apiFetch<null>(`/api/treinamentos/${id}`, {
    method: 'DELETE',
  }),
};

export const certificateService = {
  list: () => apiFetch<Certificate[]>('/api/certificados'),
  detail: (id: number) => apiFetch<any>(`/api/certificados/${id}/completo`),
};

export const userService = {
  list: () => apiFetch<User[]>('/api/usuarios'),
};

export const personService = {
  getMe: () => authService.me(),
};
