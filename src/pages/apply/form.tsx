import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, AlertCircle, CheckCircle2, Loader2, BookOpen } from 'lucide-react';

export default function ApplyForm() {
  const navigate = useNavigate();
  
  // Initialize ALL possible fields to prevent controlled/uncontrolled warning
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
    premium: '',
    banned: '',
    currentStaff: '',
    previousServer: '',
    serverLinks: '',
    inGameTime: '',
    discordTime: '',
    screenshare: '',
    contribution: '',
    // Add all missing fields
    dateOfBirth: '',
    gender: '',
    country: '',
    punished: '',
    discordCalls: '',
    recordVideos: '',
    disabilities: '',
    otherAccounts: '',
    sharedAccounts: '',
    usedOthersAccounts: '',
    accessToOthersAccounts: '',
    motivation: '',
    experienceSkills: '',
    hobbies: '',
    bestMemory: '',
    strength: '',
    weakness: '',
    whyAccept: '',
    scenario1: '',
    scenario2: '',
    scenario3: '',
    scenario4: '',
    primaryMotivation: '',
    timeCommitment: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasReadGuidelines, setHasReadGuidelines] = useState(false);
  
  useEffect(() => {
    // Increment view count
    const currentViews = parseInt(localStorage.getItem('apply_form_views') || '0');
    localStorage.setItem('apply_form_views', (currentViews + 1).toString());

    // Check if user has read guidelines
    const guidelinesRead = localStorage.getItem('guidelines_read_timestamp');
    if (guidelinesRead) {
      const readTime = parseInt(guidelinesRead);
      const hoursSinceRead = (Date.now() - readTime) / (1000 * 60 * 60);
      if (hoursSinceRead < 24) {
        setHasReadGuidelines(true);
      }
    }
  }, []);
  
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
      { id: 'ign', label: 'Minecraft username', type: 'text', required: true, placeholder: 'Example: Player123' },
      { id: 'discord', label: 'Discord username', type: 'text', required: true, placeholder: 'Example: player123' },
      { id: 'age', label: 'Age', type: 'number', required: true, placeholder: '0' },
      { id: 'dateOfBirth', label: 'Date of birth', type: 'date', required: true, placeholder: '' },
      { id: 'gender', label: 'Gender', type: 'select', required: true, placeholder: 'Select gender', options: ['Male', 'Female', 'Other'] },
      { id: 'country', label: 'What country do you currently live in?', type: 'text', required: true, placeholder: 'Example: Netherlands' },
      { id: 'timezone', label: 'Time zone', type: 'select', required: true, placeholder: 'Click HERE to find out what your time zone is.' },
      { id: 'languages', label: 'Language(s)', type: 'text', required: true, placeholder: 'What languages can you speak fluently? Example: English' },
      { id: 'availability', label: 'Availability', type: 'text', required: true, placeholder: 'How many hours per week can you dedicate to the role?' },
      { id: 'punished', label: 'Have you ever been punished?', type: 'textarea', required: true, placeholder: 'If you have, please explain why and what you learned from it.' },
      { id: 'discordCalls', label: 'Are you able to talk in Discord calls if needed?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'recordVideos', label: 'Do you have the ability to record Minecraft videos?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'disabilities', label: 'Do you have any disabilities?', type: 'textarea', required: true, placeholder: 'This refers to health-related disorders, such as diseases and illnesses.' },
      { id: 'otherAccounts', label: 'Do you have any other accounts registered on Fusion Network?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'sharedAccounts', label: 'Have you ever shared any of your Fusion Network accounts with others?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'usedOthersAccounts', label: 'Have you ever used any accounts of other Fusion Network players?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'accessToOthersAccounts', label: 'Did you have access to any Fusion Network account that you did not register on the server?', type: 'textarea', required: true, placeholder: '' },
      { id: 'motivation', label: 'What motivated you to apply for staff?', type: 'textarea', required: true, placeholder: 'Please explain in detail what inspired you to submit this staff application and why you want to become a staff member.' },
      { id: 'experienceSkills', label: 'Which relevant experience and skills do you have?', type: 'textarea', required: true, placeholder: 'Please explain in detail!' },
      { id: 'hobbies', label: 'Do you have any other hobbies besides playing Minecraft?', type: 'textarea', required: true, placeholder: '' },
      { id: 'bestMemory', label: 'What is your best memory from playing Fusion Network?', type: 'textarea', required: true, placeholder: '' },
      { id: 'strength', label: 'What is your biggest strength?', type: 'textarea', required: true, placeholder: '' },
      { id: 'weakness', label: 'What is your biggest weakness?', type: 'textarea', required: true, placeholder: '' },
      { id: 'whyAccept', label: 'Why should we accept your application over others?', type: 'textarea', required: true, placeholder: '' },
      { id: 'scenario1', label: 'You witness a popular, high-ranked player subtly using kill-aura in a crowded PvP arena. There is no active report against them. Detail, step-by-step, the exact actions you would take from the moment you notice the infraction to its final resolution.', type: 'textarea', required: true, placeholder: '' },
      { id: 'scenario2', label: 'Two players are engaged in a heated, toxic argument in general chat, derailing the conversation for everyone. Describe your communication strategy and the specific commands you would use to control the situation and restore order.', type: 'textarea', required: true, placeholder: '' },
      { id: 'scenario3', label: 'A new, frustrated player claims they lost valuable items due to a server bug. They are demanding an immediate refund and are becoming increasingly hostile. How do you handle this interaction to both assist the player and uphold server policy?', type: 'textarea', required: true, placeholder: '' },
      { id: 'scenario4', label: 'A player you are friends with asks you to overlook a minor rule violation they committed. How do you respond, and what principles guide your decision?', type: 'textarea', required: true, placeholder: '' },
      { id: 'primaryMotivation', label: 'Beyond "helping the server", what is your specific, primary motivation for applying? What unique skills or perspectives do you possess that would make you a valuable asset to the team over other candidates?', type: 'textarea', required: true, placeholder: '' },
      { id: 'timeCommitment', label: 'Being a staff member requires a consistent time commitment. Describe your weekly availability. To be considered, applicants must be able to dedicate a minimum of four hours in-game/discord daily. Explain how you will balance this with your real-life responsibilities to ensure you meet our activity requirements.', type: 'textarea', required: true, placeholder: '' }
    ],
    'Developer': [
      { id: 'ign', label: 'Minecraft Username', type: 'text', required: true, placeholder: 'Example: Player123' },
      { id: 'discord', label: 'Discord Username', type: 'text', required: true, placeholder: 'Example: player123' },
      { id: 'age', label: 'Age', type: 'number', required: true, placeholder: '0' },
      { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, placeholder: '' },
      { id: 'gender', label: 'Gender', type: 'select', required: true, placeholder: 'Select gender', options: ['Male', 'Female', 'Other'] },
      { id: 'country', label: 'What country do you currently live in?', type: 'text', required: true, placeholder: 'Example: Netherlands' },
      { id: 'timezone', label: 'Time Zone', type: 'select', required: true, placeholder: 'Select your time zone' },
      { id: 'languages', label: 'Language(s)', type: 'text', required: true, placeholder: 'What languages can you speak fluently? Example: English' },
      { id: 'availability', label: 'Availability', type: 'text', required: true, placeholder: 'How many hours per week can you dedicate to the role?' },
      { id: 'punished', label: 'Have you ever been punished?', type: 'textarea', required: true, placeholder: 'If you have, please explain why and what you learned from it.' },
      { id: 'discordCalls', label: 'Are you able to talk in Discord calls if needed?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'recordVideos', label: 'Do you have the ability to record Minecraft videos?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'disabilities', label: 'Do you have any disabilities?', type: 'textarea', required: true, placeholder: 'This refers to health-related disorders, such as diseases and illnesses.' },
      { id: 'otherAccounts', label: 'Do you have any other accounts registered on Fusion Network?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'sharedAccounts', label: 'Have you ever shared any of your Fusion Network accounts with others?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'usedOthersAccounts', label: 'Have you ever used any accounts of other Fusion Network players?', type: 'select', required: true, placeholder: 'Select', options: ['Yes', 'No'] },
      { id: 'accessToOthersAccounts', label: 'Did you have access to any Fusion Network account that you did not register on the server?', type: 'textarea', required: true, placeholder: 'Explain in detail.' },
      { id: 'motivation', label: 'What motivated you to apply for developer?', type: 'textarea', required: true, placeholder: 'Please explain in detail what inspired you to submit this developer application and why you want to become a developer.' },
      { id: 'experienceSkills', label: 'Which relevant experience and skills do you have?', type: 'textarea', required: true, placeholder: 'Please explain in detail!' },
      { id: 'hobbies', label: 'Do you have any other hobbies besides playing Minecraft?', type: 'textarea', required: true, placeholder: '' },
      { id: 'bestMemory', label: 'What is your best memory from playing Fusion Network?', type: 'textarea', required: true, placeholder: '' },
      { id: 'strength', label: 'What is your biggest strength?', type: 'textarea', required: true, placeholder: '' },
      { id: 'weakness', label: 'What is your biggest weakness?', type: 'textarea', required: true, placeholder: '' },
      { id: 'whyAccept', label: 'Why should we accept your application over others?', type: 'textarea', required: true, placeholder: '' },
      { id: 'scenario1', label: 'Scenario 1', type: 'textarea', required: true, placeholder: 'You discover a bug in the server\'s plugin that causes items to duplicate. Detail, step-by-step, the exact actions you would take from the moment you notice the issue to its final resolution.' },
      { id: 'scenario2', label: 'Scenario 2', type: 'textarea', required: true, placeholder: 'A player reports a performance issue in a custom feature you developed. Describe your debugging strategy and the specific tools/commands you would use to identify and fix the problem.' },
      { id: 'scenario3', label: 'Scenario 3', type: 'textarea', required: true, placeholder: 'The server needs a new feature for player economy, but there\'s a tight deadline. How do you plan and implement it while ensuring it\'s secure and efficient?' },
      { id: 'scenario4', label: 'Scenario 4', type: 'textarea', required: true, placeholder: 'A fellow developer suggests a code change that you believe could introduce security vulnerabilities. How do you respond, and what principles guide your decision?' },
      { id: 'primaryMotivation', label: 'Beyond "helping the server", what is your specific, primary motivation for applying? What unique skills or perspectives do you possess that would make you a valuable asset to the team over other candidates?', type: 'textarea', required: true, placeholder: '' },
      { id: 'timeCommitment', label: 'Being a developer requires a consistent time commitment. Describe your weekly availability. To be considered, applicants must be able to dedicate a minimum of four hours in-game/discord daily. Explain how you will balance this with your real-life responsibilities to ensure you meet our activity requirements.', type: 'textarea', required: true, placeholder: '' }
    ],
    'Media/YouTuber': [
      { id: 'ign', label: 'What is your Minecraft Username?', type: 'text', required: true, placeholder: 'Enter your Minecraft IGN' },
      { id: 'discord', label: 'What is your Discord Username?', type: 'text', required: true, placeholder: 'username#0000' },
      { id: 'email', label: 'What is your Email Address?', type: 'email', required: true, placeholder: 'your.email@example.com' },
      { id: 'age', label: 'What is your Age?', type: 'number', required: true, placeholder: 'Must be 16 or older' },
      { id: 'languages', label: 'What languages do you speak?', type: 'text', required: true, placeholder: 'e.g., English, Spanish' },
      { id: 'timezone', label: 'What is your Timezone?', type: 'select', required: true, placeholder: 'Select your timezone' },
      { id: 'additionalInfo', label: 'Please provide links to your content channels (YouTube, Twitch, TikTok, etc.)', type: 'textarea', required: true, placeholder: 'Provide links to your YouTube, Twitch, TikTok, etc.' },
      { id: 'experience', label: 'How many subscribers/followers do you have?', type: 'text', required: true, placeholder: 'How many subscribers/followers do you have?' },
      { id: 'availability', label: 'How often do you create content?', type: 'textarea', required: true, placeholder: 'How often do you create content?' },
      { id: 'reason', label: 'Why do you want to be a Media/YouTuber for Fusion Network?', type: 'textarea', required: true, placeholder: 'Why do you want to be a Media/YouTuber for Fusion Network?' },
      { id: 'contribution', label: 'How do you plan to feature Fusion Network in your content?', type: 'textarea', required: true, placeholder: 'How do you plan to feature Fusion Network in your content?' }
    ],
    'Partner': [
      { id: 'ign', label: 'What is your Minecraft Username?', type: 'text', required: true, placeholder: 'Enter your Minecraft IGN' },
      { id: 'discord', label: 'What is your Discord Username?', type: 'text', required: true, placeholder: 'username#0000' },
      { id: 'email', label: 'What is your Email Address?', type: 'email', required: true, placeholder: 'your.email@example.com' },
      { id: 'age', label: 'What is your Age?', type: 'number', required: true, placeholder: 'Must be 16 or older' },
      { id: 'languages', label: 'What languages do you speak?', type: 'text', required: true, placeholder: 'e.g., English, Spanish' },
      { id: 'timezone', label: 'What is your Timezone?', type: 'select', required: true, placeholder: 'Select your timezone' },
      { id: 'additionalInfo', label: 'Please provide details about your server/community (name, size, focus)', type: 'textarea', required: true, placeholder: 'Provide details about your server/community (name, size, focus)' },
      { id: 'experience', label: 'How many members does your community have?', type: 'text', required: true, placeholder: 'How many members does your community have?' },
      { id: 'reason', label: 'Why do you want to partner with Fusion Network?', type: 'textarea', required: true, placeholder: 'Why do you want to partner with Fusion Network?' },
      { id: 'contribution', label: 'How do you think this partnership would benefit both communities?', type: 'textarea', required: true, placeholder: 'How do you think this partnership would benefit both communities?' }
    ],
    'Builder': [
      { id: 'ign', label: 'What is your Minecraft Username?', type: 'text', required: true, placeholder: 'Enter your Minecraft IGN' },
      { id: 'discord', label: 'What is your Discord Username?', type: 'text', required: true, placeholder: 'username#0000' },
      { id: 'email', label: 'What is your Email Address?', type: 'email', required: true, placeholder: 'your.email@example.com' },
      { id: 'age', label: 'What is your Age?', type: 'number', required: true, placeholder: 'Must be 16 or older' },
      { id: 'languages', label: 'What languages do you speak?', type: 'text', required: true, placeholder: 'e.g., English, Spanish' },
      { id: 'timezone', label: 'What is your Timezone?', type: 'select', required: true, placeholder: 'Select your timezone' },
      { id: 'experience', label: 'What building experience do you have?', type: 'textarea', required: true, placeholder: 'What building experience do you have?' },
      { id: 'skills', label: 'What are your building specialties? (e.g., medieval, modern, organic, etc.)', type: 'textarea', required: true, placeholder: 'What are your building specialties? (e.g., medieval, modern, organic, etc.)' },
      { id: 'additionalInfo', label: 'Please provide portfolio links or images of your previous builds', type: 'textarea', required: true, placeholder: 'Please provide portfolio links or images of your previous builds' },
      { id: 'availability', label: 'How much time can you dedicate to building projects?', type: 'text', required: true, placeholder: 'How much time can you dedicate to building projects?' },
      { id: 'reason', label: 'Why do you want to be a Builder for Fusion Network?', type: 'textarea', required: true, placeholder: 'Why do you want to be a Builder for Fusion Network?' }
    ]
  };
  
  const [currentQuestions, setCurrentQuestions] = useState<Array<{id: string, label: string, type: string, required: boolean, placeholder: string, options?: string[]}>>([]);
  
  const timezones = [
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
  
  useEffect(() => {
    if (formData.position && roleQuestions[formData.position as keyof typeof roleQuestions]) {
      setCurrentQuestions(roleQuestions[formData.position as keyof typeof roleQuestions]);
    } else {
      setCurrentQuestions([]);
    }
  }, [formData.position]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);
  
  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);
  
  const validateEmail = useCallback((email: string): boolean => {
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email address is required' }));
      return false;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  }, []);
  
  const validateAge = useCallback((age: string): boolean => {
    if (!age.trim()) {
      setErrors(prev => ({ ...prev, age: 'Age is required' }));
      return false;
    }
    
    if (!/^\d+$/.test(age)) {
      setErrors(prev => ({ ...prev, age: 'Age must be a number' }));
      return false;
    }
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 16) {
      setErrors(prev => ({ ...prev, age: 'You must be at least 16 years old to apply' }));
      return false;
    }
    
    if (ageNum >= 100) {
      setErrors(prev => ({ ...prev, age: 'Please enter a valid age' }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, age: '' }));
    return true;
  }, []);
  
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    if (!formData.position) {
      newErrors.position = 'Please select a position';
      isValid = false;
    }
    
    currentQuestions.forEach(question => {
      const fieldName = question.id as keyof typeof formData;
      const value = formData[fieldName] as string;
      
      if (question.required && !value.trim()) {
        newErrors[fieldName] = `${question.label} is required`;
        isValid = false;
      }
      
      if (fieldName === 'email' && value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
      }
      
      if (fieldName === 'age' && value) {
        const ageNum = parseInt(value);
        if (isNaN(ageNum) || ageNum < 16 || ageNum >= 100) {
          newErrors.age = 'You must be at least 16 years old to apply';
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [formData, currentQuestions]);

  // Helper function to truncate text to fit Discord limits
  const truncateText = (text: string, maxLength: number = 1024): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  // Helper function to split fields into chunks of 24 (leaving room for the position field)
  const chunkFields = (fields: any[], chunkSize: number = 24) => {
    const chunks = [];
    for (let i = 0; i < fields.length; i += chunkSize) {
      chunks.push(fields.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasReadGuidelines) {
      setError('You must read the application guidelines before submitting. Please visit the "Read Before Applying" page first.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (!validateForm()) {
      setError('Please fill in all required fields correctly');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      
      const questions = roleQuestions[formData.position as keyof typeof roleQuestions] || [];
      
      // Build all fields
      const allFields = questions.map(question => {
        const fieldName = question.id as keyof typeof formData;
        const fieldValue = formData[fieldName] as string;
        
        return {
          name: truncateText(question.label, 256), // Discord field name limit
          value: truncateText(fieldValue || "Not provided", 1024), // Discord field value limit
          inline: false
        };
      });
      
      // Chunk fields to respect Discord's 25 field limit
      const fieldChunks = chunkFields(allFields, 24);
      
      let embedColor;
      let embedTitle;
      
      switch(formData.position) {
        case 'Developer':
          embedColor = 0x00FFFF;
          embedTitle = "New Developer Application";
          break;
        case 'Media/YouTuber':
          embedColor = 0xFF0000;
          embedTitle = "New Media/YouTuber Application";
          break;
        case 'Staff':
          embedColor = 0xFFFF00;
          embedTitle = "New Staff Application";
          break;
        case 'Partner':
          embedColor = 0xFF69B4;
          embedTitle = "New Partnership Application";
          break;
        case 'Builder':
          embedColor = 0x00FF00;
          embedTitle = "New Builder Application";
          break;
        default:
          embedColor = 0x9B59B6;
          embedTitle = `New ${formData.position} Application`;
      }
      
      // Create embeds
      const embeds = fieldChunks.map((chunk, index) => {
        const isFirstEmbed = index === 0;
        const isLastEmbed = index === fieldChunks.length - 1;
        
        return {
          title: isFirstEmbed ? embedTitle : `${embedTitle} (Part ${index + 1})`,
          color: embedColor,
          fields: [
            ...(isFirstEmbed ? [{
              name: "Position",
              value: formData.position,
              inline: false
            }] : []),
            ...chunk
          ],
          ...(isLastEmbed ? {
            timestamp: new Date().toISOString(),
            footer: {
              text: `Applicant: ${formData.ign}`
            }
          } : {})
        };
      });
      
      // Send to Discord webhook
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📋 **New ${formData.position} Application Received**`,
          embeds: embeds
        })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Discord webhook error:', errorText);
        throw new Error('Failed to submit application. Please try again.');
      }
      
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
        contribution: '',
        dateOfBirth: '',
        gender: '',
        country: '',
        punished: '',
        discordCalls: '',
        recordVideos: '',
        disabilities: '',
        otherAccounts: '',
        sharedAccounts: '',
        usedOthersAccounts: '',
        accessToOthersAccounts: '',
        motivation: '',
        experienceSkills: '',
        hobbies: '',
        bestMemory: '',
        strength: '',
        weakness: '',
        whyAccept: '',
        scenario1: '',
        scenario2: '',
        scenario3: '',
        scenario4: '',
        primaryMotivation: '',
        timeCommitment: ''
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        navigate('/apply');
      }, 5000);
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm, navigate, hasReadGuidelines]);

  return (
    <div className="min-h-[70vh] py-8 px-4 sm:py-12 sm:px-6 bg-black">
      <div className="max-w-4xl mx-auto bg-black">
        <Link to="/apply" className="inline-flex items-center gap-2 text-white/70 hover:text-purple-400 transition-colors mb-6 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Applications</span>
        </Link>

        {success && (
          <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg shadow-xl shadow-green-500/10 mb-6 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-7 w-7 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-green-400 font-bold text-xl mb-2">Application Submitted Successfully! 🎉</h3>
                <p className="text-white/80 mb-2">
                  Thank you for applying to Fusion Network! We've received your application and our team will review it carefully.
                </p>
                <p className="text-white/70 text-sm">
                  You'll receive a response via email or Discord within 3-5 business days. Redirecting you back...
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg shadow-xl shadow-red-500/10 mb-6 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-xl mb-1">Submission Failed</h3>
                <p className="text-white/80">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!success && (
          <>
            <div className="mb-8 bg-black">
              <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-3">
                {formData.position ? `${formData.position} Application` : 'Submit Your Application'}
              </h1>
              <p className="text-white/60 text-lg">
                Fill out the form below to join the Fusion Network team. All fields marked with an asterisk (*) are required.
              </p>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3"></div>
            </div>

            {!hasReadGuidelines && (
              <div className="bg-purple-900/20 border-2 border-purple-500/50 rounded-lg shadow-xl mb-6 p-5">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-purple-400 font-bold mb-1">Guidelines Required</h3>
                    <p className="text-white/90 text-sm mb-3">
                      You must read the application guidelines before submitting your application.
                    </p>
                    <Link to="/apply/guidelines">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                        Read Guidelines First →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-900/20 border-2 border-purple-500/50 rounded-lg shadow-xl backdrop-blur-sm mb-8 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">⚠️</span>
                <div>
                  <h3 className="text-purple-300 font-bold mb-1">Important Reminder</h3>
                  <p className="text-white/90 text-sm">
                    All applications must be written personally by you. AI-generated or copied content will result in automatic disqualification.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-black">
              <div className="bg-gradient-to-br from-[#1A1D24] to-[#151821] border-2 border-white/10 shadow-xl rounded-lg p-6">
                <div className="mb-4">
                  <h3 className="font-semibold tracking-tight text-white text-2xl flex items-center gap-2 mb-2">
                    Select Position
                    <span className="text-red-400">*</span>
                  </h3>
                  <p className="text-white/60 text-base mb-4">Choose the position you're applying for</p>
                  <Select value={formData.position} onValueChange={(value) => handleSelectChange('position', value)}>
                    <SelectTrigger className={`bg-[#23272f] border-white/20 text-white h-12 text-base ${errors.position ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#23272f] text-white border-white/20">
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos} className="text-base bg-[#23272f] text-white focus:bg-[#2A2E38] focus:text-white">{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.position && <p className="text-red-400 text-sm mt-2 font-medium">{errors.position}</p>}
                </div>
              </div>

              {formData.position && currentQuestions.length > 0 && (
                <div className="bg-gradient-to-br from-[#1A1D24] to-[#151821] border-2 border-white/10 shadow-xl rounded-lg p-6">
                  <div className="mb-6">
                    <h3 className="font-semibold tracking-tight text-white text-2xl mb-2">
                      {formData.position} Application Questions
                    </h3>
                    <p className="text-white/60 text-base">Please answer all questions thoroughly and honestly</p>
                  </div>
                  <div className="space-y-6">
                    {currentQuestions.map((question) => {
                      const fieldName = question.id as keyof typeof formData;
                      const fieldError = errors[fieldName];
                      
                      return (
                        <div key={question.id} className="space-y-2">
                          <Label htmlFor={question.id} className="text-white font-semibold text-base">
                            {question.label}
                            {question.required && <span className="text-red-400 ml-1">*</span>}
                          </Label>
                          
                          {question.type === 'select' ? (
                            <Select value={formData[fieldName] as string} onValueChange={(value) => handleSelectChange(fieldName, value)}>
                              <SelectTrigger className={`bg-[#23272f] border-white/20 text-white h-12 ${fieldError ? 'border-red-500' : ''}`}>
                                <SelectValue placeholder={question.placeholder} />
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px] bg-[#23272f] text-white border-white/20">
                                <SelectScrollUpButton className="bg-[#23272f]" />
                                {question.id === 'timezone' ? (
                                  timezones.map((tz) => (
                                    <SelectItem key={tz} value={tz} className="bg-[#23272f] text-white focus:bg-[#2A2E38] focus:text-white">{tz}</SelectItem>
                                  ))
                                ) : (
                                  question.options?.map((opt) => (
                                    <SelectItem key={opt} value={opt} className="bg-[#23272f] text-white focus:bg-[#2A2E38] focus:text-white">{opt}</SelectItem>
                                  ))
                                )}
                                <SelectScrollDownButton className="bg-[#23272f]" />
                              </SelectContent>
                            </Select>
                          ) : question.type === 'textarea' ? (
                            <Textarea
                              id={question.id}
                              name={question.id}
                              value={formData[fieldName] as string}
                              onChange={handleChange}
                              placeholder={question.placeholder}
                              className={`bg-[#23272f] border-white/20 text-white min-h-[140px] resize-y text-base ${fieldError ? 'border-red-500' : ''}`}
                            />
                          ) : question.type === 'date' ? (
                            <Input
                              id={question.id}
                              name={question.id}
                              type="date"
                              value={formData[fieldName] as string}
                              onChange={handleChange}
                              className={`bg-[#23272f] border-white/20 text-white h-12 text-base ${fieldError ? 'border-red-500' : ''}`}
                            />
                          ) : (
                            <Input
                              id={question.id}
                              name={question.id}
                              type={question.type}
                              value={formData[fieldName] as string}
                              onChange={handleChange}
                              onBlur={() => {
                                if (question.id === 'email') validateEmail(formData[fieldName] as string);
                                if (question.id === 'age') validateAge(formData[fieldName] as string);
                              }}
                              placeholder={question.placeholder}
                              className={`bg-[#23272f] border-white/20 text-white h-12 text-base ${fieldError ? 'border-red-500' : ''}`}
                            />
                          )}
                          
                          {fieldError && <p className="text-red-400 text-sm font-medium">{fieldError}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {formData.position && (
                <div className="bg-gradient-to-br from-[#1A1D24] to-[#151821] border-2 border-white/10 shadow-xl rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={loading || !hasReadGuidelines}
                      className="flex-1 font-bold text-base py-7 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 transition-all text-white"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                    <Link to="/apply" className="sm:w-auto">
                      <Button type="button" variant="outline" className="w-full sm:w-auto py-7 bg-transparent border-white/30 text-white hover:bg-white/10 font-semibold">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                  <p className="text-white/50 text-sm text-center mt-4">
                    By submitting this application, you confirm that all information provided is accurate and truthful.
                  </p>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}