import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-no">404 / FRAME NOT FOUND</div>
      <div className="not-found-grid" aria-hidden="true" />
      <div className="not-found-center">
        <p className="eyebrow">CUT TO BLACK</p>
        <h1>404</h1>
        <p>المشهد ده مش موجود هنا.<br />بس الحكاية لسه مكملة.</p>
        <Link className="button button-fill" href="/">العودة للرئيسية <span>↗</span></Link>
      </div>
      <div className="not-found-corner">MOHAMED ASSEM / VISUAL STORYTELLER</div>
    </main>
  );
}