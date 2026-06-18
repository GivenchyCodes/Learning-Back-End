export default function isValidNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}
