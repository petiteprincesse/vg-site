'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { audienceTabs, contactSection, fieldsByAudience } from '@/content/contact';
import type { LeadAudience, LeadErrors, LeadPayload, LeadResponse } from '@/lib/lead';
import { captureAttribution, readAttribution } from '@/lib/attribution';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { TextArea, TextField } from '@/components/ui/Field';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import grid from '@/styles/grid.module.css';
import { cn } from '@/lib/cn';
import styles from './Contact.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const loadValidator = () => import('@/lib/lead').then((module) => module.validateLead);

const EMPTY: LeadPayload = {
  audience: 'founder',
  name: '',
  company: '',
  stage: '',
  telegram: '',
  about: '',
  request: '',
};

export function Contact() {
  const [values, setValues] = useState<LeadPayload>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<string>(contactSection.failure);
  const [website, setWebsite] = useState('');
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    captureAttribution();
  }, []);

  const fields = useMemo(() => fieldsByAudience[values.audience], [values.audience]);
  const shortFields = fields.filter((field) => !field.multiline);
  const longFields = fields.filter((field) => field.multiline);

  const setAudience = (audience: LeadAudience) => {
    setValues((current) => ({ ...current, audience }));
    setStatus('idle');
  };

  const setField = (name: keyof LeadPayload, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validateLead = await loadValidator();
    const result = validateLead(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus('idle');
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...result.data,
          meta: readAttribution(),
          website,
          startedAt: startedAt.current,
        }),
      });

      const body = (await response.json().catch(() => null)) as LeadResponse | null;

      if (response.ok && body?.ok) {
        setStatus('success');
        setValues({ ...EMPTY, audience: values.audience });
        startedAt.current = Date.now();
        return;
      }

      if (body && !body.ok && body.code === 'invalid' && Object.keys(body.errors).length > 0) {
        setErrors(body.errors);
        setFailure(contactSection.invalid);
      } else if (body && !body.ok && body.code === 'rate_limited') {
        setFailure(contactSection.rateLimited.replace('{minutes}', String(Math.ceil(body.retryAfter / 60))));
      } else {
        setFailure(contactSection.failure);
      }
      setStatus('error');
    } catch {
      setFailure(contactSection.offline);
      setStatus('error');
    }
  }

  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        eyebrow={contactSection.eyebrow}
        title={contactSection.title}
        titleLines={contactSection.title.split(' ')}
        uppercase
        className={styles.heading}
        titleClassName={styles.title}
        eyebrowClassName={styles.eyebrow}
      />

      <div className={grid.grid}>
        <Reveal className={grid.colRightHalf} y={32}>
          <form className={styles.form} onSubmit={onSubmit} onFocus={() => void loadValidator()} noValidate>
            <div className={styles.trap} aria-hidden>
              <label>
                Не заполняйте это поле
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>
            </div>

            <div className={styles.tabs} role="group" aria-label="Кто вы">
              {audienceTabs.map((tab) => (
                <Chip
                  key={tab.id}
                  active={values.audience === tab.id}
                  pillId="lead-audience"
                  onClick={() => setAudience(tab.id)}
                >
                  {tab.label}
                </Chip>
              ))}
            </div>

            <div className={styles.rows}>
              {shortFields.map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  error={errors[field.name]}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  onChange={(event) => setField(field.name, event.target.value)}
                />
              ))}
            </div>

            <div className={styles.stack}>
              {longFields.map((field) => (
                <TextArea
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  error={errors[field.name]}
                  required={field.required}
                  onChange={(event) => setField(field.name, event.target.value)}
                />
              ))}
            </div>

            <Button type="submit" block disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Отправляем…' : contactSection.submit}
            </Button>

            <p
              role="status"
              aria-live="polite"
              className={cn(styles.status, status === 'error' && styles.statusError)}
            >
              {status === 'success' ? contactSection.success : null}
              {status === 'error' ? failure : null}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
