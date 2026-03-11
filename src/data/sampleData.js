export const currentUser = {
  name: 'Dr. Sarah Mitchell',
  initials: 'SM',
  practice: 'Mitchell Family Dentistry',
  email: 's.mitchell@mitchelldental.com',
  phone: '(512) 555-0147',
  address: '4200 Medical Pkwy, Suite 310, Austin, TX',
  specialty: 'General Dentistry',
  memberSince: 'March 2024',
  renewalDate: 'March 15, 2027',
};

export const dentists = [
  {
    id: 1, name: 'Dr. James Park', initials: 'JP', practice: 'Park Orthodontics',
    specialty: 'Orthodontics', city: 'Austin, TX', rating: 4.9, referrals: 142,
    phone: '(512) 555-0182', email: 'j.park@parkortho.com',
    address: '3801 N Lamar Blvd, Suite 200, Austin, TX 78756',
    acceptingReferrals: true, yearsActive: 14,
    bio: 'Dr. James Park is a board-certified orthodontist with over 14 years of experience specializing in early intervention and complex bite correction. He completed his orthodontic residency at UT Southwestern and has been a proud SmileRoute member since 2023. His practice uses the latest digital scanning and Invisalign technology to deliver precise, comfortable treatment.',
    credentials: ['DDS — University of Texas Health Science Center', 'MS Orthodontics — UT Southwestern Medical Center', 'American Association of Orthodontists — Member', 'Texas Dental Association — Active Member'],
    reviews: [
      { author: 'Dr. Sarah Mitchell', initials: 'SM', rating: 5, date: 'Feb 2026', text: 'Dr. Park is incredibly thorough and communicates treatment progress back to us promptly. Our patients love him.' },
      { author: 'Dr. Nina Patel',     initials: 'NP', rating: 5, date: 'Jan 2026', text: 'Exceptional orthodontic care. Referrals are always acknowledged within the same day.' },
      { author: 'Dr. David Walsh',    initials: 'DW', rating: 4, date: 'Dec 2025', text: 'Professional and well-organized. Great outcomes for complex cases.' },
    ],
  },
  {
    id: 2, name: 'Dr. Lisa Chen', initials: 'LC', practice: 'Chen Periodontal Group',
    specialty: 'Periodontics', city: 'Round Rock, TX', rating: 4.8, referrals: 98,
    phone: '(512) 555-0234', email: 'l.chen@chenperio.com',
    address: '1000 N IH-35, Suite 150, Round Rock, TX 78664',
    acceptingReferrals: true, yearsActive: 9,
    bio: 'Dr. Lisa Chen is a periodontist committed to treating gum disease, placing dental implants, and helping patients achieve long-term oral health. She earned her periodontics certificate from the University of Michigan and has been practicing in the Round Rock area for 9 years. She takes a minimally invasive approach whenever possible.',
    credentials: ['DDS — Baylor College of Dentistry', 'Certificate in Periodontics — University of Michigan', 'American Academy of Periodontology — Fellow', 'SmileRoute Verified Specialist'],
    reviews: [
      { author: 'Dr. Sarah Mitchell', initials: 'SM', rating: 5, date: 'Mar 2026', text: 'Dr. Chen always provides detailed post-treatment summaries. A true professional and wonderful to refer to.' },
      { author: 'Dr. James Park',     initials: 'JP', rating: 5, date: 'Jan 2026', text: 'Outstanding periodontal care. My patients come back with glowing reports.' },
    ],
  },
  {
    id: 3, name: 'Dr. Marcus Rivera', initials: 'MR', practice: 'Capitol Oral Surgery',
    specialty: 'Oral Surgery', city: 'Austin, TX', rating: 4.9, referrals: 215,
    phone: '(512) 555-0309', email: 'm.rivera@capitoloral.com',
    address: '919 W 28th St, Suite 300, Austin, TX 78705',
    acceptingReferrals: true, yearsActive: 17,
    bio: 'Dr. Marcus Rivera is one of Austin\'s most referred oral surgeons, specializing in wisdom tooth removal, dental implants, corrective jaw surgery, and facial trauma. With 17 years in practice and over 215 referral cases handled through SmileRoute, he brings unmatched experience and efficiency to complex oral surgery cases.',
    credentials: ['DDS — Texas A&M College of Dentistry', 'MD — University of Texas Medical Branch', 'Oral & Maxillofacial Surgery Residency — Scott & White Medical Center', 'American Association of Oral & Maxillofacial Surgeons — Member'],
    reviews: [
      { author: 'Dr. Sarah Mitchell', initials: 'SM', rating: 5, date: 'Feb 2026', text: 'Dr. Rivera handles even the most complex extractions flawlessly. My patients are always in good hands.' },
      { author: 'Dr. Lisa Chen',      initials: 'LC', rating: 5, date: 'Dec 2025', text: 'Excellent surgical outcomes. Highly recommend for all oral surgery referrals.' },
      { author: 'Dr. Anita Gupta',    initials: 'AG', rating: 5, date: 'Nov 2025', text: 'The gold standard in oral surgery around Austin. Fast scheduling and thorough follow-up.' },
    ],
  },
  {
    id: 4, name: 'Dr. Anita Gupta', initials: 'AG', practice: 'Gupta Endodontics',
    specialty: 'Endodontics', city: 'Cedar Park, TX', rating: 4.7, referrals: 76,
    phone: '(512) 555-0411', email: 'a.gupta@guptaendo.com',
    address: '600 E Whitestone Blvd, Suite 125, Cedar Park, TX 78613',
    acceptingReferrals: true, yearsActive: 7,
    bio: 'Dr. Anita Gupta is a compassionate endodontist focused on saving teeth through root canal therapy, retreatments, and apicoectomies. She trained at the NYU College of Dentistry and relocated to Cedar Park to serve the growing Central Texas community. She uses operating microscopes and cone beam CT imaging for precise diagnosis and treatment.',
    credentials: ['DDS — University of Illinois at Chicago', 'Certificate in Endodontics — NYU College of Dentistry', 'American Association of Endodontists — Member', 'Texas Dental Association — Member'],
    reviews: [
      { author: 'Dr. Sarah Mitchell', initials: 'SM', rating: 5, date: 'Jan 2026', text: 'Dr. Gupta is patient-centered and technically excellent. My toughest endo cases go straight to her.' },
      { author: 'Dr. Marcus Rivera',  initials: 'MR', rating: 4, date: 'Nov 2025', text: 'Reliable and detail-oriented. Great communication throughout the referral process.' },
    ],
  },
  {
    id: 5, name: 'Dr. Robert Kim', initials: 'RK', practice: 'Lakeline Pediatric Dental',
    specialty: 'Pediatric Dentistry', city: 'Austin, TX', rating: 4.8, referrals: 189,
    phone: '(512) 555-0523', email: 'r.kim@lakelinepdx.com',
    address: '14010 N US-183, Suite 300, Austin, TX 78717',
    acceptingReferrals: true, yearsActive: 11,
    bio: 'Dr. Robert Kim has dedicated his career to creating positive dental experiences for children and teens. His kid-friendly practice uses behavior management techniques, nitrous oxide, and a welcoming environment to make every visit stress-free. He handles everything from first exams to complex pediatric restorations and works closely with referring GPs.',
    credentials: ['DDS — University of Southern California', 'Certificate in Pediatric Dentistry — Children\'s Hospital of Pittsburgh', 'American Academy of Pediatric Dentistry — Fellow', 'Board Certified Pediatric Dentist'],
    reviews: [
      { author: 'Dr. Sarah Mitchell', initials: 'SM', rating: 5, date: 'Feb 2026', text: 'Parents rave about Dr. Kim. Kids who used to be anxious now look forward to their visits.' },
      { author: 'Dr. Lisa Chen',      initials: 'LC', rating: 5, date: 'Jan 2026', text: 'The best pediatric dentist in Austin. Phenomenal chair-side manner.' },
    ],
  },
  {
    id: 6, name: 'Dr. Elena Vasquez', initials: 'EV', practice: 'Vasquez Prosthodontics',
    specialty: 'Prosthodontics', city: 'Georgetown, TX', rating: 4.6, referrals: 54,
    phone: '(512) 555-0617', email: 'e.vasquez@vasquezprostho.com',
    address: '2000 Scenic Dr, Suite 410, Georgetown, TX 78626',
    acceptingReferrals: false, yearsActive: 6,
    bio: 'Dr. Elena Vasquez specializes in full-mouth rehabilitation, implant-supported prosthetics, crowns, veneers, and complex restorative cases. Having trained at the prestigious Tufts University School of Dental Medicine, she brings an artistic eye and technical precision to every case. She is currently not accepting new referrals while on parental leave, returning May 2026.',
    credentials: ['DMD — Tufts University School of Dental Medicine', 'Certificate in Prosthodontics — Tufts University', 'American College of Prosthodontists — Member', 'SmileRoute Verified Specialist'],
    reviews: [
      { author: 'Dr. Marcus Rivera',  initials: 'MR', rating: 5, date: 'Oct 2025', text: 'Dr. Vasquez\'s implant restorations are works of art. Incredible attention to occlusion and aesthetics.' },
      { author: 'Dr. Sarah Mitchell', initials: 'SM', rating: 4, date: 'Sep 2025', text: 'Highly skilled prosthodontist. Complex cases are in very capable hands.' },
    ],
  },
];

export const sentReferrals = [
  { id: 'REF-2026-0341', patient: 'M. Johnson',  to: 'Dr. James Park',    specialty: 'Orthodontics', date: 'Mar 6, 2026',  status: 'Accepted',  notes: 'Patient has significant upper arch crowding. X-rays enclosed. Please evaluate for early intervention and advise on estimated treatment timeline.' },
  { id: 'REF-2026-0338', patient: 'K. Williams', to: 'Dr. Lisa Chen',     specialty: 'Periodontics', date: 'Mar 4, 2026',  status: 'Pending',   notes: 'Moderate generalized periodontitis. Patient reports bleeding on brushing for 3+ months. Full periodontal charting included. Urgency: moderate.' },
  { id: 'REF-2026-0325', patient: 'A. Brown',    to: 'Dr. Marcus Rivera', specialty: 'Oral Surgery', date: 'Feb 28, 2026', status: 'Completed', notes: 'Impacted lower left wisdom tooth causing recurrent pericoronitis. Recommend surgical extraction. Panoramic X-ray attached.' },
  { id: 'REF-2026-0312', patient: 'T. Davis',    to: 'Dr. Anita Gupta',   specialty: 'Endodontics',  date: 'Feb 20, 2026', status: 'Accepted',  notes: 'Symptomatic irreversible pulpitis on tooth #19. Patient in significant pain. Please prioritize scheduling. Periapical X-ray enclosed.' },
  { id: 'REF-2026-0298', patient: 'S. Garcia',   to: 'Dr. Robert Kim',    specialty: 'Pediatric',    date: 'Feb 14, 2026', status: 'Completed', notes: 'Age 7, first dental visit. High caries risk due to diet. Parent is anxious — Dr. Kim\'s approach was specifically requested. Records enclosed.' },
];

export const receivedReferrals = [
  { id: 'REF-2026-0339', patient: 'J. Thompson', from: 'Dr. David Walsh', specialty: 'General', date: 'Mar 5, 2026',  status: 'Pending',   notes: 'Patient referred for comprehensive exam and cleaning. No specific concerns noted. New patient to the area, previously seen in Dallas.' },
  { id: 'REF-2026-0330', patient: 'R. Martinez', from: 'Dr. Nina Patel',  specialty: 'General', date: 'Mar 1, 2026',  status: 'Accepted',  notes: 'Post-ortho retention check and restorative consultation. Patient completed Invisalign 6 months ago. Dr. Patel requests a full-mouth assessment.' },
  { id: 'REF-2026-0318', patient: 'C. Lee',       from: 'Dr. David Walsh', specialty: 'General', date: 'Feb 22, 2026', status: 'Completed', notes: 'Referral for second opinion on treatment plan. Patient concerned about cost of proposed restorations. Please advise on alternatives if available.' },
];

export const invoices = [
  { id: 'INV-2026-001', date: 'Mar 15, 2026', amount: '$299.00', status: 'Upcoming', description: 'Annual Membership Renewal' },
  { id: 'INV-2025-001', date: 'Mar 15, 2025', amount: '$299.00', status: 'Paid',     description: 'Annual Membership'         },
  { id: 'INV-2024-001', date: 'Mar 15, 2024', amount: '$249.00', status: 'Paid',     description: 'Annual Membership'         },
];

export const notifications = [
  { id: 1, type: 'accepted',  title: 'Referral accepted',         body: 'Dr. James Park accepted M. Johnson (REF-2026-0341)',    time: '2h ago',  read: false },
  { id: 2, type: 'received',  title: 'New referral received',     body: 'Dr. David Walsh sent J. Thompson for Periodontics',     time: '5h ago',  read: false },
  { id: 3, type: 'pending',   title: 'Referral awaiting response', body: 'K. Williams → Dr. Lisa Chen has been pending 2 days',  time: '1d ago',  read: false },
  { id: 4, type: 'completed', title: 'Referral completed',        body: 'A. Brown treated by Dr. Marcus Rivera (REF-2026-0325)', time: '3d ago',  read: true  },
  { id: 5, type: 'billing',   title: 'Renewal coming up',         body: 'Annual membership renews Mar 15, 2027 — $299.00',       time: '5d ago',  read: true  },
];

export const stats = {
  sentThisMonth: 7,
  receivedThisMonth: 3,
  pendingReview: 2,
  networkDentists: 148,
};

export const conversations = [
  {
    id: 1,
    with: { name: 'Dr. James Park', initials: 'JP', specialty: 'Orthodontics', practice: 'Park Orthodontics' },
    unread: 2,
    messages: [
      { id: 1, from: 'them', text: "Hi Dr. Mitchell, just confirming receipt of the Johnson referral (REF-2026-0341). I've reviewed the X-rays — looks like a case we can definitely help with.", time: '9:15 AM', date: 'Today' },
      { id: 2, from: 'me',   text: "Wonderful, thank you Dr. Park! The patient is quite anxious about treatment timeline. Any early estimate would be greatly appreciated.", time: '9:48 AM', date: 'Today' },
      { id: 3, from: 'them', text: "Of course. I'll schedule the initial consultation within the next week and send you a full treatment plan after the exam. Typically 18–22 months for this type of crowding.", time: '10:32 AM', date: 'Today' },
      { id: 4, from: 'them', text: "I'll have my front desk reach out to the patient tomorrow morning to set up the appointment.", time: '10:33 AM', date: 'Today' },
    ],
  },
  {
    id: 2,
    with: { name: 'Dr. Lisa Chen', initials: 'LC', specialty: 'Periodontics', practice: 'Chen Periodontal Group' },
    unread: 0,
    messages: [
      { id: 1, from: 'me',   text: "Dr. Chen, I sent over a referral for K. Williams (REF-2026-0338) — moderate periodontitis with persistent bleeding. Please let me know when you've had a chance to review.", time: '2:10 PM', date: 'Mar 4' },
      { id: 2, from: 'them', text: "Received, thank you. I'll review the charting tonight and will reach out to the patient to schedule a full periodontal evaluation. Expect 7–10 days for an opening.", time: '4:45 PM', date: 'Mar 4' },
      { id: 3, from: 'me',   text: "Perfect, that works. The patient is aware and expecting a call. Thank you!", time: '5:02 PM', date: 'Mar 4' },
    ],
  },
  {
    id: 3,
    with: { name: 'Dr. David Walsh', initials: 'DW', specialty: 'General Dentistry', practice: 'Walsh Family Dental' },
    unread: 1,
    messages: [
      { id: 1, from: 'them', text: "Hi Dr. Mitchell, I sent over a patient referral for J. Thompson (REF-2026-0339) — new to the area, needs a comprehensive exam. Let me know if you have any questions on the records.", time: '11:20 AM', date: 'Mar 5' },
      { id: 2, from: 'me',   text: "Got it, thank you Dr. Walsh! I'll have my team reach out to schedule within the week.", time: '11:55 AM', date: 'Mar 5' },
      { id: 3, from: 'them', text: "Great, appreciate it. The patient mentioned they prefer mornings if possible.", time: '12:03 PM', date: 'Mar 5' },
    ],
  },
  {
    id: 4,
    with: { name: 'Dr. Marcus Rivera', initials: 'MR', specialty: 'Oral Surgery', practice: 'Capitol Oral Surgery' },
    unread: 0,
    messages: [
      { id: 1, from: 'me',   text: "Dr. Rivera, the extraction on A. Brown went smoothly I take it? Patient reported no complications on follow-up.", time: '3:30 PM', date: 'Mar 1' },
      { id: 2, from: 'them', text: "Yes, clean extraction. No issues intraoperatively. Patient tolerated the procedure well. I've completed the case on my end — you should see the status updated in SmileRoute.", time: '4:15 PM', date: 'Mar 1' },
      { id: 3, from: 'me',   text: "Excellent! Thank you as always, Dr. Rivera. Always a pleasure referring to your team.", time: '4:22 PM', date: 'Mar 1' },
    ],
  },
  {
    id: 5,
    with: { name: 'Dr. Nina Patel', initials: 'NP', specialty: 'General Dentistry', practice: 'Patel Dental Care' },
    unread: 0,
    messages: [
      { id: 1, from: 'them', text: "Dr. Mitchell, quick question — did you happen to get R. Martinez's updated insurance information? I want to make sure we have everything before the appointment.", time: '10:05 AM', date: 'Feb 28' },
      { id: 2, from: 'me',   text: "Yes! I'll send it over right away. One moment.", time: '10:18 AM', date: 'Feb 28' },
      { id: 3, from: 'me',   text: "Sent via secure email. Let me know if anything looks off.", time: '10:21 AM', date: 'Feb 28' },
      { id: 4, from: 'them', text: "Got it, thank you! Everything looks complete. See you at the study club next week!", time: '10:35 AM', date: 'Feb 28' },
    ],
  },
];
