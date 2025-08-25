export interface ActionState<T = any> {
  data?: T;
  error?: string;
  success?: boolean;
}
