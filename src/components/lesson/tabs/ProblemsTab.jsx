import SectionLabel      from '../../ui/SectionLabel';
import ProblemAccordion  from '../problems/ProblemAccordion';

export default function ProblemsTab({ pattern }) {
  return (
    <div className="lesson-section">
      <SectionLabel>🌊 Practice Problems</SectionLabel>
      {pattern.problems.map((pr) => (
        <ProblemAccordion key={pr.leet} problem={pr} />
      ))}
    </div>
  );
}
