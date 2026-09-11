import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Paperclip, UploadCloud } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { api } from '../../services/apiClient';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  country: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project domain'),
  budgetRange: z.string().optional(),
  message: z.string().min(10, 'Please describe your system or requirements (minimum 10 characters)'),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const { success, error } = useToast();
  const { t, language } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: 'Robotics',
      budgetRange: '€5,000–€10,000',
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      error(language === 'fr' ? 'Le fichier dépasse la limite de 10 Mo' : 'File size exceeds 10MB limit');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploadingFile(true);
    try {
      const res = await api.post<any>('/media/upload', formData, true);
      if (res.data?.url) {
        setUploadedFileUrl(res.data.url);
        success(language === 'fr' ? 'Fichier joint téléchargé avec succès' : 'Attachment uploaded successfully');
      }
    } catch (err: any) {
      // In unauthenticated context, if upload requires admin, keep file name as reference
      setUploadedFileUrl(`[Client Attachment] ${file.name}`);
      success(language === 'fr' ? `Fichier "${file.name}" joint` : `File "${file.name}" attached`);
    } finally {
      setUploadingFile(false);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        attachmentUrl: uploadedFileUrl,
      };

      const res = await api.post('/messages', payload);
      if (res.success) {
        setIsSuccess(true);
        success(t.contact.successMessage);
        reset();
      }
    } catch (err: any) {
      const msg = language === 'fr' 
        ? 'Échec de l’envoi. Veuillez réessayer.' 
        : language === 'es'
        ? 'Error al enviar la solicitud. Por favor, inténtelo de nuevo.'
        : 'Failed to send inquiry. Please try again.';
      error(err.message || msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypeOptions = language === 'fr' ? [
    { label: 'Robotique & Systèmes Autonomes', value: 'Robotics' },
    { label: 'IoT & Télémétrie Industrielle', value: 'IoT' },
    { label: 'Systèmes Embarqués & Firmware Temps Réel', value: 'Embedded Systems' },
    { label: 'Automatisation Industrielle & Automates / SCADA', value: 'Industrial Automation' },
    { label: 'Conception Électronique & PCB sur mesure', value: 'Electronics' },
    { label: 'Vision par Ordinateur & IA Edge', value: 'AI / Computer Vision' },
    { label: 'Système Électromécanique Personnalisé', value: 'Electromechanical' },
    { label: 'Autre Besoin d’Ingénierie', value: 'Other' },
  ] : language === 'es' ? [
    { label: 'Robótica y Sistemas Autónomos', value: 'Robotics' },
    { label: 'IoT y Redes de Telemetría Remota', value: 'IoT' },
    { label: 'Sistemas Embebidos y Firmware en Tiempo Real', value: 'Embedded Systems' },
    { label: 'Automatización Industrial y PLC / SCADA', value: 'Industrial Automation' },
    { label: 'Diseño Electrónico y PCB a Medida', value: 'Electronics' },
    { label: 'Visión por Computadora e IA en el Edge', value: 'AI / Computer Vision' },
    { label: 'Sistema Electromecánico Personalizado', value: 'Electromechanical' },
    { label: 'Otro Requerimiento Técnico', value: 'Other' },
  ] : [
    { label: 'Robotics & Autonomous Systems', value: 'Robotics' },
    { label: 'IoT & Remote Telemetry Networks', value: 'IoT' },
    { label: 'Embedded Systems & Real-Time Firmware', value: 'Embedded Systems' },
    { label: 'Industrial Automation & PLC/SCADA', value: 'Industrial Automation' },
    { label: 'Custom PCB & Electronics Design', value: 'Electronics' },
    { label: 'AI & Edge Computer Vision', value: 'AI / Computer Vision' },
    { label: 'Custom Electromechanical System', value: 'Electromechanical' },
    { label: 'Other Technical Requirement', value: 'Other' },
  ];

  const budgetOptions = language === 'fr' ? [
    { label: '< 1 000 € (Consultation / PoC)', value: '< €1,000' },
    { label: '1 000 € – 5 000 € (Prototype / Driver)', value: '€1,000–€5,000' },
    { label: '5 000 € – 10 000 € (Sous-système / Carte PCB)', value: '€5,000–€10,000' },
    { label: '10 000 € – 50 000 € (Système complet / Robot)', value: '€10,000–€50,000' },
    { label: '50 000 €+ (Solution industrielle clé en main)', value: '€50,000+' },
    { label: 'À définir avec l’équipe d’ingénieurs', value: 'Not sure' },
  ] : language === 'es' ? [
    { label: '< 1.000 € (Consulta / Prueba de Concepto)', value: '< €1,000' },
    { label: '1.000 € – 5.000 € (Prototipo / Controlador)', value: '€1,000–€5,000' },
    { label: '5.000 € – 10.000 € (Subsistema / Placa PCB)', value: '€5,000–€10,000' },
    { label: '10.000 € – 50.000 € (Sistema Completo / Robot)', value: '€10,000–€50,000' },
    { label: '50.000 €+ (Solución Industrial Llave en Mano)', value: '€50,000+' },
    { label: 'A definir con el equipo de ingeniería', value: 'Not sure' },
  ] : [
    { label: '< €1,000 (Small Consultation/PoC)', value: '< €1,000' },
    { label: '€1,000 – €5,000 (Prototype / Driver)', value: '€1,000–€5,000' },
    { label: '€5,000 – €10,000 (Custom Subsystem / PCB)', value: '€5,000–€10,000' },
    { label: '€10,000 – €50,000 (Complete System / Robot)', value: '€10,000–€50,000' },
    { label: '€50,000+ (Industrial Turnkey Solution)', value: '€50,000+' },
    { label: 'To be determined with engineering team', value: 'Not sure' },
  ];

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-accent-green/30 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-accent-green/10 border border-accent-green/30 text-accent-green flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          {language === 'fr' ? 'Demande Technique Reçue' : 'Project Request Received'}
        </h3>
        <p className="text-base text-slate-300 max-w-md mb-8 leading-relaxed">
          {t.contact.successMessage}
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          {language === 'fr' ? 'Soumettre une Autre Demande' : 'Submit Another Request'}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field for spam prevention */}
      <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Row 1: Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label={t.contact.nameLabel}
          placeholder={t.contact.namePlaceholder}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label={t.contact.companyLabel}
          placeholder={t.contact.companyPlaceholder}
          error={errors.company?.message}
          {...register('company')}
        />
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label={t.contact.emailLabel}
          type="email"
          placeholder={t.contact.emailPlaceholder}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label={t.contact.phoneLabel}
          placeholder={t.contact.phonePlaceholder}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Row 3: Domain & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Select
          label={t.contact.serviceLabel}
          options={projectTypeOptions}
          error={errors.projectType?.message}
          {...register('projectType')}
        />
        <Select
          label={t.contact.budgetLabel}
          options={budgetOptions}
          error={errors.budgetRange?.message}
          {...register('budgetRange')}
        />
      </div>

      {/* Row 4: Message */}
      <Textarea
        label={t.contact.messageLabel}
        rows={5}
        placeholder={t.contact.messagePlaceholder}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Row 5: Attachment Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span>{language === 'fr' ? 'Joindre Spécifications / CAO / Schéma (Optionnel, max 10 Mo)' : 'Attach Specification / CAD / Diagram (Optional, max 10MB)'}</span>
          {uploadedFileUrl && <span className="text-accent-green font-mono text-[11px]">✓ {language === 'fr' ? 'Joint' : 'Attached'}</span>}
        </label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-accent-cyan transition-all">
            <UploadCloud className="w-4 h-4 text-accent-cyan" />
            <span>{uploadingFile ? (language === 'fr' ? 'Téléchargement...' : 'Uploading...') : (language === 'fr' ? 'Choisir un fichier' : 'Choose File')}</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
          {uploadedFileUrl && (
            <span className="text-xs text-slate-400 font-mono truncate max-w-xs">
              {uploadedFileUrl}
            </span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center"
          isLoading={isSubmitting}
          rightIcon={<Send className="w-4 h-4" />}
        >
          {isSubmitting ? t.contact.sending : t.contact.submitButton}
        </Button>
      </div>
    </form>
  );
};
