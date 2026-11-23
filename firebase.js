




/* ═══════════════════════════════════════════════════════════════════════
   LARBEC INTERNATIONAL ACADEMY — FIREBASE CONFIG & SHARED UTILITIES
   firebase.js  ·  Load this file AFTER all Firebase SDK scripts
 
   FORMSPREE SETUP: ✅ CONFIGURED
   Form ID: mpqejyky  |  URL: https://formspree.io/f/mpqejyky
   Main admissions notifications will be sent to: kofigyansah@gmail.com
   
   HOW TO SET UP FIREBASE:
   1. Go to https://console.firebase.google.com
   2. Create a project → enable Realtime Database & Storage
   3. Replace all YOUR_... placeholders below with your real credentials
   ═══════════════════════════════════════════════════════════════════════ */

if (window.__LARBEC_FIREBASE_LOADED__) {
  console.warn('firebase.js already loaded – skipping.');
} else {
  window.__LARBEC_FIREBASE_LOADED__ = true;

  /* ── 1. FIREBASE CONFIG ─────────────────────────────────────────────── */
  const firebaseConfig = {
    apiKey: "AIzaSyCaxywVJqxr9jnLk5d8rmxC5SUoS2hrzEs",
    authDomain: "larbec-2b730.firebaseapp.com",
    databaseURL: "https://larbec-2b730-default-rtdb.firebaseio.com",
    projectId: "larbec-2b730",
    storageBucket: "larbec-2b730.firebasestorage.app",
    messagingSenderId: "33993356225",
    appId: "1:33993356225:web:d4cabc2d2f7a0f6be17540",
    measurementId: "G-YMXLDP19HK"
  };

  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  window.db = firebase.database();
  window.storage = firebase.storage();
  const db = window.db;
  const storage = window.storage;

  /* ── 2. FORMSPREE CONFIG ────────────────────────────────────────────── */
  const FORMSPREE_ID = "mpqejyky"; // Your Larbec Admissions form ID
  const SCHOOL_EMAIL = "kofigyansah@gmail.com"; // Email for school notifications

  /* ── 3. GENERATE ADMISSION CODE ─────────────────────────────────────── */
  function _genCode() {
    const yr = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `LIA-${yr}-${rand}`;
  }

  /* ── 4. DATE FORMATTER ──────────────────────────────────────────────── */
  window.formatDate = function (ts, opts) {
    if (!ts) return '—';
    const n = Number(ts);
    if (isNaN(n)) return '—';
    try {
      return new Date(n).toLocaleDateString('en-GB',
        opts || { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) { return '—'; }
  };

  /* ── 5. STATUS BADGE HTML ───────────────────────────────────────────── */
  window.statusBadge = function (status) {
    const map = {
      pending: ['sp', 'Under Review'],
      accepted: ['sa', 'Accepted'],
      rejected: ['sr', 'Rejected'],
      docs: ['sd', 'Docs Required']
    };
    const [cls, label] = map[status] || ['sp', 'Pending'];
    return `<span class="sbadge sbadge-${cls}">${label}</span>`;
  };

  /* ── 6. SAVE APPLICATION ────────────────────────────────────────────── */
  window.saveApplication = async function (data) {
    const code = _genCode();
    await db.ref('applications/' + code).set({
      ...data,
      admissionCode: code,
      status: 'pending',
      submittedAt: Date.now(),
      messages: {},
      documents: {}
    });
    console.log('✅ Application saved:', code);
    return code;
  };

  /* ── 7. UPLOAD ONE FILE ─────────────────────────────────────────────── */
  window.uploadFile = async function (code, fieldName, file) {
    if (!file) return null;
    const ext = file.name.split('.').pop().toLowerCase();
    const path = `documents/${code}/${fieldName}.${ext}`;
    const ref = storage.ref(path);
    const task = ref.put(file);

    await new Promise((resolve, reject) => {
      task.on('state_changed',
        snap => console.log(`📤 ${fieldName}: ${Math.round(snap.bytesTransferred / snap.totalBytes * 100)}%`),
        reject, resolve
      );
    });

    const url = await ref.getDownloadURL();
    await db.ref(`applications/${code}/documents/${fieldName}`).set({
      url, name: file.name, size: file.size,
      uploadedAt: Date.now(), status: 'pending'
    });
    console.log(`✅ ${fieldName} saved`);
    return url;
  };

  /* ── 8. EMAIL NOTIFICATION VIA FORMSPREE (Official Library) ────────────── */
  window.notifySchoolByEmail = async function (data, code) {
    if (!FORMSPREE_ID) {
      console.warn('⚠️ FormSpree ID not set – email skipped. See firebase.js instructions.');
      return;
    }
    const replyTo = (data.email || data.fatherEmail || data.motherEmail || data.guardianEmail || SCHOOL_EMAIL).trim();
    const body = [
      '=== NEW ADMISSION APPLICATION ===',
      `Code      : ${code}`,
      `Submitted : ${new Date().toLocaleString('en-GB')}`,
      '',
      '--- STUDENT ---',
      `Name      : ${[data.studentFirstName, data.studentMiddleName, data.studentLastName].filter(Boolean).join(' ')}`,
      `DOB       : ${data.dateOfBirth || '—'}`,
      `Gender    : ${data.gender || '—'}`,
      `Nationality: ${data.nationality || '—'}`,
      `Religion  : ${data.religion || '—'}`,
      `Allergies : ${data.allergies || 'None'}`,
      `Address   : ${data.homeAddress || '—'}`,
      `Email     : ${data.email || '—'}`,
      '',
      '--- FATHER ---',
      `Name  : ${data.fatherName || '—'}  Phone: ${data.fatherPhone || '—'}  Email: ${data.fatherEmail || '—'}`,
      '',
      '--- MOTHER ---',
      `Name  : ${data.motherName || '—'}  Phone: ${data.motherPhone || '—'}  Email: ${data.motherEmail || '—'}`,
      '',
      '--- ACADEMIC ---',
      `Class   : ${data.classApplied || '—'}`,
      `Year    : ${data.academicYear || '—'}`,
      `Mode    : ${data.learningMode || '—'}`,
      `Prev.   : ${data.previousSchool || '—'}`,
      `Source  : ${data.heardFrom || '—'}`,
      '',
      `Portal login: LIA code ${code}  or email ${data.email || data.fatherEmail || data.motherEmail || '—'}`
    ].join('\n');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `📋 New LIA Application – ${data.studentFirstName || ''} ${data.studentLastName || ''} (${code})`,
          _to: SCHOOL_EMAIL,
          _replyto: replyTo,
          message: body,
          admission_code: code,
          student_name: `${data.studentFirstName || ''} ${data.studentLastName || ''}`.trim(),
          class_applied: data.classApplied || '—',
          contact_email: replyTo
        })
      });
      const json = await res.json();
      if (json.ok) {
        console.log('✅ School notification email sent!');
        window.showToast('Application submitted! Confirmation sent to admissions.', 'success');
      } else {
        console.error('❌ FormSpree error:', JSON.stringify(json));
        window.showToast('⚠️ Email notification issue – application saved.', 'warning');
      }
    } catch (e) {
      console.error('❌ Email notification error:', e.message);
      window.showToast('Application saved. Email notification pending.', 'info');
    }
  };

  /* ── 9. THANK YOU EMAIL TO APPLICANT ────────────────────────────────── */
  window.notifyApplicantByEmail = async function (data, code) {
    if (!FORMSPREE_ID) {
      console.warn('⚠️ FormSpree ID not set – email skipped. See firebase.js instructions.');
      return;
    }
    const applicantEmail = data.email;
    if (!applicantEmail) {
      console.warn('⚠️ No applicant email found – thank you email skipped.');
      return;
    }
    const studentName = [data.studentFirstName, data.studentMiddleName, data.studentLastName].filter(Boolean).join(' ');
    const body = [
      'Dear Parent/Guardian,',
      '',
      `Thank you for submitting your application to Larbec International Academy.`,
      '',
      `We have received your application for ${studentName} for ${data.classApplied || 'admission'}.`,
      '',
      `ADMISSION CODE: ${code}`,
      '',
      'Please keep this code safe. You will use it to:',
      '• Check your application status on our student portal',
      '• Receive updates about your application',
      '• Download admission letters and documents',
      '',
      'Student Portal: https://larbec.edu.gh/student-portal.html',
      `Enter your admission code (${code}) or email address to log in.`,
      '',
      'Our admissions team will review your application and contact you shortly.',
      `Expected timeline: 5-7 working days from submission.`,
      '',
      'If you have any questions, please contact our admissions office:',
      'Email: kofigyansah@gmail.com',
      'Phone: 0244417789',
      '',
      'Warm regards,',
      'Admissions Team',
      'Larbec International Academy'
    ].join('\n');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Welcome to Larbec! Application Received – Code ${code}`,
          _to: applicantEmail,
          _replyto: SCHOOL_EMAIL,
          message: body,
          admission_code: code,
          student_name: studentName,
          class_applied: data.classApplied || '—'
        })
      });
      const json = await res.json();
      if (json.ok) {
        console.log('✅ Applicant thank you email sent to', applicantEmail);
      } else {
        console.error('❌ Applicant email error:', JSON.stringify(json));
      }
    } catch (e) {
      console.error('❌ Applicant email fetch error:', e.message);
    }
  };

  /* ── 10. FETCH BY CODE ────────────────────────────────────────────────── */
  window.getApplicationByCode = async function (code) {
    const snap = await db.ref('applications/' + code).once('value');
    return snap.exists() ? { id: code, ...snap.val() } : null;
  };

  /* ── 11. FETCH BY EMAIL ───────────────────────────────────────────────── */
  window.getApplicationByEmail = async function (email) {
    const e = (email || '').toLowerCase().trim();
    for (const field of ['parentEmail', 'fatherEmail', 'motherEmail', 'email']) {
      const snap = await db.ref('applications').orderByChild(field).equalTo(e).once('value');
      if (snap.exists()) {
        let found = null;
        snap.forEach(c => { found = { id: c.key, ...c.val() }; });
        return found;
      }
    }
    return null;
  };

  /* ── 11-14. FIREBASE WRITE HELPERS ──────────────────────────────────── */
  window.updateStatus = async (code, status, note) =>
    db.ref('applications/' + code).update({ status, statusNote: note || '', updatedAt: Date.now() });

  window.sendMessageToStudent = async (code, subject, body) =>
    db.ref('applications/' + code + '/messages').push({ subject, body, from: 'Admin', sentAt: Date.now(), read: false });

  window.markMessageRead = async (code, msgId) =>
    db.ref(`applications/${code}/messages/${msgId}/read`).set(true);

  window.updateDocStatus = async (code, fieldName, status, reason) =>
    db.ref(`applications/${code}/documents/${fieldName}`).update({ status, reason: reason || '' });

  /* ── 15. UI HELPERS ─────────────────────────────────────────────────── */
  window.showToast = function (msg, type) {
    const t = document.getElementById('toast');
    if (!t) return;
    const ico = t.querySelector('i');
    if (ico) ico.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    const sp = document.getElementById('toast-msg');
    if (sp) sp.textContent = msg;
    t.className = `toast ${type || 'info'} show`;
    setTimeout(() => t.classList.remove('show'), 3800);
  };

  window.openModal = function (html) {
    const c = document.getElementById('modal-content');
    if (c) c.innerHTML = html;
    document.getElementById('modal-overlay')?.classList.add('open');
  };
  window.closeModal = () => document.getElementById('modal-overlay')?.classList.remove('open');

  window.handleFileChange = function (inputId, boxId) {
    const f = document.getElementById(inputId)?.files?.[0];
    const box = document.getElementById(boxId);
    if (!f || !box) return;
    box.classList.add('file-done');
    const ps = box.querySelectorAll('p');
    if (ps[0]) ps[0].innerHTML = `<strong style="color:var(--success)"><i class="fas fa-check"></i> ${f.name}</strong>`;
    if (ps[1]) ps[1].textContent = (f.size / 1024).toFixed(0) + ' KB';
  };

  console.log('✅ firebase.js ready — Larbec International Academy');
}

