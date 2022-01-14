export default interface GenericSocketResponse<T = null> {
  error: boolean;
  message: string;
  data: T | null;
}
