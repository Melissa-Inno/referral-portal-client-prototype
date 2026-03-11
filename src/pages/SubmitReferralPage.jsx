import { useState } from 'react';
import { Upload, FileText, X, Star, CheckCircle2, ArrowLeft, ArrowRight, LayoutDashboard, Clock } from 'lucide-react';
import { dentists } from '../data/sampleData';
import { useNavigate, useLocation } from 'react-router-dom';

const STEPS = ['Upload File', 'Select Dentist', 'Review & Send'];

function generateRefId() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `REF-2026-${num}`;
}

export default function SubmitReferralPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-select dentist if navigated from a dentist profile
  const preSelected = location.state?.dentist ?? null;

  const [step, setStep] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState(preSelected);
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refId] = useState(generateRefId);

  const filtered = dentists.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  function reset() {
    setSubmitted(false);
    setStep(0);
    setFileUploaded(false);
    setSelectedDentist(null);
    setSearch('');
    setNotes('');
  }

  const canContinue =
    (step === 0 && fileUploaded) ||
    (step === 1 && selectedDentist) ||
    step === 2;

  if (submitted) {
    return (
      <div className="card success-card">
        <div className="success-card__icon"><CheckCircle2 size={28} /></div>
        <div className="success-card__title">Referral Submitted!</div>
        <div className="success-card__sub">Your referral has been sent to {selectedDentist?.name}</div>
        <div className="success-card__id">{refId}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard size={14} /> Dashboard
          </button>
          <button className="btn btn-secondary" onClick={reset}>Submit Another</button>
          <button className="btn btn-primary" onClick={() => navigate('/history')}>
            <Clock size={14} /> View History
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="page-title">Submit Referral</div>
        <div className="page-subtitle">
          Follow the steps below to send a patient referral.
          {preSelected && (
            <span style={{ marginLeft: 8, color: 'var(--accent-text)', fontWeight: 600 }}>
              Pre-selected: {preSelected.name}
            </span>
          )}
        </div>
      </div>

      {/* Wizard step indicator */}
      <div className="wizard-steps">
        {STEPS.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : undefined }}>
            <div className={`wizard-step${i < step ? ' done' : i === step ? ' active' : ''}`}>
              <div className="wizard-step__num">
                {i < step ? <CheckCircle2 size={13} /> : i + 1}
              </div>
              <span className="wizard-step__label">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`wizard-step__line${i < step ? ' done' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step card */}
      <div className="card">
        <div className="card-body" style={{ padding: 28 }}>
          {step === 0 && (
            <StepUpload fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
          )}
          {step === 1 && (
            <StepSelectDentist
              search={search}
              setSearch={setSearch}
              filtered={filtered}
              selectedDentist={selectedDentist}
              setSelectedDentist={setSelectedDentist}
            />
          )}
          {step === 2 && (
            <StepReview
              selectedDentist={selectedDentist}
              notes={notes}
              setNotes={setNotes}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        {step > 0 ? (
          <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>
            <ArrowLeft size={14} /> Back
          </button>
        ) : (
          <div />
        )}
        {step < 2 ? (
          <button
            className="btn btn-primary"
            disabled={!canContinue}
            onClick={() => setStep(s => s + 1)}
          >
            Continue <ArrowRight size={14} />
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setSubmitted(true)}>
            <CheckCircle2 size={14} /> Submit Referral
          </button>
        )}
      </div>
    </>
  );
}

/* ── Step 1: Upload ── */
function StepUpload({ fileUploaded, setFileUploaded }) {
  return (
    <div>
      <div className="wizard-step-content__title">Upload Patient File</div>
      <div className="wizard-step-content__sub">
        Attach the patient's dental records, X-rays, or relevant documents (PDF, JPEG, PNG · Max 20 MB).
      </div>
      {!fileUploaded ? (
        <div className="dropzone" onClick={() => setFileUploaded(true)}>
          <div className="dropzone__icon"><Upload size={32} /></div>
          <div className="dropzone__title">Click to upload patient records</div>
          <div className="dropzone__sub">or drag and drop here</div>
        </div>
      ) : (
        <div className="file-preview">
          <div className="file-preview__icon"><FileText size={20} /></div>
          <div>
            <div className="file-preview__name">patient_records_2026.pdf</div>
            <div className="file-preview__size">2.4 MB · Ready to send</div>
          </div>
          <button className="file-preview__remove" onClick={() => setFileUploaded(false)} title="Remove file">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Step 2: Select Dentist ── */
function StepSelectDentist({ search, setSearch, filtered, selectedDentist, setSelectedDentist }) {
  return (
    <div>
      <div className="wizard-step-content__title">Select Receiving Dentist</div>
      <div className="wizard-step-content__sub">
        Choose a verified specialist from your network to receive this referral.
        {selectedDentist && (
          <span style={{ marginLeft: 6, color: 'var(--success)', fontWeight: 600 }}>
            · {selectedDentist.name} selected
          </span>
        )}
      </div>
      <input
        className="input"
        placeholder="Search by name or specialty…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <div className="dentist-search-list">
        {filtered.length === 0 && (
          <div className="empty-state" style={{ padding: '24px' }}>
            <p>No dentists match your search.</p>
          </div>
        )}
        {filtered.map(d => (
          <div
            key={d.id}
            className={`dentist-select-card${selectedDentist?.id === d.id ? ' selected' : ''}`}
            onClick={() => setSelectedDentist(d)}
          >
            <div className="avatar">{d.initials}</div>
            <div className="dentist-select-card__info">
              <div className="dentist-select-card__name">{d.name}</div>
              <div className="dentist-select-card__meta">{d.specialty} · {d.city}</div>
            </div>
            <div className="dentist-select-card__rating">
              <Star size={12} fill="currentColor" /> {d.rating}
            </div>
            {selectedDentist?.id === d.id && (
              <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3: Review ── */
function StepReview({ selectedDentist, notes, setNotes }) {
  return (
    <div>
      <div className="wizard-step-content__title">Review & Send</div>
      <div className="wizard-step-content__sub">
        Confirm the referral details below, then submit.
      </div>

      <div className="review-summary">
        <div className="review-summary__row">
          <span className="review-summary__label">Patient File</span>
          <span className="review-summary__value">
            <FileText size={14} style={{ color: 'var(--accent)' }} />
            patient_records_2026.pdf
          </span>
        </div>
        <div className="review-summary__row">
          <span className="review-summary__label">Referred To</span>
          <span className="review-summary__value">
            <div className="avatar" style={{ width: 22, height: 22, fontSize: 9 }}>{selectedDentist?.initials}</div>
            {selectedDentist?.name}
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>· {selectedDentist?.specialty}</span>
          </span>
        </div>
        <div className="review-summary__row">
          <span className="review-summary__label">Location</span>
          <span className="review-summary__value">{selectedDentist?.city}</span>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: 20 }}>
        <label className="form-label">Referral Notes (optional)</label>
        <textarea
          className="input"
          rows={4}
          placeholder="Include any relevant clinical notes, urgency, or instructions for the receiving dentist…"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{ resize: 'vertical' }}
        />
      </div>
    </div>
  );
}
