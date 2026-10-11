import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="case-study-not-found section-pad" dir="auto">
      <span className="case-study-kicker">404 / NOT IN THE FRAME</span>
      <h1>المشروع غير موجود / Project not found</h1>
      <p>قد يكون الرابط غير صحيح أو أن هذه الدراسة لم تعد متاحة.</p>
      <Link href="/projects">العودة إلى الأعمال / Back to work ↗</Link>
    </section>
  );
}
