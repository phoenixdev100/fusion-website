import React, { useState, useCallback, useEffect } from 'react';

export default function ApplyPage() {
  // Form state
  const [formData, setFormData] = useState({
    ign: '',
    position: '',
    age: '',
    discord: '',
    email: '',
    experience: '',
    availability: '',
    timezone: '',
    skills: '',
    languages: '',
    previousRoles: '',
    reason: '',
    additionalInfo: '',
    // Staff specific fields
    premium: '',
    banned: '',
    currentStaff: '',
    previousServer: '',
    serverLinks: '',
    inGameTime: '',
    discordTime: '',
    screenshare: '',
    contribution: ''
  });
  
  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const positions = [
    'Media/YouTuber',
    'Partner',
    'Builder',
    'Staff',
    'Developer'
  ];
  
  // Role-specific questions
  const roleQuestions = {
    'Staff': [
      { id: 'ign', label: 'What is your Minecraft username?', required: true },
      { id: 'discord', label: 'What is your Discord username?', required: true },
      { id: 'email', label: 'What is your email address?', required: true },
      { id: 'timezone', label: 'What is your timezone?', required: true },
      { id: 'languages', label: 'What languages do you speak?', required: true },
      { id: 'premium', label: 'Is your account Premium or Cracked?', required: true },
      { id: 'age', label: 'What is your age?', required: true },
      { id: 'banned', label: 'Have you ever been banned for anything in Fusion Network? If yes, then when and for what reason?', required: true },
      { id: 'currentStaff', label: 'Are you currently a staff member in any Minecraft server (including tier communities)?', required: true },
      { id: 'previousServer', label: 'Have you been a staff member in any other server before?', required: true },
      { id: 'serverLinks', label: 'What other servers have you been staff on? Paste Discord link and IP of those servers.', required: false },
      { id: 'inGameTime', label: 'How much time can you give to Fusion Network every day in-game?', required: true },
      { id: 'discordTime', label: 'How much time can you give to Fusion Network every day in Discord?', required: true },
      { id: 'screenshare', label: 'Do you know how to screenshare hackers? If yes, please write a short description of the methods you know.', required: true },
      { id: 'reason', label: 'Why do you want to be a staff member in Fusion Network?', required: true },
      { id: 'contribution', label: 'How can you contribute and benefit the server?', required: true }
    ],
    'Media/YouTuber': [
      { id: 'ign', label: 'What is your Minecraft Username?', required: true },
      { id: 'discord', label: 'What is your Discord Username?', required: true },
      { id: 'email', label: 'What is your Email Address?', required: true },
      { id: 'age', label: 'What is your Age?', required: true },
      { id: 'languages', label: 'What languages do you speak?', required: true },
      { id: 'timezone', label: 'What is your Timezone?', required: true },
      { id: 'additionalInfo', label: 'Please provide links to your content channels (YouTube, Twitch, TikTok, etc.)', required: true },
      { id: 'experience', label: 'How many subscribers/followers do you have?', required: true },
      { id: 'availability', label: 'How often do you create content?', required: true },
      { id: 'reason', label: 'Why do you want to be a Media/YouTuber for Fusion Network?', required: true },
      { id: 'contribution', label: 'How do you plan to feature Fusion Network in your content?', required: true }
    ],
    'Partner': [
      { id: 'ign', label: 'What is your Minecraft Username?', required: true },
      { id: 'discord', label: 'What is your Discord Username?', required: true },
      { id: 'email', label: 'What is your Email Address?', required: true },
      { id: 'age', label: 'What is your Age?', required: true },
      { id: 'languages', label: 'What languages do you speak?', required: true },
      { id: 'timezone', label: 'What is your Timezone?', required: true },
      { id: 'additionalInfo', label: 'Please provide details about your server/community (name, size, focus)', required: true },
      { id: 'experience', label: 'How many members does your community have?', required: true },
      { id: 'reason', label: 'Why do you want to partner with Fusion Network?', required: true },
      { id: 'contribution', label: 'How do you think this partnership would benefit both communities?', required: true }
    ],
    'Builder': [
      { id: 'ign', label: 'What is your Minecraft Username?', required: true },
      { id: 'discord', label: 'What is your Discord Username?', required: true },
      { id: 'email', label: 'What is your Email Address?', required: true },
      { id: 'age', label: 'What is your Age?', required: true },
      { id: 'languages', label: 'What languages do you speak?', required: true },
      { id: 'timezone', label: 'What is your Timezone?', required: true },
      { id: 'experience', label: 'What building experience do you have?', required: true },
      { id: 'skills', label: 'What are your building specialties? (e.g., medieval, modern, organic, etc.)', required: true },
      { id: 'additionalInfo', label: 'Please provide portfolio links or images of your previous builds', required: true },
      { id: 'availability', label: 'How much time can you dedicate to building projects?', required: true },
      { id: 'reason', label: 'Why do you want to be a Builder for Fusion Network?', required: true }
    ],
    'Developer': [
      { id: 'ign', label: 'What is your Minecraft Username?', required: true },
      { id: 'discord', label: 'What is your Discord Username?', required: true },
      { id: 'email', label: 'What is your Email Address?', required: true },
      { id: 'age', label: 'What is your Age?', required: true },
      { id: 'languages', label: 'What programming languages do you know?', required: true },
      { id: 'timezone', label: 'What is your Timezone?', required: true },
      { id: 'experience', label: 'What development experience do you have with Minecraft?', required: true },
      { id: 'skills', label: 'What specific development skills do you have? (e.g., plugin development, web development, etc.)', required: true },
      { id: 'additionalInfo', label: 'Please provide links to your Portfolio, GitHub or previous projects', required: true },
      { id: 'availability', label: 'How much time can you dedicate to development projects?', required: true },
      { id: 'reason', label: 'Why do you want to be a Developer for Fusion Network?', required: true }
    ]
  };
  
  // State for current role questions
  const [currentQuestions, setCurrentQuestions] = useState<Array<{id: string, label: string, required: boolean}>>([]);
  
  // List of timezones for dropdown - sorted by GMT/UTC offset
  const timezones = [
    // Negative offsets (GMT-)
    'GMT-11:00 - Pacific/Pago_Pago (SST)',
    'GMT-11:00 - Pacific/Midway (SST)',
    'GMT-10:00 - Pacific/Honolulu (HST)',
    'GMT-10:00 - Pacific/Tahiti (TAHT)',
    'GMT-09:30 - Pacific/Marquesas (MART)',
    'GMT-09:00 - America/Anchorage (AKST/AKDT)',
    'GMT-08:00 - America/Los_Angeles (PST/PDT)',
    'GMT-08:00 - America/Vancouver (PST/PDT)',
    'GMT-08:00 - Pacific/Pitcairn (PST)',
    'GMT-07:00 - America/Denver (MST/MDT)',
    'GMT-07:00 - America/Phoenix (MST)',
    'GMT-06:00 - America/Chicago (CST/CDT)',
    'GMT-06:00 - America/Mexico_City (CST/CDT)',
    'GMT-06:00 - Pacific/Easter (EAST/EASST)',
    'GMT-05:00 - America/New_York (EST/EDT)',
    'GMT-05:00 - America/Toronto (EST/EDT)',
    'GMT-05:00 - America/Bogota (COT)',
    'GMT-04:00 - America/Halifax (AST/ADT)',
    'GMT-04:00 - America/Santiago (CLT/CLST)',
    'GMT-04:00 - Atlantic/Bermuda (AST/ADT)',
    'GMT-04:00 - Antarctica/Palmer (CLT/CLST)',
    'GMT-03:30 - America/St_Johns (NST/NDT)',
    'GMT-03:00 - America/Argentina/Buenos_Aires (ART)',
    'GMT-03:00 - America/Sao_Paulo (BRT/BRST)',
    'GMT-03:00 - Antarctica/Rothera',
    'GMT-01:00 - Atlantic/Azores (AZOT/AZOST)',
    'GMT-01:00 - Atlantic/Cape_Verde (CVT)',
    
    // UTC/GMT+0
    'GMT+00:00 - UTC (Universal Coordinated Time)',
    'GMT+00:00 - Europe/London (GMT/BST)',
    'GMT+00:00 - Europe/Dublin (GMT/IST)',
    'GMT+00:00 - Europe/Lisbon (WET/WEST)',
    'GMT+00:00 - Africa/Abidjan',
    'GMT+00:00 - Africa/Accra',
    'GMT+00:00 - Africa/Casablanca',
    'GMT+00:00 - Atlantic/Reykjavik (GMT)',
    'GMT+00:00 - Atlantic/Canary (WET/WEST)',
    'GMT+00:00 - Antarctica/Troll',
    
    // Positive offsets (GMT+)
    'GMT+01:00 - Europe/Paris (CET/CEST)',
    'GMT+01:00 - Europe/Berlin (CET/CEST)',
    'GMT+01:00 - Europe/Madrid (CET/CEST)',
    'GMT+01:00 - Europe/Rome (CET/CEST)',
    'GMT+01:00 - Europe/Amsterdam (CET/CEST)',
    'GMT+01:00 - Europe/Brussels (CET/CEST)',
    'GMT+01:00 - Europe/Vienna (CET/CEST)',
    'GMT+01:00 - Europe/Stockholm (CET/CEST)',
    'GMT+01:00 - Europe/Oslo (CET/CEST)',
    'GMT+01:00 - Europe/Copenhagen (CET/CEST)',
    'GMT+01:00 - Europe/Warsaw (CET/CEST)',
    'GMT+01:00 - Europe/Prague (CET/CEST)',
    'GMT+01:00 - Europe/Budapest (CET/CEST)',
    'GMT+01:00 - Europe/Belgrade (CET/CEST)',
    'GMT+01:00 - Europe/Zurich (CET/CEST)',
    'GMT+01:00 - Africa/Lagos (WAT)',
    'GMT+01:00 - Africa/Algiers (CET)',
    'GMT+01:00 - Africa/Tunis (CET)',
    
    'GMT+02:00 - Europe/Athens (EET/EEST)',
    'GMT+02:00 - Europe/Bucharest (EET/EEST)',
    'GMT+02:00 - Europe/Helsinki (EET/EEST)',
    'GMT+02:00 - Europe/Kyiv (EET/EEST)',
    'GMT+02:00 - Africa/Cairo (EET)',
    'GMT+02:00 - Africa/Johannesburg (SAST)',
    'GMT+02:00 - Asia/Jerusalem (IST)',
    'GMT+02:00 - Asia/Beirut (EET/EEST)',
    
    'GMT+03:00 - Europe/Moscow (MSK)',
    'GMT+03:00 - Europe/Istanbul (TRT)',
    'GMT+03:00 - Asia/Baghdad (AST)',
    'GMT+03:00 - Asia/Kuwait (AST)',
    'GMT+03:00 - Asia/Riyadh (AST)',
    'GMT+03:00 - Asia/Qatar (AST)',
    'GMT+03:00 - Africa/Nairobi (EAT)',
    'GMT+03:00 - Africa/Addis_Ababa (EAT)',
    'GMT+03:00 - Antarctica/Syowa',
    
    'GMT+03:30 - Asia/Tehran (IRST/IRDT)',
    
    'GMT+04:00 - Asia/Dubai (GST)',
    'GMT+04:00 - Asia/Muscat (GST)',
    'GMT+04:00 - Indian/Mauritius (MUT)',
    'GMT+04:00 - Indian/Reunion (RET)',
    
    'GMT+04:30 - Asia/Kabul (AFT)',
    
    'GMT+05:00 - Asia/Karachi (PKT)',
    'GMT+05:00 - Indian/Maldives (MVT)',
    
    'GMT+05:30 - Asia/Kolkata (IST)',
    
    'GMT+05:45 - Asia/Kathmandu (NPT)',
    
    'GMT+06:00 - Asia/Dhaka (BST)',
    'GMT+06:00 - Antarctica/Vostok',
    
    'GMT+06:30 - Asia/Yangon (MMT)',
    
    'GMT+07:00 - Asia/Bangkok (ICT)',
    'GMT+07:00 - Asia/Jakarta (WIB)',
    'GMT+07:00 - Asia/Ho_Chi_Minh (ICT)',
    'GMT+07:00 - Antarctica/Davis',
    
    'GMT+08:00 - Asia/Shanghai (CST)',
    'GMT+08:00 - Asia/Hong_Kong (HKT)',
    'GMT+08:00 - Asia/Singapore (SGT)',
    'GMT+08:00 - Asia/Taipei (CST)',
    'GMT+08:00 - Asia/Manila (PHT)',
    'GMT+08:00 - Asia/Kuala_Lumpur (MYT)',
    'GMT+08:00 - Australia/Perth (AWST)',
    'GMT+08:00 - Antarctica/Casey',
    
    'GMT+08:45 - Australia/Eucla (ACWST)',
    
    'GMT+09:00 - Asia/Tokyo (JST)',
    'GMT+09:00 - Asia/Seoul (KST)',
    
    'GMT+09:30 - Australia/Adelaide (ACST/ACDT)',
    'GMT+09:30 - Australia/Darwin (ACST)',
    
    'GMT+10:00 - Australia/Sydney (AEST/AEDT)',
    'GMT+10:00 - Australia/Melbourne (AEST/AEDT)',
    'GMT+10:00 - Australia/Brisbane (AEST)',
    'GMT+10:00 - Australia/Hobart (AEST/AEDT)',
    'GMT+10:00 - Pacific/Guam (ChST)',
    
    'GMT+10:30 - Australia/Lord_Howe (LHST/LHDT)',
    
    'GMT+11:00 - Pacific/Noumea (NCT)',
    'GMT+11:00 - Pacific/Norfolk (NFT)',
    
    'GMT+12:00 - Pacific/Auckland (NZST/NZDT)',
    'GMT+12:00 - Pacific/Fiji (FJT/FJST)',
    'GMT+12:00 - Antarctica/McMurdo (NZST/NZDT)',
    
    'GMT+12:45 - Pacific/Chatham (CHAST/CHADT)',
    
    'GMT+13:00 - Pacific/Tongatapu (TOT)',
    
    'GMT+14:00 - Pacific/Kiritimati (LINT)'
  ];
  
  // Effect to update questions when position changes
  useEffect(() => {
    if (formData.position && roleQuestions[formData.position as keyof typeof roleQuestions]) {
      setCurrentQuestions(roleQuestions[formData.position as keyof typeof roleQuestions]);
    } else {
      setCurrentQuestions([]);
    }
  }, [formData.position]);

  // Handle form field changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);
  
  // Validate email address
  const validateEmail = useCallback((email: string): boolean => {
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email address is required' }));
      return false;
    }
    
    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    
    // Clear error if valid
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  }, []);
  
  // Validate age - must be between 16 and 100 years old
  const validateAge = useCallback((age: string): boolean => {
    if (!age.trim()) {
      setErrors(prev => ({ ...prev, age: 'Age is required' }));
      return false;
    }
    
    // Check if age contains only digits
    if (!/^\d+$/.test(age)) {
      setErrors(prev => ({ ...prev, age: 'Age must be a number without any letters or special characters' }));
      return false;
    }
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) {
      setErrors(prev => ({ ...prev, age: 'Age must be a valid number' }));
      return false;
    }
    
    if (ageNum < 16) {
      setErrors(prev => ({ ...prev, age: 'You must be at least 16 years old to apply' }));
      return false;
    }
    
    if (ageNum >= 100) {
      setErrors(prev => ({ ...prev, age: 'Age must be less than 100' }));
      return false;
    }
    
    // Clear error if valid
    setErrors(prev => ({ ...prev, age: '' }));
    return true;
  }, []);
  
  // Validate step 1 fields
  const validateStep1 = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    if (!formData.position) {
      newErrors.position = 'Position is required';
      isValid = false;
    }
    
    // Get required fields for step 1 based on selected position
    const requiredFields = currentQuestions
      .filter(q => q.required)
      .filter(q => ['ign', 'discord', 'email', 'age', 'premium', 'banned', 'currentStaff', 'previousServer'].includes(q.id))
      .map(q => q.id);
    
    // Validate required fields
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `This field is required`;
        isValid = false;
      }
    });
    
    // Validate email if it's a required field
    if (requiredFields.includes('email') && formData.email) {
      // Comprehensive email validation regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }
    
    // Validate age if it's a required field
    if (requiredFields.includes('age') && formData.age) {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum)) {
        newErrors.age = 'Age must be a number';
        isValid = false;
      } else if (ageNum < 15) {
        newErrors.age = 'You must be at least 15 years old to apply';
        isValid = false;
      } else if (ageNum >= 100) {
        newErrors.age = 'Age must be less than 100';
        isValid = false;
      }
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  }, [formData, currentQuestions]);
  
  // Validate step 2 fields
  const validateStep2 = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    // Get required fields for step 2 based on selected position
    const requiredFields = currentQuestions
      .filter(q => q.required)
      .filter(q => ['experience', 'languages', 'availability', 'timezone', 'skills', 'inGameTime', 'discordTime', 'screenshare', 'serverLinks'].includes(q.id))
      .map(q => q.id);
    
    // Validate required fields
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `This field is required`;
        isValid = false;
      }
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  }, [formData, currentQuestions]);
  
  // Validate step 3 fields
  const validateStep3 = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    // Get required fields for step 3 based on selected position
    const requiredFields = currentQuestions
      .filter(q => q.required)
      .filter(q => ['reason', 'additionalInfo', 'contribution'].includes(q.id))
      .map(q => q.id);
    
    // Validate required fields
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `This field is required`;
        isValid = false;
      }
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  }, [formData, currentQuestions]);
  
  // Check if current step is valid without updating state
  const isCurrentStepValid = useCallback((): boolean => {
    // If no position is selected, only the position field needs to be valid
    if (!formData.position) {
      return step === 1;
    }
    
    // Get the questions for the current step based on selected position
    let requiredFields: string[] = [];
    
    if (step === 1) {
      requiredFields = currentQuestions
        .filter(q => q.required)
        .filter(q => ['ign', 'discord', 'email', 'age', 'premium', 'banned', 'currentStaff', 'previousServer'].includes(q.id))
        .map(q => q.id);
      
      // Check all required fields
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          return false;
        }
      }
      
      // Special validation for email and age
      if (requiredFields.includes('email')) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validEmail = !!formData.email && emailRegex.test(formData.email);
        if (!validEmail) return false;
      }
      
      if (requiredFields.includes('age')) {
        const ageNum = parseInt(formData.age);
        const validAge = formData.age && ageNum >= 15 && ageNum < 100 && !isNaN(ageNum);
        if (!validAge) return false;
      }
      
      return true;
    } else if (step === 2) {
      requiredFields = currentQuestions
        .filter(q => q.required)
        .filter(q => ['experience', 'languages', 'availability', 'timezone', 'skills', 'inGameTime', 'discordTime', 'screenshare', 'serverLinks'].includes(q.id))
        .map(q => q.id);
      
      // Check all required fields
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          return false;
        }
      }
      
      return true;
    } else if (step === 3) {
      requiredFields = currentQuestions
        .filter(q => q.required)
        .filter(q => ['reason', 'additionalInfo', 'contribution'].includes(q.id))
        .map(q => q.id);
      
      // Check all required fields
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          return false;
        }
      }
      
      return true;
    }
    
    return true;
  }, [step, formData, currentQuestions]);
  
  // Move to next step
  const nextStep = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Check if current step is valid
    const isValid = isCurrentStepValid();
    
    // Only proceed if validation passes
    if (isValid) {
      // If valid, update step
      setStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      // If not valid, run the appropriate validation to show error messages
      if (step === 1) {
        validateStep1();
      } else if (step === 2) {
        validateStep2();
      }
    }
  }, [step, totalSteps, isCurrentStepValid, validateStep1, validateStep2]);
  
  // Move to previous step
  const prevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation of all steps
    const isStep1Valid = validateStep1();
    const isStep2Valid = validateStep2();
    const isStep3Valid = validateStep3();
    
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      setError('Please fill in all required fields correctly');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('Webhook URL is not configured.');
      }
      
      // Create an embed object for Discord webhook
      // Get questions for the selected position
      const questions = roleQuestions[formData.position as keyof typeof roleQuestions] || [];
      
      // Build fields array dynamically based on the questions for this role
      const fields = [
        {
          name: "Position",
          value: formData.position,
          inline: false
        }
      ];
      
      // Add fields for each question in the role
      questions.forEach(question => {
        const fieldName = question.id as keyof typeof formData;
        const fieldValue = formData[fieldName] as string;
        
        // Get a user-friendly field name from the question label
        let displayName = question.label;
        if (displayName.includes('?')) {
          // If the label is a question, extract the main subject
          displayName = displayName.split('?')[0].trim();
          if (displayName.toLowerCase().startsWith('what is your')) {
            displayName = displayName.substring(13).trim();
          } else if (displayName.toLowerCase().startsWith('what')) {
            displayName = displayName.substring(4).trim();
          }
        }
        
        fields.push({
          name: displayName,
          value: fieldValue || "Not provided",
          inline: false
        });
      });
      
      // Create the embed with the dynamic fields
      // Set color and customize message based on position type
      let embedColor;
      let embedTitle;
      let embedDescription = "";
      let thumbnailUrl = "";
      
      switch(formData.position) {
        case 'Developer':
          embedColor = 0x00FFFF; // Cyan
          embedTitle = "New Developer Application";
          // embedDescription = "A new developer wants to join our team! Please review their coding skills and experience.";
          // thumbnailUrl = "https://cdn.discordapp.com/emojis/1042377154350325780.webp?size=96&quality=lossless"; // Code emoji
          break;
        case 'Media/YouTuber':
          embedColor = 0xFF0000; // Red
          embedTitle = "New Media/YouTuber Application";
          // embedDescription = "A content creator wants to collaborate with us! Check out their channel and stats.";
          // thumbnailUrl = "https://cdn.discordapp.com/emojis/1042377136985497620.webp?size=96&quality=lossless"; // YouTube emoji
          break;
        case 'Staff':
          embedColor = 0xFFFF00; // Yellow
          embedTitle = "New Staff Application";
          // embedDescription = "Someone wants to join our staff team! Review their experience and qualifications.";
          // thumbnailUrl = "https://cdn.discordapp.com/emojis/1042377150642970705.webp?size=96&quality=lossless"; // Staff emoji
          break;
        case 'Partner':
          embedColor = 0xFF69B4; // Pink
          embedTitle = "New Partnership Application";
          // embedDescription = "A new server wants to partner with us! Check out their community details.";
          // thumbnailUrl = "https://cdn.discordapp.com/emojis/1042377145362075658.webp?size=96&quality=lossless"; // Partnership emoji
          break;
        case 'Builder':
          embedColor = 0x00FF00; // Green
          embedTitle = "New Builder Application";
          // embedDescription = "A builder wants to join our creative team! Review their portfolio and skills.";
          // thumbnailUrl = "https://cdn.discordapp.com/emojis/1042377141889683476.webp?size=96&quality=lossless"; // Builder emoji
          break;
        default:
          embedColor = 0x9B59B6; // Default purple color
          embedTitle = `New ${formData.position} Application`;
          embedDescription = "A new application has been submitted.";
      }
      
      const embed = {
        title: embedTitle,
        description: embedDescription,
        color: embedColor,
        fields: fields,
        timestamp: new Date().toISOString(),
        thumbnail: thumbnailUrl ? { url: thumbnailUrl } : undefined,
        footer: {
          text: `Applicant: ${formData.ign}`
        }
      };

      // Create position-specific content for the webhook message
      let content = "";
      
      // switch(formData.position) {
      //   case 'Developer':
      //     content = "<@&DEVELOPER_ROLE_ID> A new developer application has been submitted!";
      //     break;
      //   case 'Media/YouTuber':
      //     content = "<@&MEDIA_ROLE_ID> A new content creator application has been submitted!";
      //     break;
      //   case 'Staff':
      //     content = "<@&STAFF_MANAGER_ROLE_ID> A new staff application has been submitted!";
      //     break;
      //   case 'Partner':
      //     content = "<@&PARTNERSHIP_ROLE_ID> A new partnership application has been submitted!";
      //     break;
      //   case 'Builder':
      //     content = "<@&BUILDER_ROLE_ID> A new builder application has been submitted!";
      //     break;
      //   default:
      //     content = "A new application has been submitted.";
      // }
      
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content,
          embeds: [embed]
        })
      });
      if (!res.ok) throw new Error('Failed to submit application.');
      setSuccess(true);
      setFormData({
        ign: '',
        position: '',
        age: '',
        discord: '',
        email: '',
        experience: '',
        availability: '',
        timezone: '',
        skills: '',
        languages: '',
        previousRoles: '',
        reason: '',
        additionalInfo: '',
        premium: '',
        banned: '',
        currentStaff: '',
        previousServer: '',
        serverLinks: '',
        inGameTime: '',
        discordTime: '',
        screenshare: '',
        contribution: ''
      });
      setStep(1);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [validateStep1, validateStep2, validateStep3]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-6 px-4 sm:py-10 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-purple-400 text-center">
        {formData.position ? `${formData.position} Application` : 'Application Form'}
      </h1>
      <p className="text-center text-white/70 mb-4 sm:mb-6 max-w-md px-2">
        Join our team and help make Fusion a better place for everyone! Please fill out the application form below.
      </p>
      
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-500/70 rounded-xl p-4 sm:p-5 mb-5 sm:mb-7 max-w-2xl w-full shadow-lg">
        <div className="flex flex-col items-center">
          <div className="text-purple-300 text-lg font-bold mb-2 flex items-center">
            <span className="text-2xl mr-2">📢</span> IMPORTANT NOTICE
          </div>
          <p className="text-white text-center">
            <span className="font-semibold">All applications must be written by you personally.</span> Applications created using AI tools or generated content will be automatically disqualified. We're looking for your authentic voice and genuine passion for the role.
          </p>
        </div>
      </div>
      
      <div className="bg-[#1A1D24] p-4 sm:p-6 md:p-8 rounded-xl shadow-lg w-full max-w-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            {[...Array(totalSteps)].map((_, i) => (
              <React.Fragment key={i}>
                <div 
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${i + 1 <= step ? 'bg-purple-600' : 'bg-gray-700'} text-white text-xs sm:text-sm font-medium`}
                >
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`h-1 w-5 sm:w-10 ${i + 1 < step ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-white/70 text-sm">
            Step {step} of {totalSteps}
          </div>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          if (step === totalSteps) {
            handleSubmit(e);
          } else {
            nextStep(e);
          }
        }} className="flex flex-col gap-3 sm:gap-4">
          {step === 1 && (
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 sm:mb-4">Basic Information</h2>
              
              <div>
                <label className="font-semibold block mb-1">Position you're applying for *</label>
                <select
                  className={`p-2 rounded bg-[#23272f] border ${errors.position ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full text-sm sm:text-base`}
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  style={{ maxWidth: '100%', textOverflow: 'ellipsis' }}
                >
                  <option value="">Select a position</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
              </div>
              
              {/* Display step 1 questions based on selected position */}
              {formData.position && currentQuestions
                .filter(q => ['ign', 'discord', 'email', 'age', 'premium', 'banned', 'currentStaff', 'previousServer'].includes(q.id))
                .map(question => {
                  const fieldName = question.id as keyof typeof formData;
                  const fieldError = errors[fieldName];
                  
                  // Special case for age field which needs additional validation
                  if (fieldName === 'age') {
                    return (
                      <div key={fieldName}>
                        <label className="font-semibold block mb-1">{question.label} {question.required && '*'} <span className="text-xs text-gray-400">(must be at least 15)</span></label>
                        <input
                          className={`p-2 rounded bg-[#23272f] border ${fieldError ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full`}
                          name={fieldName}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={formData[fieldName] as string}
                          onChange={handleChange}
                          onBlur={() => validateAge(formData[fieldName] as string)}
                          placeholder="Your age (minimum 15)"
                          required={question.required}
                        />
                        {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
                      </div>
                    );
                  }
                  
                  // Email field needs type="email"
                  if (fieldName === 'email') {
                    return (
                      <div key={fieldName}>
                        <label className="font-semibold block mb-1">{question.label} {question.required && '*'}</label>
                        <input
                          className={`p-2 rounded bg-[#23272f] border ${fieldError ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full`}
                          name={fieldName}
                          type="email"
                          value={formData[fieldName] as string}
                          onChange={handleChange}
                          onBlur={() => validateEmail(formData[fieldName] as string)}
                          placeholder="Your email address"
                          required={question.required}
                        />
                        {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
                      </div>
                    );
                  }
                  
                  // For other text fields
                  return (
                    <div key={fieldName}>
                      <label className="font-semibold block mb-1">{question.label} {question.required && '*'}</label>
                      <input
                        className={`p-2 rounded bg-[#23272f] border ${fieldError ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full`}
                        name={fieldName}
                        value={formData[fieldName] as string}
                        onChange={handleChange}
                        placeholder={`Enter your ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                        required={question.required}
                      />
                      {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
                    </div>
                  );
                })
              }
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 sm:mb-4">Experience & Availability</h2>
              
              {/* Display step 2 questions based on selected position */}
              {formData.position && currentQuestions
                .filter(q => ['experience', 'languages', 'availability', 'timezone', 'skills', 'inGameTime', 'discordTime', 'screenshare', 'serverLinks'].includes(q.id))
                .map(question => {
                  const fieldName = question.id as keyof typeof formData;
                  const fieldError = errors[fieldName];
                  
                  // Special case for timezone which needs the dropdown
                  if (fieldName === 'timezone') {
                    return (
                      <div key={fieldName}>
                        <label className="font-semibold block mb-1">{question.label} {question.required && '*'}</label>
                        <select
                          className={`p-2 rounded bg-[#23272f] border ${fieldError ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full text-sm sm:text-base`}
                          name={fieldName}
                          value={formData[fieldName] as string}
                          onChange={handleChange}
                          required={question.required}
                          style={{ maxWidth: '100%', textOverflow: 'ellipsis' }}
                        >
                          <option value="">Select your timezone</option>
                          {timezones.map((tz) => (
                            <option key={tz} value={tz} style={{ fontSize: '0.9rem' }}>{tz}</option>
                          ))}
                        </select>
                        {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
                      </div>
                    );
                  }
                  
                  // For all other fields, use textareas
                  return (
                    <div key={fieldName}>
                      <label className="font-semibold block mb-1">{question.label} {question.required && '*'}</label>
                      <textarea
                        className={`p-2 rounded bg-[#23272f] border ${fieldError ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full min-h-[80px]`}
                        name={fieldName}
                        value={formData[fieldName] as string}
                        onChange={handleChange}
                        placeholder={`Enter your ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                        required={question.required}
                      />
                      {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
                    </div>
                  );
                })
              }
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 sm:mb-4">Motivation & Additional Information</h2>
              
              {/* Display step 3 questions based on selected position */}
              {formData.position && currentQuestions
                .filter(q => ['reason', 'additionalInfo', 'contribution'].includes(q.id))
                .map(question => {
                  const fieldName = question.id as keyof typeof formData;
                  const fieldError = errors[fieldName];
                  
                  return (
                    <div key={fieldName}>
                      <label className="font-semibold block mb-1">{question.label} {question.required && '*'}</label>
                      <textarea
                        className={`p-2 rounded bg-[#23272f] border ${fieldError ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full min-h-[100px]`}
                        name={fieldName}
                        value={formData[fieldName] as string}
                        onChange={handleChange}
                        placeholder={`Enter your ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                        required={question.required}
                      />
                      {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
                    </div>
                  );
                })
              }
            </div>
          )}
          <div className="flex justify-between mt-6 w-full">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 sm:px-6 rounded-md transition-colors duration-200 text-sm sm:text-base"
              >
                Back
              </button>
            ) : (
              <div>{/* Empty div to maintain flex layout */}</div>
            )}
            
            {step < totalSteps ? (
              <button
                type="submit"
                className={`ml-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 sm:px-6 rounded-md transition-colors duration-200 text-sm sm:text-base ${!isCurrentStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isCurrentStepValid()}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 sm:px-6 rounded-md transition-colors duration-200 text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
          
          {success && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-900/30 border border-green-500 rounded-md text-green-400 font-semibold text-sm sm:text-base">
              Application submitted successfully! We'll review your application and get back to you soon.
            </div>
          )}
          {error && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-900/30 border border-red-500 rounded-md text-red-400 font-semibold text-sm sm:text-base">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
