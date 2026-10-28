/**
 * Join class names, dropping anything falsy.
 *
 * Keeps conditional Tailwind strings readable without pulling in a dependency:
 *   cn('px-4', isActive && 'text-accent', className)
 *
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
