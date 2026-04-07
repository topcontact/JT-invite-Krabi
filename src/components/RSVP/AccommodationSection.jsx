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
  const arrivalMessage = getArrivalMessage(daysBefore);
  const nextDay = getNextDay(formData.checkIn);

  return (
    <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20">
      <h4 className={`${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[300] antialiased'} text-xl text-white mb-4`}>{language === 'th' ? "ที่พัก" : "Accommodation"}</h4>
      
      {/* Wait for Group Rate Selection */}
      <div className="space-y-3 mb-4">
        <label 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onFieldChange('waitGroupRate', 'yes')}
        >
          <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${waitGroupRate === 'yes' ? 'bg-white' : ''}`}>
            {waitGroupRate === 'yes' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
          </span>
          <span className={`text-white/90 ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[300] antialiased'}`}>{language === 'th' ? "รอเข้าร่วม Group Rate" : "Wait for Group Rate"}</span>
        </label>
        <label 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onFieldChange('waitGroupRate', 'no')}
        >
          <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${waitGroupRate === 'no' ? 'bg-white' : ''}`}>
            {waitGroupRate === 'no' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
          </span>
          <span className={`text-white/90 ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[300] antialiased'}`}>{language === 'th' ? "จองด้วยตนเอง" : "Book by Self"}</span>
        </label>
      </div>

      {/* Expanded Form Fields */}
      {waitGroupRate === 'yes' && (
        <FadeIn className="space-y-4">
          {/* Name Fields with English Validation */}
          <Shake trigger={nameShake}>
            <InputField
              label={language === 'th' ? "ชื่อจริง (ภาษาอังกฤษ)" : "First Name (English)"}
              labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
              value={formData.firstName}
              onChange={(e) => onNameChange('firstName', e.target.value)}
              icon={User}
              required
            />
            <InputField
              label={language === 'th' ? "นามสกุล (ภาษาอังกฤษ)" : "Last Name (English)"}
              labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
              value={formData.lastName}
              onChange={(e) => onNameChange('lastName', e.target.value)}
              icon={User}
              required
            />
          </Shake>
          <SlideInWarning isVisible={englishWarning}>
            <span className={`${language === 'th' ? 'font-krub' : 'font-source-serif'}`}>{language === 'th' ? "⚠️ กรุณากรอกภาษาอังกฤษเท่านั้น" : "⚠️ Please fill in English only"}</span>
          </SlideInWarning>

          {/* Room Selection */}
          <InputField
            label={language === 'th' ? "จำนวนห้อง" : "Number of Rooms"}
            labelClassName={language === 'th' ? "font-krub" : "font-source-serif font-[300] antialiased"}
            type="select"
            options={[...Array.from({ length: 5 }, (_, i) => i + 1), 'แชร์ห้องกับผู้อื่น']}
            value={formData.rooms}
            onChange={(e) => onFieldChange('rooms', e.target.value)}
            icon={Home}
            required
          />

          {/* Share Room Details */}
          {formData.rooms === 'แชร์ห้องกับผู้อื่น' && (
            <FadeInExpand className="mb-4 space-y-3">
              <InputField
                label={language === 'th' ? "แชร์ห้องกับ" : "Share with"}
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
                className="!mb-0"
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
              />
              <p className={`${language === 'th' ? 'font-krub' : 'font-source-serif'} text-[10.5px] text-white/60 tracking-widest text-right absolute -bottom-6 right-0 w-full mt-1 border-t border-transparent leading-tight whitespace-nowrap overflow-visible`}>
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
  );
};

export default AccommodationSection;
