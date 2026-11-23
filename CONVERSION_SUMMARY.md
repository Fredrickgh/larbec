# Larbec International Academy Website - Conversion Summary

## Completed Updates

✅ **All website files have been successfully converted from HMS (Hybrid Montessori School) to Larbec International Academy**

### Files Updated:

1. **index.html** - Main homepage
   - Converted all HMS branding to Larbec International Academy
   - Updated hero section, about section, academics, facilities, and contact information
   - Updated images to use larbec piccs and pics folders
   - Updated contact info with Larbec details

2. **academics.html** - Academics page
   - Updated page title and hero section
   - Converted nav tabs to match Larbec programs (Crèche, Kindergarten, Primary, JHS, STEM, Facilities)
   - Updated all curriculum content references

3. **admission.html** - Admissions page
   - Updated title, hero section, and application form
   - Changed location placeholder to "Atonsu-Fabi, Kumasi"
   - Updated all reference codes from HMS format to Larbec format

4. **gallery.html** - Gallery page
   - Updated title and branding
   - Corrected all image paths to use larbec piccs and pics folders
   - Updated gallery descriptions

5. **admin-portal.html** - Admin portal
   - Updated portal branding and titles
   - Updated all email templates and correspondence
   - Updated location references
   - Updated contact information

6. **student-portal.html** - Student portal
   - Updated branding and portal titles
   - Updated contact information and references

7. **firebase.js** - Backend configuration
   - Already configured with placeholders for:
     - Firebase credentials (API Key, Auth Domain, Database URL, etc.)
     - Formspree integration for email submissions
   - Instructions included for setting up both services

### Key Changes Made:

**School Information:**
- School Name: "Hybrid Montessori School" → "Larbec International Academy"
- Location: "Aputuogya, Ashanti Region" → "Atonsu-Fabi, Off Lake Road, Kumasi"
- Founded: 2012 → 2015

**Contact Information:**
- Main Phone: +233 26 643 4973
- Admissions Phone: +233 55 083 8300
- General Email: info@larbec.edu.gh
- Admissions Email: admissions@larbec.edu.gh

**Website Images:**
- All image references updated to use available images from:
  - `larbec piccs/` folder (for school photos and branding)
  - `pics/` folder (for facilities photos)

**Internal References:**
- Session storage variable: `hmsInternalNav` → `larbecInternalNav`
- Email subject lines updated
- All footer and header references updated

### Next Steps - User Must Provide:

1. **Firebase Setup:**
   - Go to https://console.firebase.google.com
   - Create a project for Larbec International Academy
   - Enable Realtime Database & Storage
   - Replace placeholders in firebase.js:
     - YOUR_API_KEY
     - YOUR_PROJECT_ID
     - YOUR_SENDER_ID
     - YOUR_APP_ID

2. **Formspree Email Integration:**
   - Go to https://formspree.io
   - Create a FREE account
   - Create new forms for:
     - Contact form: destination email info@larbec.edu.gh
     - Admissions form: destination email admissions@larbec.edu.gh
   - Copy the 8-character form IDs
   - Replace placeholder: YOUR_FORMSPREE_ID_HERE with actual IDs in HTML files

3. **Optional EmailJS Setup:**
   - For automated thank-you emails to applicants
   - Create account at https://www.emailjs.com
   - Configure service and templates
   - Add EmailJS credentials to admin-portal.html

### File Structure Notes:

The website maintains the same functionality as HMS but now represents Larbec International Academy:
- Homepage with hero, about, academics, facilities, reviews, news, and contact
- Academics page with program details
- Admissions page with multi-step application form
- Gallery with school photos
- Student and Admin portals for management

All images should be sourced from:
- `larbec piccs/` folder (primary branding and student photos)
- `pics/` folder (facility photos: library, labs, sports, etc.)

---
**Conversion Completed:** 2026-06-10
**Status:** Ready for Firebase and Email Configuration
