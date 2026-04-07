import { FadeInView, FadeInExpand } from '../animations/Motion';
import { useRSVPForm } from '../../hooks/useRSVPForm';
import { useRSVPValidation } from '../../hooks/useRSVPValidation';
import { useRSVPSubmission } from '../../hooks/useRSVPSubmission';
import { filterEnglishOnly } from '../../utils/formatters';
import RSVPHeader from './RSVPHeader';
import AttendingChoice from './AttendingChoice';
import ChildrenSection from './ChildrenSection';
import AccommodationSection from './AccommodationSection';
import RSVPSuccess from './RSVPSuccess';
import TicketModal from '../TicketModal';
import InputField from '../shared/InputField';
import { User, Phone, Users, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * RSVP Container Component
 * Main orchestrator for RSVP form - handles state and composes sub-components
 */
const RSVP = () => {
  const { language } = useLanguage();
  // Form state management
  const {
    formData,
    showReview,
    setShowReview,
    updateKrabi,
    handleNameChange,
    handleReview,
  } = useRSVPForm();

  // Validation state
  const { nameShake, englishWarning, handleNameValidation } = useRSVPValidation();

  // Submission state
  const { isSubmitting, isSubmitted, submitRSVP, error } = useRSVPSubmission();

  // Handle name change with validation
  const onNameChange = (field, value) => {
    handleNameValidation(value);
    updateKrabi(field, filterEnglishOnly(value));
  };

  // Show success state after submission
  if (isSubmitted) {
    return <RSVPSuccess />;
  }

  return (
    <section className="w-full pt-16 pb-32 md:pt-24 md:pb-48 px-4 md:px-8" id="rsvp">
      <FadeInView className="max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden">
        {/* Blue invitation card */}
        <div className="bg-[#1079a6] text-white">
          {/* Header */}
          <RSVPHeader />

          {/* Divider */}
          <div className="px-8 md:px-12">
            <div className="w-3/4 h-px bg-white/40 mb-10"></div>
          </div>

          {/* Attendance Selection */}
          <div className="px-8 md:px-12 pb-8">
            <AttendingChoice
              attending={formData.krabi.attending}
              onSelect={(value) => updateKrabi('attending', value)}
            />
          </div>

          {/* Basic Contact Info (shown when attending is selected) */}
          {formData.krabi.attending && (
            <FadeInExpand className="px-8 md:px-12 pb-6">
              <div className="space-y-4 [&_label]:!text-white/80 [&_input]:!bg-white/10 [&_input]:!border-white/30 [&_input]:!text-white [&_input]:placeholder:!text-white/40 [&_select]:!bg-white/10 [&_select]:!border-white/30 [&_select]:!text-white [&_svg]:!text-white/60 [&_option]:!text-navy">
                <InputField
                  label={language === 'th' ? "ชื่อเล่น" : "Nickname"}
                  labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
                  value={formData.krabi.name}
                  onChange={(e) => updateKrabi('name', e.target.value)}
                  icon={User}
                  required
                />
                <InputField
                  label={language === 'th' ? "เบอร์โทรศัพท์" : "Mobile Phone"}
                  labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
                  type="tel"
                  value={formData.krabi.phone}
                  onChange={(e) => updateKrabi('phone', e.target.value)}
                  icon={Phone}
                  required
                  inputClassName="font-source-serif"
                />
              </div>
            </FadeInExpand>
          )}

          {/* Extended Form for "Yes" */}
          {formData.krabi.attending === 'yes' && (
            <FadeInExpand className="px-8 md:px-12 pb-6">
              <div className="space-y-4 [&_label]:!text-white/80 [&_input]:!bg-white/10 [&_input]:!border-white/30 [&_input]:!text-white [&_input]:placeholder:!text-white/40 [&_select]:!bg-white/10 [&_select]:!border-white/30 [&_select]:!text-white [&_svg]:!text-white/60 [&_option]:!text-navy">
                {/* Adults Count */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full min-w-0">
                  <div className="w-full sm:w-1/2 flex min-w-0">
                    <InputField
                      label={language === 'th' ? "ผู้ใหญ่" : "Adults"}
                      labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
                      type="select"
                      options={Array.from({ length: 10 }, (_, i) => i + 1)}
                      value={formData.krabi.adults}
                      onChange={(e) => updateKrabi('adults', e.target.value)}
                      icon={Users}
                      required
                      inputClassName="font-source-serif"
                    />
                  </div>
                </div>

                {/* Children Section */}
                <ChildrenSection
                  hasChildren={formData.krabi.hasChildren}
                  childrenUnder7={formData.krabi.childrenUnder7}
                  children7To12={formData.krabi.children7To12}
                  childrenOver12={formData.krabi.childrenOver12}
                  onHasChildrenChange={(value) => updateKrabi('hasChildren', value)}
                  onFieldChange={updateKrabi}
                />

                {/* Dietary Restrictions */}
                <div className="mt-4">
                  <label className={`block text-white/80 ${language === 'th' ? 'font-krub' : 'font-source-serif font-[300] antialiased'} mb-1 text-sm uppercase tracking-wider`}>
                    {language === 'th' ? "ข้อจำกัดด้านอาหาร / ความต้องการเพิ่มเติม" : "Dietary Restrictions / Special Requirements"}
                  </label>
                  <textarea
                    className="w-full p-3 border border-white/30 rounded-lg focus:outline-none focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40"
                    rows="2"
                    value={formData.krabi.dietary}
                    onChange={(e) => updateKrabi('dietary', e.target.value)}
                  ></textarea>
                </div>

                {/* Accommodation Section */}
                <AccommodationSection
                  waitGroupRate={formData.krabi.waitGroupRate}
                  formData={formData.krabi}
                  onFieldChange={updateKrabi}
                  onNameChange={onNameChange}
                  nameShake={nameShake}
                  englishWarning={englishWarning}
                />
              </div>
            </FadeInExpand>
          )}

          {/* Message for Decline */}
          {formData.krabi.attending === 'no' && (
            <FadeInExpand className="px-8 md:px-12 pb-6">
              <label className={`block text-white/80 ${language === 'th' ? 'font-krub' : 'font-source-serif'} mb-1 text-sm uppercase tracking-wider`}>
                {language === 'th' ? "ข้อความถึงบ่าวสาว" : "Message to the Couple"}
              </label>
              <textarea
                className="w-full p-3 border border-white/30 rounded-lg focus:outline-none focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40"
                rows="2"
                placeholder={language === 'th' ? "ส่งข้อความถึงบ่าวสาว..." : "Leave a message..."}
                value={formData.krabi.message || ''}
                onChange={(e) => updateKrabi('message', e.target.value)}
              ></textarea>
            </FadeInExpand>
          )}

          {/* Submit Button */}
          <form onSubmit={handleReview} className="px-8 md:px-12 pb-12 pt-4">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-16 py-3 text-white transition-all rounded-full border border-white/50 flex items-center justify-center gap-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {language === 'th' ? "กำลังดำเนินการ..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mb-1" />
                    <span 
                      className="font-chloe text-xl uppercase tracking-[0.12em]" 
                      style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}
                    >
                      RSVP
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </FadeInView>

      {/* Confirmation Ticket Modal */}
      <TicketModal
        isOpen={showReview}
        onClose={() => setShowReview(false)}
        onConfirm={() => submitRSVP(formData.krabi)}
        data={formData.krabi}
        isSubmitting={isSubmitting}
        error={error}
      />
    </section>
  );
};

export default RSVP;
