/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Clock, ArrowRight, 
  Home, Building2, CreditCard, Briefcase, Coins, Car, 
  TrendingUp, ShieldCheck, FileText, CheckCircle2, Star,
  Linkedin, Instagram, Facebook, GraduationCap, Award, User,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const COMPANY = {
  name: "Dhanvith Fincare LLP",
  tagline: "Decade of Expertise, Lifetime of Trust.",
  location: "Muncipal Complex, J.C. Raod, Chamarajapete, Sagar – 577 401, KARNATAKA, India",
  phone1: "9902950273",
  phone2: "9008298307",
  email: "dhanvithfincare@gmail.com",
  website: "www.dhanvithfincare.com",
  instagram: "@dhanvithfincare",
  description: "Dhanvith Fincare LLP is a Sagar-based firm dedicated to empowering your financial growth through expert wealth management, tailored loan solutions, and strategic financial consulting.",
  vision: "To become the most trusted and accessible financial partner for individuals and businesses, by simplifying financial services through transparency, expertise, and personalized care.",
  mission: "Our mission is to leverage our 10+ years of banking excellence to provide seamless, reliable, and ethical financial solutions that help our clients achieve financial stability and growth.",
  kannada: {
    tagline: "ನಂಬಿಕೆಯೇ ನಮ್ಮ ಅಡಿಪಾಯ, ನಿಮ್ಮ ಪ್ರಗತಿಯೇ ನಮ್ಮ ಗುರಿ.",
    vision: "ಪಾರದರ್ಶಕತೆ ಮತ್ತು ದಶಕದ ಅನುಭವದೊಂದಿಗೆ, ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಸರಳ ಹಾಗೂ ಸುಲಭ ಹಣಕಾಸು ಸೇವೆಗಳನ್ನು ತಲುಪಿಸುವುದು ನಮ್ಮ ದೂರದೃಷ್ಟಿ."
  }
};

const VALUES = [
  { title: "Integrity", desc: "We believe in complete transparency in every transaction.", icon: <ShieldCheck className="w-6 h-6" /> },
  { title: "Experience", desc: "Bringing 10 years of HDFC & Axis Bank-grade professionalism to you.", icon: <Award className="w-6 h-6" /> },
  { title: "Customer-First", desc: "Your financial goals are the heart of our service.", icon: <User className="w-6 h-6" /> },
];

const SERVICES = [
  { id: '01', icon: <Home className="w-6 h-6" />, title: "Home Loan", desc: "Make your dream home a reality.", tags: ["Zero Processing Fee", "Quick Approval", "Multiple Banks"] },
  { id: '02', icon: <Building2 className="w-6 h-6" />, title: "Mortgage Loan", desc: "Unlock property value.", tags: ["Against Property", "High Value", "Flexible Tenure"] },
  { id: '03', icon: <CreditCard className="w-6 h-6" />, title: "Personal Loan", desc: "Quick disbursals, minimal paperwork.", tags: ["Quick Disbursal", "Minimal Docs", "No Collateral"] },
  { id: '04', icon: <Briefcase className="w-6 h-6" />, title: "Business Loan", desc: "Working capital & MSME financing.", tags: ["Working Capital", "MSME Loans", "Expansion Fund"] },
  { id: '05', icon: <Coins className="w-6 h-6" />, title: "Gold Loan", desc: "Instant funds against gold assets.", tags: ["Instant Funds", "Safe & Secure", "Best Rates"] },
  { id: '06', icon: <Car className="w-6 h-6" />, title: "Vehicle Loan", desc: "Two-wheeler or four-wheeler loans.", tags: ["2W & 4W", "Easy EMI", "Fast Approval"] },
  { id: '07', icon: <TrendingUp className="w-6 h-6" />, title: "Mutual Funds", desc: "SIP or lump sum wealth growth.", tags: ["SIP & Lumpsum", "Goal-Based", "Expert Guided"] },
  { id: '08', icon: <ShieldCheck className="w-6 h-6" />, title: "Insurance", desc: "Life, Health & General insurance.", tags: ["Life Insurance", "Health Cover", "General Insurance"] },
  { id: '09', icon: <FileText className="w-6 h-6" />, title: "E-Stamp", desc: "Fast e-stamping for legal documents.", tags: ["Legal Docs", "Fast Processing", "Govt Approved"] },
];

const PARTNERS = ["Bank of Baroda", "Indian Bank", "HDFC Bank", "ICICI Bank", "Axis Bank"];

const WHY_US = [
  { title: "Zero Processing Fees", desc: "Maximize loan value, reduce upfront costs.", icon: "🏷️" },
  { title: "All-in-One Financial Hub", desc: "Loans, insurance, investments, e-stamp under one roof.", icon: "🌐" },
  { title: "Local & Approachable", desc: "Sagar-based, personalized service for our community.", icon: "🤝" },
  { title: "Fast Loan Processing", desc: "Established bank relationships for faster approvals.", icon: "⚡" },
  { title: "Multiple Bank Partners", desc: "Compare across 5+ top banks for the best deal.", icon: "🏦" },
  { title: "Trusted & Transparent", desc: "No hidden charges, clear and honest communication.", icon: "🔒" },
];

const PROCESS = [
  { step: "Step 1", title: "Free Consultation", desc: "Contact us or walk in at our Sagar office. No pressure, no commitment." },
  { step: "Step 2", title: "Needs Assessment", desc: "We analyse your financial profile, eligibility, and goals to find the best match." },
  { step: "Step 3", title: "Document & Apply", desc: "We guide you through documentation and submit to the right bank for you." },
  { step: "Step 4", title: "Approval & Disbursal", desc: "We follow up until disbursal and remain your ongoing contact." },
];

const TESTIMONIALS = [
  { text: "Dhanvith Fincare helped me get my home loan approved within a week — zero processing fee and the best rate I was quoted across three banks.", author: "Rajesh Verma", location: "Sagar, Karnataka" },
  { text: "I needed a business loan urgently for my shop expansion. The team made it completely stress-free — all paperwork and follow-ups handled by them.", author: "Sunita Patel", location: "Business Owner, Sagar" },
  { text: "Started my SIP and got my family health insurance through Dhanvith Fincare. They genuinely care about your financial wellbeing.", author: "Anil Kumar", location: "Government Employee, Sagar" },
];

const OWNER = {
  name: "ARUN KUMAR",
  title: "Founder & Managing Director",
  education: "B.com",
  experience: "10+ Years in Banking & NBFC sectors",
  bio: [
    "Arun is a dedicated financial professional with over 10 years of extensive experience in the banking and financial services sector, committed to providing transparent and customer-centric financial solutions.",
    "His professional journey began at the frontlines of India's most respected financial institutions — HDFC Bank, Axis Bank, and IFSL Gold Loan — where he served as a Relationship Manager, building a reputation for integrity, precision, and client trust. Across these roles, he cultivated deep expertise in Banking and NBFC operations, specialising in high-value client relationship management and gold loan portfolio administration. It was here that he mastered the art of translating complex financial products into clear, actionable solutions for his clients.",
    "Today, leveraging his decade-long industry knowledge, Arun leads Dhanvith Fincare LLP with a clear mission: to bridge the gap between complex financial processes and the common man — offering simplified, reliable, and swift financial assistance with the same integrity and excellence he has practised throughout his professional journey."
  ],
  highlights: [
    { label: "Experience", value: "10+ Years in Banking & NBFC sectors", icon: <Clock className="w-4 h-4" /> },
    { label: "Core Expertise", value: "Relationship Management, Gold Loans, and Financial Consulting", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Vision", value: "To empower individuals and businesses with the right financial tools and honest guidance", icon: <TrendingUp className="w-4 h-4" /> }
  ],
  social: {
    instagram: "https://www.instagram.com/arunnejjur",
    facebook: "https://facebook.com/arun.nejjur",
    instagram_company: "https://www.instagram.com/dhanvithfincare",
    youtube: "https://www.youtube.com/@DHANVITHFINCARE"
  },
  photo: "/assets/founder.jpg"
};

const TEAM = [
  {
    name: "Ganesh N",
    role: "Manager",
    work: "Loan department",
    description: "has been an integral part of Dhanvith Fincare LLP since its very founding — a testament to his unwavering dedication and commitment to the firm's mission. As Manager, he serves as the primary point of contact for clients, ensuring every interaction is handled with professionalism, care, and efficiency.",
    photo: "/assets/Ganesh.jpg"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<{name?: string, phone?: string}>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validation
    const errors: {name?: string, phone?: string} = {};
    if (!data.name) errors.name = "Full Name is required";
    if (!data.phone) errors.phone = "Phone Number is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen selection:bg-teal/20 selection:text-gray-900 mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
              <img src="/assets/logo.svg" alt="Logo" className="w-14 h-14 sm:w-12 sm:h-12 hover:scale-110 hover:rotate-6 transition-all duration-300" />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-black tracking-tighter leading-none text-gray-900">{COMPANY.name}</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-10">
              {['About', 'Services', 'Owner', 'Partners', 'Why Us', 'Process', 'Testimonials', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:text-teal transition-all duration-300">
                  {item}
                </a>
              ))}
              <a href="#contact" className="bg-teal text-white px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-gold transition-all active:scale-95 shadow-xl shadow-teal/10">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:text-teal transition-colors">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {['About', 'Services', 'Owner', 'Partners', 'Why Us', 'Process', 'Testimonials', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-4 text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-teal hover:bg-gray-100 rounded-xl transition-all"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4">
                  <a 
                    href="#contact" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-teal text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden mesh-gradient">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 max-w-5xl"
            >
              <div className="inline-flex items-center space-x-3 glass border border-gray-200 px-6 py-3 rounded-full mb-12 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-600">Decade of Expertise, Lifetime of Trust</span>
              </div>
              
              <h1 className="font-serif text-6xl sm:text-8xl lg:text-[130px] font-black leading-[0.85] mb-12 tracking-tighter text-balance text-gray-900">
                Empowering Your <br />
                <span className="text-teal italic">Financial</span> Growth.
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
                Bespoke financial strategies crafted for the visionary. We bridge the gap between your aspirations and reality with decade-long expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
                <a href="#contact" className="bg-teal text-white px-12 py-6 rounded-[2rem] font-bold hover:bg-gold transition-all active:scale-95 text-lg shadow-2xl shadow-teal/20 flex items-center justify-center gap-3 group">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
                <a href={`tel:${COMPANY.phone1}`} className="glass hover:bg-gray-100 px-12 py-6 rounded-[2rem] font-bold transition-all flex items-center justify-center gap-3 text-lg text-gray-900 border border-gray-200">
                  <Phone className="w-5 h-5 text-teal" /> Call Now
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-y-6 gap-x-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 border-t border-gray-200 pt-12">
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-teal" /> {COMPANY.phone1}</div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-teal" /> {COMPANY.email}</div>
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-teal" /> Sagar, KA – 577401</div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 reveal mt-32 w-full">
              {[
                { label: "9+ Services", icon: <Briefcase className="w-6 h-6 text-teal" />, desc: "Loans to Investments" },
                { label: "₹0 Fees", icon: <Coins className="w-6 h-6 text-teal" />, desc: "Zero Processing Costs" },
                { label: "5+ Partners", icon: <Building2 className="w-6 h-6 text-teal" />, desc: "Top National Banks" },
                { label: "100% Trust", icon: <ShieldCheck className="w-6 h-6 text-teal" />, desc: "Ethical Consulting" },
              ].map((stat, i) => (
                <div key={i} className="glass glass-hover p-10 rounded-[3rem] group flex flex-col items-center text-center border border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-teal group-hover:text-white transition-all duration-700">
                    {React.cloneElement(stat.icon as React.ReactElement, { className: "w-7 h-7" })}
                  </div>
                  <div className="text-2xl font-serif font-black text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="reveal">
              <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">ESTABLISHED EXCELLENCE</span>
              <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-[0.85] text-balance text-gray-900">
                Built on Trust. <br />
                <span className="text-teal italic">Driven by Results.</span>
              </h2>
              <div className="space-y-10 text-gray-600 leading-relaxed mb-16 text-lg sm:text-xl">
                <p className="text-justify-custom font-medium opacity-80">{COMPANY.description}</p>
                
                <div className="grid sm:grid-cols-2 gap-12 pt-10 border-t border-gray-200">
                  <div className="space-y-6">
                    <div className="w-14 h-14 bg-teal/5 rounded-2xl flex items-center justify-center text-teal border border-teal/10">
                      <TrendingUp className="w-7 h-7" />
                    </div>
                    <h4 className="text-gray-900 font-serif text-3xl font-bold tracking-tight">Our Vision</h4>
                    <p className="text-base leading-relaxed text-gray-600 font-medium">{COMPANY.vision}</p>
                    <div className="pl-6 border-l-2 border-teal/30 py-2">
                      <p className="text-lg text-teal font-bold italic leading-relaxed opacity-90">{COMPANY.kannada.vision}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="w-14 h-14 bg-teal/5 rounded-2xl flex items-center justify-center text-teal border border-teal/10">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-gray-900 font-serif text-3xl font-bold tracking-tight">Our Mission</h4>
                    <p className="text-base leading-relaxed text-gray-600 font-medium">{COMPANY.mission}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="relative p-px bg-white/5 rounded-[3rem]">
                <div className="bg-gray-50 p-12 rounded-[calc(3rem-1px)] relative overflow-hidden shadow-lg border border-gray-200">
                  <div className="absolute -top-20 -right-20 text-[240px] font-serif font-bold text-gray-300/20 select-none">DF</div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center text-4xl font-serif font-black mb-10 border border-gray-300 text-teal">
                      DF
                    </div>
                    <h3 className="text-3xl font-serif italic text-gray-900 mb-4">{COMPANY.tagline}</h3>
                    <div className="bg-gray-100 px-4 py-2 rounded-xl inline-block mb-10 border border-gray-300">
                      <p className="text-xs text-gray-600 font-bold tracking-widest">{COMPANY.kannada.tagline}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {["Decades of Experience", "Trusted Partner"].map(tag => (
                        <span key={tag} className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-[10px] font-bold text-teal tracking-widest uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24 reveal">
            <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">OUR CORE VALUES</span>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none text-balance text-gray-900">The Foundation of <br /><span className="text-teal italic">Our Service</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {VALUES.map((value, i) => (
              <div key={i} className="reveal bento-card text-center group border border-gray-200">
                <div className="w-24 h-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center text-teal mx-auto mb-12 group-hover:bg-teal group-hover:text-white transition-all duration-700 border border-gray-300 shadow-sm">
                  {React.cloneElement(value.icon as React.ReactElement, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-4xl font-serif font-bold mb-8 tracking-tight text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium opacity-80">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER SECTION */}
      <section id="owner" className="py-40 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="reveal order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal/5 rounded-full blur-[120px] group-hover:bg-teal/10 transition-all duration-1000" />
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                    <img 
                    src={OWNER.photo} 
                    alt={OWNER.name} 
                    className="w-full max-w-lg mx-auto rounded-[4rem] shadow-lg border border-gray-300 grayscale hover:grayscale-0 transition-all duration-1000 object-top object-cover aspect-[3/4]"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute -bottom-12 -left-8 -right-8 glass p-12 rounded-[3.5rem] z-20 border border-gray-200 shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                      <div>
                        <div className="text-4xl font-serif font-black tracking-tighter text-gray-900">{OWNER.name}</div>
                        <div className="text-[11px] text-teal font-bold uppercase tracking-[0.4em] mt-3">{OWNER.title}</div>
                      </div>
                      <div className="flex gap-4">
                        {[
                          { icon: <Instagram className="w-5 h-5" />, link: OWNER.social.instagram },
                          { icon: <Facebook className="w-5 h-5" />, link: OWNER.social.facebook }
                        ].map((s, i) => (
                          <a key={i} href={s.link} className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gray-600 hover:text-teal hover:border-teal/20 transition-all duration-300">
                            {s.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="reveal order-1 lg:order-2">
              <div className="space-y-10 sm:space-y-12">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-6 block">THE VISIONARY</span>
                  <h2 className="font-serif text-6xl sm:text-8xl font-black mb-8 leading-none tracking-tighter text-balance text-black">
                    Meet <span className="text-teal italic">{OWNER.name}</span>
                  </h2>
                  <div className="w-32 h-1 bg-white/5 rounded-full" />
                </div>
                
                <div className="space-y-8 text-lg sm:text-xl text-muted leading-relaxed text-justify-custom font-medium">
                  {OWNER.bio.map((paragraph, idx) => (
                    <p key={idx} className={idx === 0 ? "first-letter:text-5xl sm:first-letter:text-7xl first-letter:font-serif first-letter:text-teal first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-none text-black" : "opacity-80"}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-8">
                  <h4 className="text-[10px] font-bold tracking-[0.4em] text-teal uppercase mb-8">PROFESSIONAL HIGHLIGHTS</h4>
                  <div className="space-y-5">
                    {OWNER.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-6 glass p-6 rounded-3xl border border-white/5">
                        <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-teal flex-shrink-0 mt-1">
                          {React.cloneElement(highlight.icon as React.ReactElement, { className: "w-5 h-5" })}
                        </div>
                        <div>
                          <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold mb-1.5">{highlight.label}</div>
                          <div className="text-base font-bold text-black/90 tracking-tight">{highlight.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 pt-8">
                  <div className="glass p-8 rounded-[2.5rem] border border-white/5">
                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-teal mb-6">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold mb-3">Education</div>
                    <div className="text-base font-bold leading-snug tracking-tight text-black">{OWNER.education}</div>
                  </div>
                  
                  <div className="glass p-8 rounded-[2.5rem] border border-white/5">
                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-teal mb-6">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold mb-3">Experience</div>
                    <div className="text-base font-bold leading-snug tracking-tight text-black">{OWNER.experience}</div>
                  </div>
                </div>

                <div className="pt-10">
                  <a href="#contact" className="inline-flex items-center gap-4 text-black font-bold group text-lg">
                    Schedule a meeting with Arun 
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500 text-teal" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-32 reveal">
            <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">OUR EXPERTS</span>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none text-balance text-gray-900">Meet Our <br /><span className="text-teal italic">Team</span></h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium opacity-80">Dedicated professionals committed to your financial success.</p>
          </div>

{TEAM.map((member, i) => (
              <div key={i} className="reveal group flex flex-col lg:flex-row gap-10 lg:gap-16 overflow-hidden rounded-[3rem] border border-gray-200/50 glass shadow-2xl hover:shadow-2xl hover:shadow-teal/20 hover:-translate-y-2 lg:hover:-translate-y-6 transition-all duration-700 min-h-[580px] lg:min-h-[500px]">
                <div className="relative flex-shrink-0 w-full lg:w-[28rem] lg:aspect-[3/4] overflow-hidden rounded-[2.5rem] lg:rounded-l-[3rem] lg:rounded-r-none grayscale group-hover:grayscale-0 flex-grow-0">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full min-h-[280px] lg:min-h-0 object-cover object-top shadow-2xl border-4 border-white/70"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-grow p-10 lg:p-16 flex flex-col space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl lg:text-5xl font-serif font-black tracking-tight text-gray-900 leading-tight">{member.name}</h3>
                    <p className="text-xl font-bold tracking-[0.2em] text-teal uppercase">{member.role}</p>
                  </div>
                  
                  <div className="pt-8 pb-12 border-t border-gray-200/50">
                    <p className="text-base font-bold tracking-[0.2em] text-gray-600 uppercase mb-6">Department</p>
                    <p className="text-2xl font-bold text-gray-900 leading-snug">{member.work}</p>
                  </div>
                  
                  <p className="text-gray-700 text-xl leading-[1.7] font-medium text-justify-custom hyphens-auto">{member.description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-40 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24 reveal">
            <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">OUR EXPERTISE</span>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none text-balance text-black">Comprehensive <br /><span className="text-teal italic">Financial Solutions</span></h2>
            <div className="w-24 h-1 bg-white/5 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <div key={service.id} className={`reveal bento-card group relative overflow-hidden border border-black/5 ${i === 0 || i === 4 ? 'lg:col-span-2' : ''}`}>
                <div className="absolute top-10 right-10 text-8xl font-serif font-bold text-black/[0.05] group-hover:text-teal/[0.05] transition-colors duration-700">{service.id}</div>
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-teal mb-10 group-hover:bg-teal group-hover:text-white transition-all duration-700 border border-white/5">
                  {React.cloneElement(service.icon as React.ReactElement, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 tracking-tight text-black">{service.title}</h3>
                <p className="text-muted text-lg mb-10 leading-relaxed font-medium opacity-80">{service.desc}</p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-teal/60 bg-teal/5 px-4 py-2 rounded-full border border-teal/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section id="partners" className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal text-center">
            <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">OUR NETWORK</span>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-none text-gray-900">Backed by <br /><span className="text-teal italic">Top Banks</span></h2>
            <p className="text-xl text-gray-600 mb-20 max-w-2xl mx-auto font-medium opacity-80">We compare across India's leading financial institutions to get you the most competitive rates and favorable terms.</p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {PARTNERS.map(partner => (
                <div key={partner} className="px-12 py-6 glass rounded-[2rem] text-lg font-black text-gray-900 hover:text-white hover:bg-teal transition-all duration-500 hover:-translate-y-2 border border-gray-200 shadow-sm">
                  {partner}
                </div>
              ))}
              <div className="px-12 py-6 bg-gray-100 border border-gray-300 rounded-[2rem] text-lg font-black text-teal hover:bg-teal hover:text-white transition-all duration-500 hover:-translate-y-2">
                ✦ & Many More
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-40 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24 reveal">
            <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">THE DF ADVANTAGE</span>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none text-balance text-gray-900">Why Choose <br /><span className="text-teal italic">Dhanvith Fincare?</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {WHY_US.map((item, i) => (
              <div key={i} className="reveal bento-card group border border-gray-200">
                <div className="text-6xl mb-10 group-hover:scale-110 transition-transform duration-700 block">{item.icon}</div>
                <h3 className="text-3xl font-serif font-bold mb-6 tracking-tight text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-32 reveal">
            <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">OUR WORKFLOW</span>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none text-balance text-gray-900">Simple & <br /><span className="text-teal italic">Transparent Process</span></h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-16">
            {PROCESS.map((step, i) => (
              <div key={i} className="reveal group relative">
                <div className="mb-12 relative">
                  <div className="w-24 h-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center text-4xl font-serif font-black text-teal border border-gray-300 group-hover:bg-teal group-hover:text-white transition-all duration-700 shadow-lg group-hover:shadow-teal/20 group-hover:-translate-y-2">
                    {i + 1}
                  </div>
                  {i < PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-32 w-full h-px border-t border-dashed border-gray-300 -z-10" />
                  )}
                </div>
                <h4 className="text-[10px] font-bold text-teal uppercase tracking-[0.3em] mb-6">{step.step}</h4>
                <h3 className="text-3xl font-serif font-bold mb-6 tracking-tight text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium opacity-80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-32 reveal">
            <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">SUCCESS STORIES</span>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none text-balance text-gray-900">What Our <br /><span className="text-teal italic">Clients Say</span></h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal bento-card flex flex-col justify-between border border-gray-200">
                <div>
                  <div className="flex text-teal mb-10">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                  <p className="text-2xl font-serif italic mb-14 leading-relaxed text-black-500">{t.text}</p>
                </div>
                <div className="flex items-center gap-6 pt-10 border-t border-gray-200">
                  <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal font-black text-2xl border border-teal/20">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xl tracking-tight text-gray-900">{t.author}</div>
                    <div className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-1">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-40 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32">
            <div className="reveal">
              <span className="text-[11px] font-bold tracking-[0.4em] text-teal uppercase mb-8 block">GET IN TOUCH</span>
              <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-[0.85] text-gray-900">Ready to <br /><span className="text-teal italic">Grow Together?</span></h2>
              <p className="text-xl text-gray-600 mb-20 leading-relaxed max-w-md font-medium opacity-80">Contact us today for a free, no-obligation consultation. Our experts are ready to help you navigate your financial journey.</p>
              
              <div className="space-y-12">
                <div className="flex gap-10">
                  <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal border border-teal/20 shadow-lg"><MapPin className="w-7 h-7" /></div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold mb-3 tracking-tight text-gray-900">Visit Our Office</h4>
                    <p className="text-gray-600 text-lg leading-relaxed font-medium opacity-80">{COMPANY.location}</p>
                    <a href="https://maps.app.goo.gl/your_location_link_here" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-teal hover:text-teal-dark font-bold text-sm group">
                      <MapPin className="w-4 h-4" />
                      View on Google Maps
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal border border-teal/20 shadow-lg"><Phone className="w-7 h-7" /></div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold mb-3 tracking-tight text-gray-900">Call Us</h4>
                    <div className="flex flex-col gap-3">
                      <a href={`tel:${COMPANY.phone1}`} className="text-gray-600 text-lg hover:text-teal transition-colors font-medium opacity-80">{COMPANY.phone1}</a>
                      <a href={`tel:${COMPANY.phone2}`} className="text-gray-600 text-lg hover:text-teal transition-colors font-medium opacity-80">{COMPANY.phone2}</a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal border border-teal/20 shadow-lg"><Mail className="w-7 h-7" /></div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold mb-3 tracking-tight text-gray-900">Email Us</h4>
                    <a href={`mailto:${COMPANY.email}`} className="text-gray-600 text-lg hover:text-teal transition-colors font-medium opacity-80">{COMPANY.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="glass p-10 sm:p-16 rounded-[3rem] shadow-lg border border-gray-200">
                <h3 className="text-3xl font-serif font-bold mb-10 tracking-tight text-gray-900">Book a Free Consultation</h3>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Full Name*</label>
                      <input 
                        name="name" 
                        type="text" 
                        placeholder="John Doe"
                        className={`w-full bg-white border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-2xl px-6 py-4 focus:outline-none focus:border-teal transition-all font-medium text-gray-900 placeholder-gray-400`}
                      />
                      {formErrors.name && <p className="text-red-500 text-[10px] font-bold">{formErrors.name}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Phone Number*</label>
                      <input 
                        name="phone" 
                        type="tel" 
                        placeholder="+91 99000 00000"
                        className={`w-full bg-white border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-2xl px-6 py-4 focus:outline-none focus:border-teal transition-all font-medium text-gray-900 placeholder-gray-400`}
                      />
                      {formErrors.phone && <p className="text-red-500 text-[10px] font-bold">{formErrors.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Email Address</label>
                    <input 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal transition-all font-medium text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Service Required</label>
                    <div className="relative">
                      <select 
                        name="service"
                        className="w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal transition-all appearance-none font-medium text-gray-900"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <ArrowRight className="w-4 h-4 rotate-90 text-gray-600" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Message</label>
                    <textarea 
                      name="message" 
                      rows={4} 
                      placeholder="How can we help you?"
                      className="w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal transition-all resize-none font-medium text-gray-900 placeholder-gray-400"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'loading'}
                    className={`w-full bg-teal text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-vivid'}`}
                  >
                    {formStatus === 'loading' ? 'Sending...' : 'Send Enquiry'} <ArrowRight className="w-6 h-6" />
                  </button>

                  {formStatus === 'success' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 p-6 rounded-2xl text-sm font-bold text-center">
                      Thank you! Your enquiry has been sent successfully.
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-6 rounded-2xl text-sm font-bold text-center">
                      Something went wrong. Please try again later or call us directly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-40 pb-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal/[0.01] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-5 mb-10">
                <img src="/assets/logo.svg" alt="Logo" className="w-12 h-12 hover:scale-110 hover:rotate-6 transition-all duration-300" />
                <div className="flex flex-col">
                  <span className="font-serif text-4xl font-black tracking-tighter leading-none text-gray-900">{COMPANY.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold mt-2">{COMPANY.tagline}</span>
                </div>
              </div>
              <p className="text-gray-600 text-xl leading-relaxed max-w-md mb-12 font-medium opacity-80">
                {COMPANY.description}
              </p>
              <div className="flex gap-6">
                {[
                  { icon: <Instagram className="w-6 h-6" />, link: OWNER.social.instagram_company },
                  { icon: <Youtube className="w-6 h-6" />, link: OWNER.social.youtube }
                ].map((s, i) => (
                  <a key={i} href={s.link} className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gray-600 hover:text-teal hover:border-teal/20 transition-all duration-300">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-2xl font-bold mb-10 tracking-tight text-gray-900">Quick Links</h4>
              <ul className="space-y-6 text-lg text-gray-600 font-medium">
                <li><a href="#about" className="hover:text-teal transition-all duration-300">About Us</a></li>
                <li><a href="#services" className="hover:text-teal transition-all duration-300">Our Services</a></li>
                <li><a href="#owner" className="hover:text-teal transition-all duration-300">Our Founder</a></li>
                <li><a href="#partners" className="hover:text-teal transition-all duration-300">Lending Partners</a></li>
                <li><a href="#why-us" className="hover:text-teal transition-all duration-300">Why Choose Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-2xl font-bold mb-10 tracking-tight text-gray-900">Contact Info</h4>
              <ul className="space-y-8 text-base text-gray-600 font-medium">
                <li className="flex gap-5">
                  <MapPin className="w-6 h-6 text-teal flex-shrink-0" />
                  <span className="opacity-80 leading-relaxed">{COMPANY.location}</span>
                </li>
                <li className="flex gap-5">
                  <Phone className="w-6 h-6 text-teal flex-shrink-0" />
                  <div className="flex flex-col gap-2 opacity-80">
                    <a href={`tel:${COMPANY.phone1}`} className="hover:text-teal transition-colors">{COMPANY.phone1}</a>
                    <a href={`tel:${COMPANY.phone2}`} className="hover:text-teal transition-colors">{COMPANY.phone2}</a>
                  </div>
                </li>
                <li className="flex gap-5">
                  <Mail className="w-6 h-6 text-teal flex-shrink-0" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-teal transition-colors opacity-80">{COMPANY.email}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-gray-600 text-sm font-medium opacity-60">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </div>
            <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-gray-600 opacity-60">
              <a href="#" className="hover:text-teal transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal transition-colors">Terms of Service</a>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[10px] text-gray-600/60 max-w-3xl mx-auto leading-relaxed uppercase tracking-widest font-bold">
              Disclaimer: Dhanvith Fincare LLP is a financial consulting firm. We are not a bank. Loan approvals are subject to the terms and conditions of the respective lending institutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
