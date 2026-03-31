import React from 'react';
import { FadeInExpand, FadeIn } from '../animations/Motion';
import InputField from '../shared/InputField';
import { Shake, SlideInWarning } from '../animations/Motion';
import { User, Home, Users } from 'lucide-react';
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
  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const daysBefore = getDaysBeforeEvent(formData.checkIn);
  const arrivalMessage = getArrivalMessage(daysBefore);
  const nextDay = getNextDay(formData.checkIn);

  return (
    <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20">
      <h4 className="font-source-serif font-[300] text-xl text-white mb-4">Accommodation</h4>
      
      {/* Wait for Group Rate Selection */}
      <div className="space-y-3 mb-4">
        <label 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onFieldChange('waitGroupRate', 'yes')}
        >
          <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${waitGroupRate === 'yes' ? 'bg-white' : ''}`}>
            {waitGroupRate === 'yes' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
          </span>
          <span className="text-white/90 font-source-serif font-[300]">Yes, I'll wait</span>
        </label>
        <label 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onFieldChange('waitGroupRate', 'no')}
        >
          <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${waitGroupRate === 'no' ? 'bg-white' : ''}`}>
            {waitGroupRate === 'no' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
          </span>
          <span className="text-white/90 font-source-serif font-[300]">No, I'll book myself</span>
        </label>
      </div>

      {/* Expanded Form Fields */}
      {waitGroupRate === 'yes' && (
        <FadeIn className="space-y-4">
          {/* Name Fields with English Validation */}
          <Shake trigger={nameShake}>
            <InputField
              label="First Name (English)"
              value={formData.firstName}
              onChange={(e) => onNameChange('firstName', e.target.value)}
              icon={User}
              required
            />
            <InputField
              label="Last Name (English)"
              value={formData.lastName}
              onChange={(e) => onNameChange('lastName', e.target.value)}
              icon={User}
              required
            />
          </Shake>
          <SlideInWarning isVisible={englishWarning}>
            <span>⚠️</span> Please enter English characters only
          </SlideInWarning>

          {/* Room Selection */}
          <InputField
            label="Number of Rooms"
            type="select"
            options={[...Array.from({ length: 5 }, (_, i) => i + 1), 'Share room']}
            value={formData.rooms}
            onChange={(e) => onFieldChange('rooms', e.target.value)}
            icon={Home}
            required
          />

          {/* Share Room Details */}
          {formData.rooms === 'Share room' && (
            <FadeInExpand className="mb-4 space-y-3">
              <InputField
                label="Share with"
                placeholder="Enter name"
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
                <span className="font-source-serif-4-variable text-sm text-white/80">Not sure now</span>
              </label>
            </FadeInExpand>
          )}

          {/* Room Price Range */}
          <label className="block text-white/80 font-source-serif-4-variable mb-3 text-sm uppercase tracking-wider">
            Room Preference price range
          </label>
          <label className="block text-white/80 font-source-serif-4-variable mb-3 text-sm tracking-wider">
            (You can select more than one option)
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
                <span className="font-source-serif-4-variable text-white">{range}</span>
              </label>
            ))}
          </div>

          {/* Date Selection */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full min-w-0">
            <div className="w-full sm:w-1/2 flex min-w-0">
              <InputField
                label="Check-in"
                type="date"
                min={CHECKIN_MIN_DATE}
                max={CHECKIN_MAX_DATE}
                value={formData.checkIn}
                onChange={(e) => onFieldChange('checkIn', e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2 flex min-w-0 flex-col">
              <InputField
                label="Check-out"
                type="date"
                min={nextDay}
                value={formData.checkOut}
                onChange={(e) => onFieldChange('checkOut', e.target.value)}
                disabled={!formData.checkIn}
              />
              <p className="font-source-serif-4-variable text-[10px] text-white/60 font-bold uppercase tracking-widest text-right -mt-2">
                Our Wedding Day | December 4, 2026
              </p>
            </div>
          </div>

          {/* Stay Summary */}
          {formData.checkIn && formData.checkOut && (
            <div className="mt-2 text-center flex flex-col gap-1">
              <span className="text-white font-source-serif font-[300] text-lg">
                Night Stay: <span className="font-bold">{nights}</span> {nights === 1 ? 'night' : 'nights'}
              </span>
              {arrivalMessage && (
                <span className="text-sm font-source-serif-4-variable text-white/80">{arrivalMessage}</span>
              )}
            </div>
          )}
        </FadeIn>
      )}
    </div>
  );
};

export default AccommodationSection;
