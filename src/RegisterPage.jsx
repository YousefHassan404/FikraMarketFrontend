import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLanguage } from "./Context/userContext";
import Button from "./components/Button";

const RegisterPage = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const content = {
    ar: {
      title: "سجل للوصول المبكر إلى Fikra Market",
      description:
        "كن من أوائل المستخدمين الذين يجربون منصتنا الرائدة لتبادل الأفكار الإبداعية",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      userType: "نوع المستخدم",
      userTypes: {
        investor: "مستثمر",
        idea_owner: "صاحب فكرة",
        general: "مهتم عام",
      },
      ideaCategory: "فئة الفكرة (اختياري)",
      categories: {
        entrepreneurship: "ريادة الأعمال",
        tech: "التكنولوجيا",
        education: "التعليم",
        environment: "البيئة",
        other: "أخرى",
      },
      message: "رسالة (اختياري)",
      submit: "إرسال الطلب",
      languageButton: "English",
      successMessage: "شكراً لتسجيلك! سنتواصل معك قريباً.",
      validation: {
        required: "هذا الحقل مطلوب",
        email: "البريد الإلكتروني غير صحيح",
      },
    },
    en: {
      title: "Register for Early Access to Fikra Market",
      description:
        "Be among the first to experience our groundbreaking platform for creative idea exchange",
      fullName: "Full Name",
      email: "Email Address",
      userType: "User Type",
      userTypes: {
        investor: "Investor",
        idea_owner: "Idea Owner",
        general: "General Interest",
      },
      ideaCategory: "Idea Category (Optional)",
      categories: {
        entrepreneurship: "Entrepreneurship",
        tech: "Technology",
        education: "Education",
        environment: "Environment",
        other: "Other",
      },
      message: "Message (Optional)",
      submit: "Submit Application",
      languageButton: "العربية",
      successMessage: "Thank you for registering! We'll contact you soon.",
      validation: {
        required: "This field is required",
        email: "Invalid email address",
      },
    },
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("https://fikra-market.vercel.app/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // إذا كانت الاستجابة تحتوي على رسالة تفيد بوجود البريد الإلكتروني
      if (response.data && response.data.error === "email_exists") {
        throw new Error(content[language].emailExistsError);
      }
  
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message); // يمكنك استبدال هذا بمكون مخصص لعرض الأخطاء
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white flex items-center justify-center p-4 ${
          language === "ar" ? "font-arabic" : "font-sans"
        }`}
      >
        <div className="relative max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl text-center border border-white border-opacity-20">
          <Button
            onClick={toggleLanguage}
            className="absolute top-4 left-4 bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors duration-300 shadow-md mb-6" // أضفت mb-6 هنا
          >
            {content[language].languageButton}
          </Button>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {content[language].successMessage}
          </h2>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {language === "ar" ? "إرسال طلب آخر" : "Submit Another Request"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
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
        <p className="mb-8 text-lg opacity-90">
          {content[language].description}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-6">
          <div className={language === "ar" ? "text-right" : "text-left"}>
            <label className="block text-sm font-medium mb-2">
              {content[language].fullName}
            </label>
            <input
              {...register("fullName", {
                required: content[language].validation.required,
              })}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-orange-300">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className={language === "ar" ? "text-right" : "text-left"}>
            <label className="block text-sm font-medium mb-2">
              {content[language].email}
            </label>
            <input
              type="email"
              {...register("email", {
                required: content[language].validation.required,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: content[language].validation.email,
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-orange-300">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={language === "ar" ? "text-right" : "text-left"}>
            <label className="block text-sm font-medium mb-2">
              {language === "ar" ? "الدولة" : "Country"}
            </label>
            <input
              {...register("country", {
                required: content[language].validation.required,
              })}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-orange-300">
                {errors.country.message}
              </p>
            )}
          </div>

          <div className={language === "ar" ? "text-right" : "text-left"}>
            <label className="block text-sm font-medium mb-2">
              {content[language].userType}
            </label>
            <select
              {...register("userType", {
                required: content[language].validation.required,
              })}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
            >
              <option value="">
                {language === "ar" ? "اختر نوع المستخدم" : "Select user type"}
              </option>
              {Object.entries(content[language].userTypes).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
            {errors.userType && (
              <p className="mt-1 text-sm text-orange-300">
                {errors.userType.message}
              </p>
            )}
          </div>

          <div className={language === "ar" ? "text-right" : "text-left"}>
            <label className="block text-sm font-medium mb-2">
              {content[language].ideaCategory}
            </label>
            <select
              {...register("ideaCategory")}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
            >
              <option value="">
                {language === "ar"
                  ? "اختر الفئة (اختياري)"
                  : "Select category (optional)"}
              </option>
              {Object.entries(content[language].categories).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className={language === "ar" ? "text-right" : "text-left"}>
            <label className="block text-sm font-medium mb-2">
              {content[language].message}
            </label>
            <textarea
              {...register("message")}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-full font-bold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                language === "ar" ? (
                  "جاري الإرسال..."
                ) : (
                  "Submitting..."
                )
              ) : (
                <span className="flex items-center justify-center">
                  {content[language].submit}
                  <span className="ml-2 inline-block animate-pulse">✨</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;