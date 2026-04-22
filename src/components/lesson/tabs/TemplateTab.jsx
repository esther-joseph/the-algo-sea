import SectionLabel from '../../ui/SectionLabel';
import CodeBlock     from '../../ui/CodeBlock';

export default function TemplateTab({ pattern }) {
  return (
    <div className="lesson-section">
      <SectionLabel>📜 Pattern Template</SectionLabel>
      <CodeBlock code={pattern.template} />
    </div>
  );
}
