import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { useLanguage } from "./Context/userContext";

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const targetDate = new Date("2025-08-30T08:01:45.978+00:00");
    const startDate = new Date("2025-04-30T08:01:45.978+00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const content = {
    ar: {
      title:
        "قريباً - Fikra Market ✨ أول منصة عربية وعالمية لبيع وشراء الأفكار الإبداعية",
      description:
        "جهّزوا أنفسكم! العد التنازلي لإطلاق المستقبل قد بدأ! نحن نوثّق أفكاركم بحماية تقنية البلوك تشين وتشفير 256 بت، ونربطكم مع مستثمرين حقيقيين لتحويل أفكاركم إلى واقع ملموس.",
      cta: "استعدوا للابتكار! ⚡",
      SignButton: "سجل الآن",
      days: "أيام",
      hours: "ساعات",
      minutes: "دقائق",
      seconds: "ثواني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      buttonText: "كن أول من يعرف بالإطلاق، سجل بريدك الإلكتروني الآن.",
      languageButton: "English",
    },
    en: {
      title:
        "Coming Soon - Fikra Market ✨ The First Arabic and Global Platform for Buying and Selling Creative Ideas",
      description:
        "Get ready! The countdown to the future has begun! We protect your ideas with blockchain technology and 256-bit encryption, and connect you with real investors to turn your ideas into reality.",
      cta: "Get Ready to Innovate! ⚡",
      SignButton: "Sign Up Now",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      emailPlaceholder: "Enter your email address",
      buttonText:
        "Be the first to know about the launch, register your email now.",
      languageButton: "العربية",
    },
  };

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className={`min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white flex items-center justify-center p-4 ${
        language === "ar" ? "font-arabic" : "font-sans"
      }`}
    >
      <div className="relative max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl text-center border border-white border-opacity-20">
        <button
          onClick={toggleLanguage}
          className="absolute top-4 left-4 bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors duration-300 shadow-md"
        >
          {content[language].languageButton}
        </button>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 pt-6">
          {content[language].title}
        </h1>

        <p className="mt-4 text-lg md:text-xl leading-relaxed opacity-90">
          {content[language].description}
        </p>

        <h2 className="mt-8 text-2xl md:text-3xl font-semibold mb-8">
          {content[language].cta}
        </h2>

        <div className="mt-8 grid grid-cols-4 gap-4 text-center max-w-md mx-auto">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-white bg-opacity-15 p-4 rounded-xl backdrop-blur-sm"
            >
              <div className="text-xl md:text-2xl font-bold">{value}</div>{" "}
              {/* تم تصغير الخط هنا */}
              <div className="text-sm md:text-base mt-2 opacity-90">
                {content[language][unit]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            className="text-white bg-red-500 hover:bg-red-600 w-full sm:w-64 px-5 py-3 rounded-full shadow-[0_0_15px_#f87171] hover:shadow-[0_0_25px_#ef4444] transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            to={"/register"}
          >
            {content[language].SignButton}
          </Link>
          <Button
            onClick={toggleLanguage}
            className="absolute top-4 left-4 bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors duration-300 shadow-md mb-6" // أضفت mb-6 هنا
          >
            {content[language].languageButton}
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <a
            href="support@fikramarkets.com"
            className="hover:underline hover:text-orange-300 transition-colors duration-200"
          >
            support@fikramarkets.com
          </a>
          <a
            href="https://www.instagram.com/fikramarkets/"
            target="blank"
            className="hover:underline hover:text-orange-300 transition-colors duration-200"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/fikramarkerts/"
            target="blank"
            className="hover:underline hover:text-orange-300 transition-colors duration-200"
          >
            Facebook
          </a>
          <a
            href="https://t.me/fikramarkets"
            target="blank"
            className="hover:underline hover:text-orange-300 transition-colors duration-200"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
