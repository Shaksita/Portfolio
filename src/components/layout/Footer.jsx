import { Container } from '../ui/Primitives';
import { profile } from '../../data/profile';

/**
 * One centred monospace line closing the page.
 *
 * The year is read from the clock rather than typed in, so the footer cannot
 * silently go stale in January.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Container className="py-10 text-center font-mono text-[0.78rem] tracking-[0.06em] text-ink-3">
        <span>&copy; {year} </span>
        <span className="text-accent">{profile.name}</span>
        <span> - {profile.role}</span>
      </Container>
    </footer>
  );
}
