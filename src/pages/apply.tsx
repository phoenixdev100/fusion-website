import React, { useState, useCallback } from 'react';

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
    additionalInfo: ''
  });
  
  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const positions = [
    'Media',
    'YouTuber',
    'Partner',
    'Donator',
    'Builder',
    'Staff',
    'Developer'
  ];
  
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
  
  // Validate age - must be between 15 and 100 years old
  const validateAge = useCallback((age: string): boolean => {
    if (!age.trim()) {
      setErrors(prev => ({ ...prev, age: 'Age is required' }));
      return false;
    }
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) {
      setErrors(prev => ({ ...prev, age: 'Age must be a number' }));
      return false;
    }
    
    if (ageNum < 15) {
      setErrors(prev => ({ ...prev, age: 'You must be at least 15 years old to apply' }));
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
    
    if (!formData.ign) {
      newErrors.ign = 'In-game name is required';
      isValid = false;
    }
    
    if (!formData.discord) {
      newErrors.discord = 'Discord username is required';
      isValid = false;
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate age
    if (!formData.age) {
      newErrors.age = 'Age is required';
      isValid = false;
    } else {
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
  }, [formData]);
  
  // Validate step 2 fields
  const validateStep2 = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
      isValid = false;
    }
    
    if (!formData.languages) {
      newErrors.languages = 'Languages information is required';
      isValid = false;
    }
    
    if (!formData.availability) {
      newErrors.availability = 'Availability is required';
      isValid = false;
    }
    
    if (!formData.timezone) {
      newErrors.timezone = 'Timezone is required';
      isValid = false;
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  }, [formData]);
  
  // Validate step 3 fields
  const validateStep3 = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    if (!formData.reason) {
      newErrors.reason = 'Reason for application is required';
      isValid = false;
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  }, [formData]);
  
  // Check if current step is valid without updating state
  const isCurrentStepValid = useCallback((): boolean => {
    // Check validity without updating errors state
    if (step === 1) {
      // Check step 1 fields manually
      const validEmail = !!formData.email && /^\S+@\S+\.\S+$/.test(formData.email);
      const ageNum = parseInt(formData.age);
      const validAge = formData.age && ageNum >= 15 && ageNum < 100 && !isNaN(ageNum);
      return !!(formData.position && formData.ign && formData.discord && validEmail && validAge);
    } else if (step === 2) {
      // Check step 2 fields manually
      return !!(formData.experience && formData.languages && formData.availability && formData.timezone);
    } else if (step === 3) {
      // Check step 3 fields manually
      return !!formData.reason;
    }
    return true;
  }, [step, formData]);
  
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
      const embed = {
        title: "New Staff Application",
        color: 0x9B59B6, // Purple color
        fields: [
          {
            name: "Position",
            value: formData.position,
            inline: false
          },
          {
            name: "IGN",
            value: formData.ign,
            inline: false
          },
          {
            name: "Age",
            value: formData.age,
            inline: false
          },
          {
            name: "Discord",
            value: formData.discord,
            inline: false
          },
          {
            name: "Email",
            value: formData.email || "Not provided",
            inline: false
          },
          {
            name: "Timezone",
            value: formData.timezone || "Not provided",
            inline: false
          },
          {
            name: "Relevant Experience",
            value: formData.experience || "None",
            inline: false
          },
          {
            name: "Skills",
            value: formData.skills || "None specified",
            inline: false
          },
          {
            name: "Languages",
            value: formData.languages || "Not specified",
            inline: false
          },
          {
            name: "Previous Roles",
            value: formData.previousRoles || "None",
            inline: false
          },
          {
            name: "Availability",
            value: formData.availability || "Not specified",
            inline: false
          },
          {
            name: "Reason for Application",
            value: formData.reason || "Not provided",
            inline: false
          },
          {
            name: "Additional Information",
            value: formData.additionalInfo || "No additional information provided",
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `Applicant: ${formData.ign}`
        }
      };

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        additionalInfo: ''
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
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-purple-400 text-center">Staff Application</h1>
      <p className="text-center text-white/70 mb-4 sm:mb-6 max-w-md px-2">
        Join our team and help make Fusion a better place for everyone! Please fill out the application form below.
      </p>
      
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
              
              <div>
                <label className="font-semibold block mb-1">What is your in-game name? *</label>
                <input
                  className={`p-2 rounded bg-[#23272f] border ${errors.ign ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full`}
                  name="ign"
                  value={formData.ign}
                  onChange={handleChange}
                  placeholder="Your Minecraft username"
                  required
                />
                {errors.ign && <p className="text-red-500 text-sm mt-1">{errors.ign}</p>}
              </div>
              
              <div>
                <label className="font-semibold block mb-1">How old are you? * <span className="text-xs text-gray-400">(must be at least 15)</span></label>
                <input
                  className={`p-2 rounded bg-[#23272f] border ${errors.age ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full`}
                  name="age"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={() => validateAge(formData.age)}
                  placeholder="Your age (minimum 15)"
                  required
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              
              <div>
                <label className="font-semibold block mb-1">Discord username *</label>
                <input
                  className={`p-2 rounded bg-[#23272f] border ${errors.discord ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full`}
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="Your Discord username (e.g. username#1234)"
                  required
                />
                {errors.discord && <p className="text-red-500 text-sm mt-1">{errors.discord}</p>}
              </div>
              
              <div>
                <label className="font-semibold block mb-1">Email address *</label>
                <input
                  className={`p-2 rounded bg-[#23272f] border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full`}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 sm:mb-4">Experience & Availability</h2>
              
              <div>
                <label className="font-semibold block mb-1">What relevant experience do you have? *</label>
                <textarea
                  className={`p-2 rounded bg-[#23272f] border ${errors.experience ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full min-h-[80px]`}
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Tell us about your previous experience related to this position"
                  required
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
              
              <div>
                <label className="font-semibold block mb-1">What skills do you have that are relevant to this position?</label>
                <textarea
                  className="p-2 rounded bg-[#23272f] border border-white/10 focus:outline-none focus:border-purple-500 text-white w-full min-h-[80px]"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="List your relevant skills (e.g. building, coding, moderation, etc.)"
                />
              </div>
              
              <div>
                <label className="font-semibold block mb-1">What languages do you speak and how fluent are you? *</label>
                <textarea
                  className={`p-2 rounded bg-[#23272f] border ${errors.languages ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full min-h-[80px]`}
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  placeholder="List languages you speak and your fluency level (e.g. English, Hindi, etc.)"
                  required
                />
                {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
              </div>
              
              <div>
                <label className="font-semibold block mb-1">Have you held similar roles on other servers?</label>
                <textarea
                  className="p-2 rounded bg-[#23272f] border border-white/10 focus:outline-none focus:border-purple-500 text-white w-full min-h-[80px]"
                  name="previousRoles"
                  value={formData.previousRoles}
                  onChange={handleChange}
                  placeholder="Tell us about any previous roles you've had on other servers"
                />
              </div>
              
              <div>
                <label className="font-semibold block mb-1">What is your availability? *</label>
                <textarea
                  className={`p-2 rounded bg-[#23272f] border ${errors.availability ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full min-h-[60px]`}
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="How many hours per week can you dedicate?"
                  required
                />
                {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
              </div>
              
              <div>
                <label className="font-semibold block mb-1">What timezone are you in? *</label>
                <select
                  className={`p-2 rounded bg-[#23272f] border ${errors.timezone ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full text-sm sm:text-base`}
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  required
                  style={{ maxWidth: '100%', textOverflow: 'ellipsis' }}
                >
                  <option value="">Select your timezone</option>
                  {timezones.map((tz) => (
                    <option key={tz} value={tz} style={{ fontSize: '0.9rem' }}>{tz}</option>
                  ))}
                </select>
                {errors.timezone && <p className="text-red-500 text-sm mt-1">{errors.timezone}</p>}
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 sm:mb-4">Motivation & Additional Information</h2>
              
              <div>
                <label className="font-semibold block mb-1">Why do you want to join our team? *</label>
                <textarea
                  className={`p-2 rounded bg-[#23272f] border ${errors.reason ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-purple-500 text-white w-full min-h-[100px]`}
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position and what you can bring to our team"
                  required
                />
                {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
              </div>
              
              <div>
                <label className="font-semibold block mb-1">Any additional information you'd like to share?</label>
                <textarea
                  className="p-2 rounded bg-[#23272f] border border-white/10 focus:outline-none focus:border-purple-500 text-white w-full min-h-[100px]"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Anything else you'd like us to know about you? (socials, youtube links, builds made or any relevent info, etc.)"
                />
              </div>
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
