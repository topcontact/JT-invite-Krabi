import React from 'react';
import { FadeInExpand, FadeIn } from '../animations/Motion';
import InputField from '../shared/InputField';
import { Shake, SlideInWarning } from '../animations/Motion';
import { User, Home, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ROOM_RANGES, CHECKIN_MAX_DATE, CHECKIN_MIN_DATE } from '../../utils/constants';
import { calculateNights, getNextDay, getDaysBeforeEvent, getArrivalMessage } from '../../utils/formatters';

/**
 * Accommodation Section Component
 * Handles room preferences, check-in/out dates, and guest details
 * 
 * @param {object} props
 * @param {string} props.waitGroupRate - 'yes' | 'no' | ''
 * @param {object} props.formData - Form data object
 * @param {function} props.onFieldChange - Field update handler
 * @param {function} props.onNameChange - Name field handler (with English validation)
 * @param {number} props.nameShake - Shake animation trigger
 * @param {boolean} props.englishWarning - Show English-only warning
 */
const AccommodationSection = ({
  waitGroupRate,
  formData,
  onFieldChange,
  onNameChange,
  nameShake,
  englishWarning,
}) => {
  const { language } = useLanguage();
  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const daysBefore = getDaysBeforeEvent(formData.checkIn);
  const arrivalMessage = getArrivalMessage(daysBefore, language);
  const nextDay = getNextDay(formData.checkIn);

  return (
    <div className="mt-6">
      <label className={`block text-white/80 ${language === 'th' ? 'font-krub' : 'font-source-serif font-[300] antialiased'} mb-1 text-sm uppercase tracking-wider`}>
        {language === 'th' ? "ที่พัก" : "Accommodation"}
      </label>
      
      {/* Accommodation Description */}
      <p className={`mb-5 text-white/70 text-sm leading-relaxed ${language === 'th' ? 'font-krub' : 'font-source-serif font-[300] antialiased'}`}>
        {language === 'th' 
          ? "เพื่อให้การพักผ่อนของท่านเป็นไปอย่างราบรื่นและสะดวกสบาย เราจะดำเนินการจัดราคาพิเศษสำหรับกลุ่ม (Group rate) และแจ้งรายละเอียดให้ท่านทราบเพื่อยืนยันอีกครั้ง" 
          : "To ensure a seamless and comfortable stay, we will arrange a special group rate and share the details with you for confirmation."}
      </p>

      <div className="p-5 bg-white/10 rounded-xl border border-white/20">
      
      {/* Wait for Group Rate Selection */}
      <div className={`space-y-3 ${waitGroupRate === 'yes' ? 'mb-4' : ''}`}>
        <label 
          className="flex items-start gap-3 cursor-pointer group" 
          onClick={() => onFieldChange('waitGroupRate', 'yes')}
        >
          <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-white transition-colors ${waitGroupRate === 'yes' ? 'bg-white border-white' : ''}`}>
            {waitGroupRate === 'yes' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
          </span>
          <span className={`text-white/90 ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[300] antialiased'} leading-snug`}>
            {language === 'th' ? "ฉันต้องการรอราคาพิเศษสำหรับกลุ่ม" : "I’d love to wait for the group rate."}
          </span>
        </label>
        <label 
          className="flex items-start gap-3 cursor-pointer group" 
          onClick={() => onFieldChange('waitGroupRate', 'no')}
        >
          <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-white transition-colors ${waitGroupRate === 'no' ? 'bg-white border-white' : ''}`}>
            {waitGroupRate === 'no' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
          </span>
          <span className={`text-white/90 ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[300] antialiased'} leading-snug`}>
            {language === 'th' ? "ฉันจะจัดการเรื่องที่พักด้วยตนเอง" : "I’ll arrange my own stay."}
          </span>
        </label>
      </div>

      {/* Expanded Form Fields */}
      {waitGroupRate === 'yes' && (
        <FadeIn className="space-y-4">
          {/* Name Fields with English Validation */}
          <Shake trigger={nameShake}>
            <InputField
              label={language === 'th' ? "ชื่อจริง (ภาษาอังกฤษเท่านั้น)" : "First Name (English only)"}
              labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
              value={formData.firstName}
              onChange={(e) => onNameChange('firstName', e.target.value)}
              placeholder={language === 'th' ? "e.g. John" : "e.g. John"}
              icon={User}
              required
            />
            <InputField
              label={language === 'th' ? "นามสกุล (ภาษาอังกฤษเท่านั้น)" : "Last Name (English only)"}
              labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
              value={formData.lastName}
              onChange={(e) => onNameChange('lastName', e.target.value)}
              placeholder={language === 'th' ? "e.g. Smith" : "e.g. Smith"}
              icon={User}
              required
            />
          </Shake>
          <SlideInWarning isVisible={englishWarning}>
            <span className={`${language === 'th' ? 'font-krub' : 'font-source-serif'}`}>{language === 'th' ? "⚠️ กรุณากรอกภาษาอังกฤษเท่านั้น" : "⚠️ Please fill in English only"}</span>
          </SlideInWarning>

          {/* Number of Rooms (Moved directly after Last Name) */}
          <div className="mb-4 pt-2">
            <InputField
              label={language === 'th' ? "จำนวนห้องที่ต้องการ" : "Number of Rooms Required"}
              labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
              type="select"
              options={[...Array.from({ length: 5 }, (_, i) => i + 1)]}
              value={formData.rooms}
              onChange={(e) => onFieldChange('rooms', e.target.value)}
              icon={Home}
              required
              inputClassName="font-source-serif"
            />
          </div>

          {/* Stay Type Selection */}
          <div className="mb-4">
            <label className={`block text-white/80 ${language === 'th' ? 'font-krub' : 'font-source-serif font-[300] antialiased'} mb-1 text-sm uppercase tracking-wider`}>
              {language === 'th' ? "คุณมีแพลนจะเข้าพักกับรูมเมทหรือไม่?" : "DO YOU HAVE PLANS TO STAY WITH A ROOMMATE?"} <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3 pt-2">
              <label 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onFieldChange('stayType', 'alone')}
              >
                <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${formData.stayType === 'alone' ? 'bg-white border-white' : ''}`}>
                  {formData.stayType === 'alone' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
                </span>
                <span className={`text-white/90 ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[300] antialiased'} leading-snug`}>
                  {language === 'th' ? "ไม่มี" : "No"}
                </span>
              </label>
              <label 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onFieldChange('stayType', 'sharing')}
              >
                <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${formData.stayType === 'sharing' ? 'bg-white border-white' : ''}`}>
                  {formData.stayType === 'sharing' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
                </span>
                <span className={`text-white/90 ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[300] antialiased'} leading-snug`}>
                  {language === 'th' ? "มี" : "Yes"}
                </span>
              </label>
            </div>
          </div>

          {/* Share Room Details */}
          {formData.stayType === 'sharing' && (
            <FadeInExpand className="mb-4 space-y-3 pt-2">
              <InputField
                label={language === 'th' ? "ให้ใส่ชื่อ:" : "Name:"}
                placeholder={language === 'th' ? "ระบุชื่อ (Enter name)" : "Enter name"}
                value={formData.shareWith}
                onChange={(e) => onFieldChange('shareWith', e.target.value)}
                icon={Users}
                disabled={formData.isShareNotSure}
                required={!formData.isShareNotSure}
              />
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.isShareNotSure}
                  onChange={(e) => {
                    onFieldChange('isShareNotSure', e.target.checked);
                    if (e.target.checked) {
                      onFieldChange('shareWith', '');
                    }
                  }}
                  className="rounded text-white focus:ring-white w-4 h-4"
                />
                <span className={`${language === 'th' ? 'font-krub' : 'font-source-serif'} text-sm text-white/80`}>{language === 'th' ? "ยังไม่แน่ใจ" : "Not sure yet"}</span>
              </label>
            </FadeInExpand>
          )}



          {/* Room Price Range */}
          <label className={`block text-white/80 ${language === 'th' ? 'font-krub' : 'font-source-serif font-[300] antialiased'} mb-3 text-sm uppercase tracking-wider`}>
            {language === 'th' ? "ช่วงราคาห้องพักที่สนใจ" : "Room Preference (Price Range)"}
          </label>
          <label className={`block text-white/80 ${language === 'th' ? 'font-krub' : 'font-source-serif font-[300] antialiased'} mb-3 text-sm tracking-wider`}>
            {language === 'th' ? "(สามารถเลือกได้มากกว่า 1 ข้อ)" : "(Select all that apply)"}
          </label>
          <div className="space-y-3">
            {ROOM_RANGES.map((range) => (
              <label key={range} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.roomRange?.includes(range) || false}
                  onChange={(e) => {
                    const currentRanges = formData.roomRange || [];
                    if (e.target.checked) {
                      onFieldChange('roomRange', [...currentRanges, range]);
                    } else {
                      onFieldChange('roomRange', currentRanges.filter(r => r !== range));
                    }
                  }}
                  className="rounded text-white focus:ring-white w-4 h-4"
                />
                <span className={`${language === 'th' ? 'font-krub' : 'font-source-serif font-[300] antialiased'} text-white`}>
                  {language === 'th' 
                    ? range 
                    : range.replace('ประมาณ', 'Est.').replace('บาท / คืน', 'Bath / Night')}
                </span>
              </label>
            ))}
          </div>

          {/* Date Selection */}
          <div className="flex flex-col sm:flex-row gap-4 items-start w-full min-w-0">
            <div className="w-full sm:w-1/2 block min-w-0">
              <InputField
                label={language === 'th' ? "วันที่เช็คอิน (Check-in)" : "Check-in Date (dd/mm/yyyy)"}
                labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
                type="date"
                min={CHECKIN_MIN_DATE}
                max={CHECKIN_MAX_DATE}
                value={formData.checkIn}
                onChange={(e) => onFieldChange('checkIn', e.target.value)}
                onFocus={(e) => {
                  if (!e.target.value) {
                    e.target.value = CHECKIN_MIN_DATE;
                    e.target.value = '';
                  }
                }}
                className="!mb-0"
                inputClassName="font-source-serif"
              />
            </div>
            <div className="w-full sm:w-1/2 block min-w-0 relative">
              <InputField
                label={language === 'th' ? "วันที่เช็คเอาท์ (Check-out)" : "Check-out Date (dd/mm/yyyy)"}
                labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
                type="date"
                min={nextDay}
                value={formData.checkOut}
                onChange={(e) => onFieldChange('checkOut', e.target.value)}
                disabled={!formData.checkIn}
                className="!mb-0"
                inputClassName="font-source-serif"
              />
              <p className={`${language === 'th' ? 'font-krub' : 'font-source-serif'} text-[11.5px] text-white/60 tracking-widest text-right absolute -bottom-6 right-0 w-full mt-1 border-t border-transparent leading-tight whitespace-nowrap overflow-visible`}>
                {language === 'th' ? "วันแต่งงาน | 4 ธันวาคม 2026" : "Wedding Day | Dec 4, 2026"}
              </p>
            </div>
          </div>
          
          {/* Spacer to absorb absolute height from Check-out row helper text relative to sibling rows */}
          <div className="w-full h-4 sm:h-5"></div>

          {/* Stay Summary */}
          {formData.checkIn && formData.checkOut && (
            <div className="mt-2 text-center flex flex-col gap-1">
              <span className={`text-white ${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[400] text-lg`}>
                {language === 'th' ? <>จำนวนคืนที่เข้าพัก: <span className="font-bold">{nights}</span> คืน</> : <>Stay duration: <span className="font-bold">{nights}</span> nights</>}
              </span>
              {arrivalMessage && (
                <span className={`text-sm ${language === 'th' ? 'font-krub' : 'font-source-serif'} text-white/80`}>{arrivalMessage}</span>
              )}
            </div>
          )}
        </FadeIn>
      )}
      </div>
    </div>
  );
};

export default AccommodationSection;
