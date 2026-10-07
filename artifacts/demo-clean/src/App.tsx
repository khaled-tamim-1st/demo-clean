import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowLeft, ArrowUp, Check, ChevronDown, CircleCheck, Leaf, MapPin,
  Menu, ShieldCheck, Sprout, X, Bug, Rat, House,
} from 'lucide-react';

const queryClient = new QueryClient();

const governorates = [
  { name: 'العاصمة', id: 'capital', number: '01', path: 'M115 35 L177 38 L201 72 L180 108 L129 101 L105 71 Z', label: [151, 70] },
  { name: 'حولي', id: 'hawalli', number: '02', path: 'M129 104 L180 111 L190 148 L170 176 L125 165 L111 138 Z', label: [151, 140] },
  { name: 'الفروانية', id: 'farwaniya', number: '03', path: 'M72 111 L123 105 L112 142 L124 170 L117 209 L73 201 L58 159 Z', label: [91, 161] },
  { name: 'مبارك الكبير', id: 'mubarak', number: '04', path: 'M124 171 L170 180 L169 219 L153 255 L120 260 L113 216 Z', label: [143, 218] },
  { name: 'الأحمدي', id: 'ahmadi', number: '05', path: 'M117 263 L153 258 L184 222 L205 240 L198 294 L171 331 L137 321 L120 293 Z', label: [160, 286] },
  { name: 'الجهراء', id: 'jahra', number: '06', path: 'M34 75 L104 68 L127 102 L72 108 L59 158 L74 202 L114 211 L119 260 L119 293 L87 277 L65 247 L43 208 L28 163 L24 118 Z', label: [69, 149] },
];

const faqs = [
  {
    question: 'ما أنواع الآفات التي تشملها خدمات ديمو كلين؟',
    answer: 'نقدم خدمات مكافحة الحشرات والقوارض، مع اختيار طريقة المعالجة المناسبة لطبيعة المكان ونوع المشكلة بعد التقييم.',
  },
  {
    question: 'هل تغطي الخدمة جميع مناطق الكويت؟',
    answer: 'نعم، تغطي خدمات ديمو كلين محافظات الكويت الست: العاصمة، حولي، الفروانية، مبارك الكبير، الأحمدي، والجهراء.',
  },
  {
    question: 'هل تهتمون بسلامة البيئة أثناء المكافحة؟',
    answer: 'نحرص على استخدام حلول فعّالة تراعي البيئة، مع توضيح إرشادات التعامل مع المكان بعد تنفيذ الخدمة.',
  },
  {
    question: 'كيف أطلب الخدمة؟',
    answer: 'يمكنك تعبئة نموذج الاستفسار أدناه لتجهيز تفاصيل طلبك. النموذج في هذه الصفحة تجريبي ولا يرسل البيانات إلى الشركة.',
  },
];

function Home() {
  const [selectedGov, setSelectedGov] = useState(governorates[0]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formNotice, setFormNotice] = useState('');

  useEffect(() => {
    document.title = 'ديمو كلين | مكافحة الحشرات والقوارض في الكويت';
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = 'ديمو كلين لمكافحة الحشرات والقوارض في جميع محافظات الكويت. حلول فعّالة تراعي البيئة، حماية تدوم، وخدمة احترافية.';
    let keywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'ديمو كلين, مكافحة الحشرات الكويت, مكافحة القوارض, مكافحة الآفات, الكويت';
  }, []);

  const handleInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormNotice('تم تجهيز تفاصيل استفسارك على هذه الصفحة فقط. لم يتم إرسال البيانات إلى أي جهة.');
    event.currentTarget.reset();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell" dir="rtl">
      <header className="topbar">
        <div className="container nav-inner">
          <a className="brand" href="#home" aria-label="ديمو كلين، الصفحة الرئيسية" onClick={closeMenu}>
            <span className="brand-mark"><Leaf size={21} strokeWidth={1.8} /></span>
            <span className="brand-name"><strong>DEMO CLEAN</strong><span>ديمو كلين</span></span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="التنقل الرئيسي">
            <a href="#services" onClick={closeMenu}>خدماتنا</a>
            <a href="#approach" onClick={closeMenu}>منهجنا</a>
            <a href="#coverage" onClick={closeMenu}>نطاق التغطية</a>
            <a href="#faq" onClick={closeMenu}>الأسئلة الشائعة</a>
          </nav>
          <a className="nav-cta" href="#contact">اطلب استفساراً <ArrowLeft size={15} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">مكافحة الحشرات والقوارض في الكويت</span>
            <h1>حماية فعّالة،<br /><em>تدوم وتراعي البيئة.</em></h1>
            <p>في ديمو كلين، نجمع بين الخبرة والاهتمام بالتفاصيل لنمنح منزلك ومكان عملك حماية احترافية من الحشرات والقوارض.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#coverage">اكتشف نطاق التغطية <ArrowLeft size={16} /></a>
              <a className="button-outline" href="#services">تعرّف على خدماتنا</a>
            </div>
            <div className="hero-note"><ShieldCheck size={17} /> حلول فعّالة واهتمام بالبيئة في كل خطوة</div>
          </div>
          <div className="hero-art" aria-label="ملصق هوية ديمو كلين">
            <div className="orbit" aria-hidden="true" />
            <Leaf className="floating-leaf leaf-one" size={28} aria-hidden="true" />
            <Sprout className="floating-leaf leaf-two" size={32} aria-hidden="true" />
            <div className="poster-frame">
              <img src="/demo-clean-identity.jpg" alt="ملصق ديمو كلين لمكافحة الحشرات والقوارض" />
            </div>
            <div className="poster-caption"><small>PROFESSIONAL CARE</small><strong>DEMO CLEAN</strong></div>
          </div>
        </div>
        <span className="scroll-cue">اكتشف المزيد&nbsp;&nbsp; ↓</span>
      </section>

      <div className="proof-strip">
        <div className="container proof-inner">
          <div className="proof-item"><span className="proof-icon"><CircleCheck size={19} /></span><div><strong>فعالية عالية</strong><span>معالجة تستهدف المشكلة</span></div></div>
          <div className="proof-item"><span className="proof-icon"><Leaf size={19} /></span><div><strong>آمن على البيئة</strong><span>حلول تراعي محيطك</span></div></div>
          <div className="proof-item"><span className="proof-icon"><House size={19} /></span><div><strong>حماية تدوم</strong><span>عناية تتجاوز المعالجة</span></div></div>
        </div>
      </div>

      <section className="section intro-section">
        <div className="container intro-layout">
          <div>
            <span className="eyebrow">رعاية تبدأ من التفاصيل</span>
            <h2 className="section-heading">مساحة أنظف،<br />وطمأنينة أكبر.</h2>
            <div className="intro-stamp"><b>ديمو كلين — خدمة احترافية</b>رعاية متخصصة لمكافحة الحشرات والقوارض، من أول تقييم وحتى إرشادات ما بعد الخدمة.</div>
          </div>
          <div className="intro-text">
            <p>وجود الآفات لا يقتصر أثره على الإزعاج؛ فهو يمس راحة المكان وسلامة من فيه. لذلك نبدأ بفهم المشكلة واختيار نهج واضح يناسب احتياجك.</p>
            <p>نلتزم بحلول فعّالة تراعي البيئة، وبخدمة احترافية تضع حماية المكان في مقدمة الأولويات. سواء كان منزلاً أو مساحة عمل، نعمل لتبقى الحماية مستمرة.</p>
            <a className="inline-link" href="#approach">كيف نعمل؟ <ArrowLeft size={16} /></a>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-topline">
            <div><span className="eyebrow">خدماتنا</span><h2 className="section-heading">المعالجة المناسبة،<br />للمشكلة الفعلية.</h2></div>
            <p className="section-copy">نركز على المكافحة الدقيقة مع مراعاة خصوصية المكان، لنقدم رعاية عملية وواضحة من البداية.</p>
          </div>
          <div className="services-grid">
            <article className="service-card featured">
              <span className="service-index">01 / INSECT CONTROL</span>
              <span className="service-icon"><Bug size={24} /></span>
              <h3>مكافحة الحشرات</h3>
              <p>حلول متخصصة للتعامل مع الحشرات المزعجة، وفق طبيعة الإصابة ومساحة المكان.</p>
              <span className="service-arrow"><ArrowLeft size={19} /></span>
            </article>
            <article className="service-card">
              <span className="service-index">02 / RODENT CONTROL</span>
              <span className="service-icon"><Rat size={24} /></span>
              <h3>مكافحة القوارض</h3>
              <p>نهج احترافي للحد من وجود القوارض وحماية المساحات المنزلية والتجارية.</p>
              <span className="service-arrow"><ArrowLeft size={19} /></span>
            </article>
            <article className="service-card">
              <span className="service-index">03 / CARE & GUIDANCE</span>
              <span className="service-icon"><ShieldCheck size={24} /></span>
              <h3>حماية وإرشاد</h3>
              <p>إرشادات واضحة للعناية بالمكان والمساعدة في الحفاظ على أثر المعالجة.</p>
              <span className="service-arrow"><ArrowLeft size={19} /></span>
            </article>
          </div>
        </div>
      </section>

      <section className="section approach-section" id="approach">
        <div className="container approach-layout">
          <div className="approach-visual" aria-hidden="true"><div className="approach-visual-mark"><Sprout size={52} strokeWidth={1.4} /></div></div>
          <div>
            <span className="eyebrow">نهج واضح من البداية</span>
            <h2 className="section-heading">احترافية في العمل،<br />وعناية في الأثر.</h2>
            <p className="section-copy">كل مكان له احتياجه. لهذا نحرص على نهج يوازن بين الفعالية، السلامة، وراحة العميل.</p>
            <div className="steps">
              <div className="step"><span className="step-number">01</span><div><h3>نفهم طبيعة المشكلة</h3><p>نبدأ بتحديد نوع الآفة واحتياج المكان قبل اقتراح المعالجة.</p></div></div>
              <div className="step"><span className="step-number">02</span><div><h3>نختار الحل الأنسب</h3><p>معالجة فعّالة مع مراعاة البيئة وطبيعة المساحة.</p></div></div>
              <div className="step"><span className="step-number">03</span><div><h3>نترك لك إرشادات واضحة</h3><p>نشاركك ما يلزم للعناية بالمكان بعد إتمام الخدمة.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section coverage-section" id="coverage">
        <div className="container coverage-layout">
          <div className="coverage-copy">
            <span className="eyebrow">من شمال الكويت إلى جنوبها</span>
            <h2 className="section-heading">قريبون منك،<br />في كل محافظة.</h2>
            <p className="section-copy">تغطي خدمات ديمو كلين محافظات الكويت الست. اختر المحافظة على الخريطة أو من القائمة لتشاهد التحديد يتغير.</p>
            <div className="coverage-note"><MapPin size={18} /><span>اختر أي محافظة — ستتغير الخريطة وبيانات المنطقة مباشرة.</span></div>
          </div>
          <div className="map-card">
            <div className="map-top"><strong>تغطية خدمات ديمو كلين</strong><span>KUWAIT · 6 GOVERNORATES</span></div>
            <div className="map-content">
              <svg className="kuwait-map" viewBox="0 0 235 360" role="img" aria-label={`خريطة تفاعلية لمحافظات الكويت — ${selectedGov.name} محددة`}>
                <path d="M33 72 L105 62 L130 34 L185 36 L214 72 L196 108 L198 143 L188 179 L174 211 L205 239 L197 293 L173 333 L136 325 L115 295 L84 279 L63 246 L42 208 L26 165 L21 118 Z" fill="#e9eee2" stroke="#afc2a3" strokeWidth="2" />
                {governorates.map((gov) => (
                  <g key={gov.id} onClick={() => setSelectedGov(gov)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedGov(gov); }} tabIndex={0} role="button" aria-label={`اختيار محافظة ${gov.name}`} aria-pressed={selectedGov.id === gov.id}>
                    <path className={`map-region ${selectedGov.id === gov.id ? 'selected' : ''}`} d={gov.path} />
                    <text className="map-region-label" x={gov.label[0]} y={gov.label[1]}>{gov.name}</text>
                  </g>
                ))}
                <circle className="map-marker" cx="149" cy="137" r="5" />
              </svg>
              <div className="governorate-list" aria-label="اختر محافظة">
                {governorates.map((gov) => (
                  <button type="button" key={gov.id} className={`gov-button ${selectedGov.id === gov.id ? 'active' : ''}`} onClick={() => setSelectedGov(gov)} aria-pressed={selectedGov.id === gov.id}>
                    <span>{gov.name}</span><span>{gov.number}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="map-selection"><span>المحافظة المحددة: <strong>{selectedGov.name}</strong></span><span className="coverage-all"><Check size={14} /> تغطية في جميع المحافظات</span></div>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-layout">
          <div>
            <span className="eyebrow">إجابات واضحة</span>
            <h2 className="section-heading">أسئلة قد<br />تخطر ببالك.</h2>
            <p className="section-copy">إذا كان لديك استفسار إضافي، يمكنك ترك تفاصيله في النموذج أدناه.</p>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div className="faq-item" key={item.question}>
                <button className="faq-question" type="button" aria-expanded={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                  {item.question}<ChevronDown size={18} />
                </button>
                {faqOpen === index && <div className="faq-answer">{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">خطوتك الأولى</span>
            <h2 className="section-heading">دعنا نفهم<br />احتياج المكان.</h2>
            <p className="section-copy">أخبرنا بنوع المكان والمحافظة ونوع المشكلة، لنتمكن من فهم استفسارك بشكل أفضل.</p>
            <div className="contact-brand">
              <img src="/demo-clean-identity.jpg" alt="" />
              <div><strong>DEMO CLEAN</strong><span>ديمو كلين · الكويت</span></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleInquiry}>
            <div className="form-heading"><strong>نموذج الاستفسار</strong><span>الحقول ذات العلامة * مطلوبة</span></div>
            <div className="form-grid">
              <div className="field"><label htmlFor="contact-name">الاسم *</label><input id="contact-name" name="name" required placeholder="الاسم" autoComplete="name" /></div>
              <div className="field"><label htmlFor="contact-governorate">المحافظة *</label>
                <select id="contact-governorate" name="governorate" required defaultValue="">
                  <option value="" disabled>اختر المحافظة</option>
                  {governorates.map((gov) => <option key={gov.id} value={gov.name}>{gov.name}</option>)}
                </select>
              </div>
              <div className="field full"><label htmlFor="contact-issue">كيف يمكننا مساعدتك؟ *</label><textarea id="contact-issue" name="issue" required placeholder="اكتب نوع المكان والمشكلة باختصار" /></div>
            </div>
            <div className="form-footer"><span className="form-disclaimer">هذا النموذج تجريبي فقط. لا يتم إرسال معلوماتك أو تخزينها.</span><button className="button-primary form-submit" type="submit">تجهيز الاستفسار <ArrowLeft size={15} /></button></div>
            {formNotice && <div className="form-notice" role="status">{formNotice}</div>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-copy">© {new Date().getFullYear()} ديمو كلين — لمكافحة الحشرات والقوارض في الكويت</div>
          <div className="footer-links"><a href="#services">الخدمات</a><a href="#coverage">التغطية</a><a href="#faq">الأسئلة الشائعة</a></div>
          <a className="back-top" href="#home" aria-label="العودة إلى الأعلى"><ArrowUp size={16} /></a>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
