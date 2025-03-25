import appointment_img from "./appointment_img.png";
import header_img from "./header_img.jpg";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_img.png";
import about_image from "./doctors_team.png";
// import logo from './logo.svg'
import logo from "./logo.png";
import chat_icon from "./chat_bot.png";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Skin_Disease_img from "./Skin_Disease_img.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";
import predict_result from './predict_result.png'
import Mental_Health  from './Mental Health AI Assistant.png'

export const assets = {
  Mental_Health,
  appointment_img,
  header_img,
  group_profiles,
  chat_icon,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
  Skin_Disease_img,
  predict_result
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Christopher Davis",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];

export const questionsByRole = {
  "Student": [
    "Do you often feel overwhelmed by academic pressure?",
    "Do you struggle to concentrate during lectures or while studying?",
    "How often do you feel anxious before exams or assignments?",
    "Do you experience difficulty balancing academic and personal life?",
    "Have you lost interest in extracurricular activities you once enjoyed?",
    "Do you frequently procrastinate on assignments due to mental exhaustion?",
    "Do you feel socially isolated or disconnected from your peers?",
    "How often do you experience self-doubt about your abilities?",
    "Do you feel that you are not performing as well as you should be?",
    "Have you ever experienced difficulty sleeping due to academic stress?",
  ],
  "Working professional": [
    "Do you feel emotionally exhausted at the end of the workday?",
    "How often do you struggle with motivation for work-related tasks?",
    "Do you find it difficult to disconnect from work during personal time?",
    "How often do you experience stress due to deadlines and workload?",
    "Do you feel unappreciated for your contributions at work?",
    "How frequently do you worry about job security or career growth?",
    "Do you find it difficult to focus on tasks without getting distracted?",
    "How often do you experience physical symptoms like headaches due to work stress?",
    "Do you feel that your work-life balance is unhealthy?",
    "How frequently do you consider quitting due to mental exhaustion?"
  ],
  "Housewife homemaker": [
    "Do you feel that your daily responsibilities are overwhelming?",
    "How often do you experience feelings of loneliness or isolation?",
    "Do you feel underappreciated for the work you do at home?",
    "How frequently do you experience mood swings or irritability?",
    "Do you feel that your work at home goes unnoticed?",
    "How often do you neglect self-care due to family responsibilities?",
    "Do you find it hard to ask for help when you need it?",
    "Do you experience anxiety about managing household responsibilities?",
    "How often do you feel mentally drained even after a normal day?",
    "Do you feel that you don’t have time to focus on your personal goals?"
  ],
  "Healthcare professional": [
    "Do you frequently feel emotionally drained after patient interactions?",
    "How often do you experience stress due to long working hours?",
    "Do you struggle with maintaining empathy due to constant exposure to suffering?",
    "How often do you feel you cannot provide adequate care due to system limitations?",
    "Do you feel like you have no time for personal self-care?",
    "How often do you experience physical exhaustion at work?",
    "Do you feel that work-related stress affects your personal relationships?",
    "How frequently do you doubt your ability to help your patients?",
    "Do you feel a loss of motivation or passion for your job?",
    "How often do you think about quitting the healthcare profession?"
  ],
  "IT Tech Employee": [
    "How often do you experience stress due to tight project deadlines?",
    "Do you feel mentally exhausted from coding or troubleshooting issues?",
    "How frequently do you find yourself working outside office hours?",
    "Do you struggle to stay focused for long periods?",
    "How often do you feel anxious about making mistakes in code?",
    "Do you feel that long hours of screen time affect your mental well-being?",
    "How frequently do you experience imposter syndrome in your role?",
    "Do you find it difficult to balance work and personal time?",
    "How often do you experience burnout due to excessive workload?",
    "Do you feel pressure to constantly upskill to stay relevant in the industry?"
  ],
  "Teacher": [
    "Do you frequently feel exhausted after a day of teaching?",
    "How often do you experience stress due to student behavior or workload?",
    "Do you feel that your efforts in teaching go unrecognized?",
    "How frequently do you experience frustration or irritation at work?",
    "Do you feel emotionally drained after handling students’ problems?",
    "How often do you feel pressure to meet academic expectations?",
    "Do you struggle to maintain motivation for teaching?",
    "How frequently do you feel a lack of work-life balance?",
    "Do you experience anxiety about managing large classes?",
    "Have you ever thought of leaving teaching due to stress?"
  ],
  "Factory Worker": [
    "Do you frequently experience physical exhaustion from your work?",
    "How often do you feel that your work is monotonous and repetitive?",
    "Do you experience stress due to unsafe or difficult working conditions?",
    "How frequently do you feel unappreciated by your employers?",
    "Do you struggle with feelings of job insecurity?",
    "How often do you experience back pain, headaches, or physical discomfort from work?",
    "Do you feel emotionally or mentally exhausted at the end of the day?",
    "How frequently do you experience difficulty sleeping due to work-related stress?",
    "Do you feel that you lack control over your work conditions?",
    "How often do you think about quitting due to stress?"
  ],
  "Entrepreneurs": [
    "Do you often feel overwhelmed by business-related stress?",
    "How frequently do you struggle with financial anxiety related to your business?",
    "Do you experience self-doubt regarding your ability to succeed?",
    "How often do you feel isolated due to the pressures of running a business?",
    "Do you struggle with decision-making due to stress or anxiety?",
    "How frequently do you feel mentally or physically exhausted?",
    "Do you have difficulty sleeping due to business worries?",
    "Do you feel guilty about taking breaks or vacations?",
    "How often do you experience mood swings related to business performance?",
    "Do you feel that you are sacrificing personal happiness for business success?"
  ]
};
