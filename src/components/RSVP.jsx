import React from 'react';
import { Send, User, Phone, Users, Home, Calendar, Baby, ChevronDown } from 'lucide-react';
import { FadeInExpand, FadeInScale, FadeInView, FadeIn, Shake, SlideInWarning } from './animations/Motion';
import TicketModal from './TicketModal';

const InputField = ({ label, type = "text", value, onChange, placeholder, icon: Icon, required = false, disabled = false, options = [], className = "", ...props }) => (
    <div className={`mb-4 w-full min-w-0 ${disabled ? 'opacity-50' : ''} ${className}`}>
        <label className="block text-navy font-sans mb-1 text-sm uppercase tracking-wider truncate">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative w-full min-w-0">
            {Icon && <Icon className="absolute left-3 top-3 w-5 h-5 text-blue z-10 pointer-events-none" />}
            {type === 'select' ? (
                <>
                    <select
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        {...props}
                        className={`w-full min-w-0 p-3 ${Icon ? 'pl-10' : ''} pr-10 border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm appearance-none cursor-pointer ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
                    >
                        {options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-navy/50 pointer-events-none" />
                </>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    {...props}
                    className={`w-full min-w-0 p-3 ${Icon ? 'pl-10' : ''} border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm ${type === 'date' ? 'appearance-none' : ''} ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
                />
            )}
        </div>
    </div>
);

const RadioGroup = ({ label, name, options, value, onChange }) => (
    <div className="mb-6">
        <label className="block text-navy font-sans mb-2 text-sm uppercase tracking-wider">{label}</label>
        <div className="flex gap-4">
            {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => onChange(opt.value)}
                        className="text-navy focus:ring-navy"
                    />
                    <span className="font-sans text-navy">{opt.label}</span>
                </label>
            ))}
        </div>
    </div>
);

import { useRSVPForm } from '../hooks/useRSVPForm';

const RSVP = () => {
    const {
        formData,
        isSubmitted,
        isSubmitting,
        showReview,
        setShowReview,
        nameShake,
        englishWarning,
        handleNameChange,
        updateKrabi,
        handleReview,
        confirmSubmit,
        calculateNights,
        getNextDay
    } = useRSVPForm();


    if (isSubmitted) {
        return (
            <section className="pt-20 pb-40 md:pb-48 px-4" id="rsvp">
                <FadeInScale className="max-w-2xl mx-auto rounded-3xl shadow-2xl p-12 text-center text-white bg-[#1079a6]">
                    <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <Send className="w-10 h-10 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-serif text-navy mb-4">Thank You!</h2>
                    <p className="text-lg text-white/80 font-sans mb-8">
                        Your RSVP has been sent successfully. We are so excited to celebrate with you!
                    </p>
                    <p className="text-white font-instrument font-medium uppercase tracking-wider">
                        Supicha & Teerawat
                    </p>
                </FadeInScale>
            </section>
        );
    }

    return (
        <section className="pt-20 pb-40 md:pb-48 px-4" id="rsvp">
            <FadeInView className="max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden">
                {/* Blue invitation card */}
                <div className="bg-[#1079a6] text-white">
                    {/* RSVP Header */}
                    <div className="pt-12 pb-8 text-center">
                        <h2 className="text-5xl md:text-6xl font-chloe uppercase tracking-[0.12em]" style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}>RSVP</h2>
                    </div>

                    {/* Event Details */}
                    <div className="px-4 min-[400px]:px-8 md:px-12 pb-8">
                        <h3 className="font-chloe text-[12vw] md:text-[56px] lg:text-[72px] leading-[0.85] uppercase mb-8">
                            <span className="block">Krabi</span>
                            <span className="block">Ceremony</span>
                        </h3>

                        <p className="font-source-serif font-[300] antialiased text-[17px] md:text-[19px] uppercase tracking-wide mb-4 leading-relaxed">
                            The Grotto Restaurant,<br />Rayavadee Hotel, Krabi
                        </p>

                        <p className="font-source-serif font-[300] antialiased text-[17px] md:text-[19px] uppercase tracking-wide mb-6">
                            Friday, December 4, 2026
                        </p>

                        <p className="font-source-serif font-[300] antialiased text-[3.6vw] min-[480px]:text-[17px] md:text-[19px] uppercase tracking-wide mb-8 whitespace-nowrap">
                            * Kindly Respond by April 30, 2026 *
                        </p>

                        {/* Divider */}
                        <div className="w-3/4 h-px bg-white/40 mb-10"></div>

                        {/* Radio Options - Custom styled */}
                        <div className="space-y-5 mb-12">
                            <label
                                className="flex items-center gap-4 cursor-pointer group"
                                onClick={() => updateKrabi('attending', 'yes')}
                            >
                                <span className={`w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center flex-shrink-0 transition-all ${formData.krabi.attending === 'yes' ? 'bg-white' : 'group-hover:border-white'}`}>
                                    {formData.krabi.attending === 'yes' && <span className="w-3 h-3 rounded-full bg-[#1079a6]"></span>}
                                </span>
                                <span className="font-source-serif font-[300] antialiased text-xl md:text-2xl uppercase tracking-wide">
                                    Joyfully Accept
                                </span>
                            </label>

                            <label
                                className="flex items-center gap-4 cursor-pointer group"
                                onClick={() => updateKrabi('attending', 'no')}
                            >
                                <span className={`w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center flex-shrink-0 transition-all ${formData.krabi.attending === 'no' ? 'bg-white' : 'group-hover:border-white'}`}>
                                    {formData.krabi.attending === 'no' && <span className="w-3 h-3 rounded-full bg-[#1079a6]"></span>}
                                </span>
                                <span className="font-source-serif font-[300] antialiased text-xl md:text-2xl uppercase tracking-wide">
                                    Regretfully Decline
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Conditional form fields - shown on blue bg */}
                    {formData.krabi.attending && (
                        <FadeInExpand className="px-8 md:px-12 pb-6">
                            <div className="space-y-4 [&_label]:!text-white/80 [&_input]:!bg-white/10 [&_input]:!border-white/30 [&_input]:!text-white [&_input]:placeholder:!text-white/40 [&_select]:!bg-white/10 [&_select]:!border-white/30 [&_select]:!text-white [&_svg]:!text-white/60 [&_option]:!text-navy">
                                <InputField
                                    label="Nickname"
                                    value={formData.krabi.name}
                                    onChange={(e) => updateKrabi('name', e.target.value)}
                                    icon={User}
                                    required
                                />
                                <InputField
                                    label="Mobile Phone"
                                    type="tel"
                                    value={formData.krabi.phone}
                                    onChange={(e) => updateKrabi('phone', e.target.value)}
                                    icon={Phone}
                                    required
                                />
                            </div>
                        </FadeInExpand>
                    )}

                    {formData.krabi.attending === 'yes' && (
                        <FadeInExpand className="px-8 md:px-12 pb-6">
                            <div className="space-y-4 [&_label]:!text-white/80 [&_input]:!bg-white/10 [&_input]:!border-white/30 [&_input]:!text-white [&_input]:placeholder:!text-white/40 [&_select]:!bg-white/10 [&_select]:!border-white/30 [&_select]:!text-white [&_svg]:!text-white/60 [&_option]:!text-navy">
                                <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full min-w-0">
                                    <div className="w-full sm:w-1/2 flex min-w-0">
                                        <InputField
                                            label="Adults"
                                            type="select"
                                            options={Array.from({ length: 10 }, (_, i) => i + 1)}
                                            value={formData.krabi.adults}
                                            onChange={(e) => updateKrabi('adults', e.target.value)}
                                            icon={Users}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Children Section */}
                                <div className="mt-6 p-6 bg-white/10 rounded-xl border border-white/20">
                                    <h4 className="font-source-serif font-[300] text-xl text-white mb-4">Children</h4>
                                    <div className="space-y-3 mb-4">
                                        <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateKrabi('hasChildren', 'yes')}>
                                            <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${formData.krabi.hasChildren === 'yes' ? 'bg-white' : ''}`}>
                                                {formData.krabi.hasChildren === 'yes' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
                                            </span>
                                            <span className="text-white/90 font-source-serif font-[300]">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateKrabi('hasChildren', 'no')}>
                                            <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${formData.krabi.hasChildren === 'no' ? 'bg-white' : ''}`}>
                                                {formData.krabi.hasChildren === 'no' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
                                            </span>
                                            <span className="text-white/90 font-source-serif font-[300]">No</span>
                                        </label>
                                    </div>

                                    {formData.krabi.hasChildren === 'yes' && (
                                        <FadeInExpand className="space-y-4 pt-2">
                                            <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full min-w-0">
                                                <div className="w-full sm:w-1/3 flex min-w-0">
                                                    <InputField
                                                        label="Under 7 yrs"
                                                        type="select"
                                                        options={Array.from({ length: 11 }, (_, i) => i)}
                                                        value={formData.krabi.childrenUnder7}
                                                        onChange={(e) => updateKrabi('childrenUnder7', e.target.value)}
                                                        icon={Baby}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/3 flex min-w-0">
                                                    <InputField
                                                        label="7 - 12 yrs"
                                                        type="select"
                                                        options={Array.from({ length: 11 }, (_, i) => i)}
                                                        value={formData.krabi.children7To12}
                                                        onChange={(e) => updateKrabi('children7To12', e.target.value)}
                                                        icon={Baby}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/3 flex min-w-0">
                                                    <InputField
                                                        label="Over 12 yrs"
                                                        type="select"
                                                        options={Array.from({ length: 11 }, (_, i) => i)}
                                                        value={formData.krabi.childrenOver12}
                                                        onChange={(e) => updateKrabi('childrenOver12', e.target.value)}
                                                        icon={Baby}
                                                    />
                                                </div>
                                            </div>
                                        </FadeInExpand>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label className="block text-white/80 font-sans mb-1 text-sm uppercase tracking-wider">Dietary Restrictions / Additional Needs</label>
                                    <textarea
                                        className="w-full p-3 border border-white/30 rounded-lg focus:outline-none focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40"
                                        rows="2"
                                        value={formData.krabi.dietary}
                                        onChange={(e) => updateKrabi('dietary', e.target.value)}
                                    ></textarea>
                                </div>

                                {/* Accommodation Logic */}
                                <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20">
                                    <h4 className="font-source-serif font-[300] text-xl text-white mb-4">Accommodation</h4>
                                    <div className="space-y-3 mb-4">
                                        <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateKrabi('waitGroupRate', 'yes')}>
                                            <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${formData.krabi.waitGroupRate === 'yes' ? 'bg-white' : ''}`}>
                                                {formData.krabi.waitGroupRate === 'yes' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
                                            </span>
                                            <span className="text-white/90 font-source-serif font-[300]">Yes, I'll wait</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateKrabi('waitGroupRate', 'no')}>
                                            <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${formData.krabi.waitGroupRate === 'no' ? 'bg-white' : ''}`}>
                                                {formData.krabi.waitGroupRate === 'no' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
                                            </span>
                                            <span className="text-white/90 font-source-serif font-[300]">No, I'll book myself</span>
                                        </label>
                                    </div>

                                    {formData.krabi.waitGroupRate === 'yes' && (
                                        <FadeIn className="space-y-4">
                                            <div className="mb-4">
                                                <Shake trigger={nameShake}>
                                                    <InputField
                                                        label="First Name (English)"
                                                        value={formData.krabi.firstName}
                                                        onChange={(e) => handleNameChange('firstName', e.target.value)}
                                                        icon={User}
                                                        required
                                                    />
                                                    <InputField
                                                        label="Last Name (English)"
                                                        value={formData.krabi.lastName}
                                                        onChange={(e) => handleNameChange('lastName', e.target.value)}
                                                        icon={User}
                                                        required
                                                    />
                                                </Shake>
                                                <SlideInWarning isVisible={englishWarning}>
                                                    <span>⚠️</span> Please enter English characters only
                                                </SlideInWarning>
                                                <InputField
                                                    label="Number of Rooms"
                                                    type="select"
                                                    options={[...Array.from({ length: 5 }, (_, i) => i + 1), 'Share room']}
                                                    value={formData.krabi.rooms}
                                                    onChange={(e) => updateKrabi('rooms', e.target.value)}
                                                    icon={Home}
                                                    required
                                                />
                                                {formData.krabi.rooms === 'Share room' && (
                                                    <FadeInExpand className="mb-4 space-y-3">
                                                        <InputField
                                                            label="Share with"
                                                            placeholder="Enter name"
                                                            value={formData.krabi.shareWith}
                                                            onChange={(e) => updateKrabi('shareWith', e.target.value)}
                                                            icon={Users}
                                                            disabled={formData.krabi.isShareNotSure}
                                                            required={!formData.krabi.isShareNotSure}
                                                        />
                                                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.krabi.isShareNotSure}
                                                                onChange={(e) => {
                                                                    updateKrabi('isShareNotSure', e.target.checked);
                                                                    if (e.target.checked) {
                                                                        updateKrabi('shareWith', '');
                                                                    }
                                                                }}
                                                                className="rounded text-white focus:ring-white w-4 h-4"
                                                            />
                                                            <span className="font-sans text-sm text-white/80">Not sure now</span>
                                                        </label>
                                                    </FadeInExpand>
                                                )}
                                                <label className="block text-white/80 font-sans mb-3 text-sm uppercase tracking-wider">Room Preference price range </label>
                                                <label className="block text-white/80 font-sans mb-3 text-sm tracking-wider">(You can select more than one option)</label>
                                                <div className="space-y-3">
                                                    {[
                                                        "ประมาณ 4,000 - 6,000+ บาท / คืน",
                                                        "ประมาณ 6,000 - 10,000+ บาท / คืน",
                                                        "ประมาณ 25,000 - 40,000+ บาท / คืน"
                                                    ].map((range) => (
                                                        <label key={range} className="flex items-center gap-3 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.krabi.roomRange.includes(range)}
                                                                onChange={(e) => {
                                                                    const currentRanges = formData.krabi.roomRange || [];
                                                                    if (e.target.checked) {
                                                                        updateKrabi('roomRange', [...currentRanges, range]);
                                                                    } else {
                                                                        updateKrabi('roomRange', currentRanges.filter(r => r !== range));
                                                                    }
                                                                }}
                                                                className="rounded text-white focus:ring-white w-4 h-4"
                                                            />
                                                            <span className="font-sans text-white">{range}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4 items-start w-full min-w-0">
                                                <div className="w-full sm:w-1/2 block min-w-0">
                                                    <InputField
                                                        label="Check-in"
                                                        type="date"
                                                        min="2026-11-01"
                                                        max="2026-12-04"
                                                        value={formData.krabi.checkIn}
                                                        onChange={(e) => updateKrabi('checkIn', e.target.value)}
                                                        onFocus={(e) => {
                                                            if (!e.target.value) {
                                                                e.target.value = '2026-11-01';
                                                                e.target.value = '';
                                                            }
                                                        }}
                                                        className="!mb-0"
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/2 block min-w-0 relative">
                                                    <InputField
                                                        label="Check-out"
                                                        type="date"
                                                        min={getNextDay(formData.krabi.checkIn)}
                                                        value={formData.krabi.checkOut}
                                                        onChange={(e) => updateKrabi('checkOut', e.target.value)}
                                                        disabled={!formData.krabi.checkIn}
                                                        className="!mb-0"
                                                    />
                                                    <p className="font-sans text-[10px] text-white/60 font-bold uppercase tracking-widest text-right mt-1 absolute -bottom-5 right-0 border-t border-transparent">
                                                        Our Wedding Day | December 4, 2026
                                                    </p>
                                                </div>
                                            </div>
                                            {/* To account for absolute positioned text so it doesn't overlap the night stay */}
                                            <div className="h-4 sm:h-5 w-full"></div>
                                            {formData.krabi.checkIn && formData.krabi.checkOut && (
                                                <div className="mt-2 text-center flex flex-col gap-1">
                                                    <span className="text-white font-source-serif font-[300] text-lg">
                                                        Night Stay: <span className="font-bold">{calculateNights(formData.krabi.checkIn, formData.krabi.checkOut)}</span> {calculateNights(formData.krabi.checkIn, formData.krabi.checkOut) === 1 ? 'night' : 'nights'}
                                                    </span>
                                                    {(() => {
                                                        const eventDate = new Date('2026-12-04');
                                                        const checkInDate = new Date(formData.krabi.checkIn);
                                                        const daysBefore = Math.round((eventDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

                                                        if (daysBefore === 0) {
                                                            return <span className="text-sm font-sans text-white/80">You'll be arriving right on our wedding day!</span>;
                                                        } else if (daysBefore > 0) {
                                                            return <span className="text-sm font-sans text-white/80">You will arrive {daysBefore} day{daysBefore > 1 ? 's' : ''} before our wedding.</span>;
                                                        }
                                                        return null;
                                                    })()}
                                                </div>
                                            )}
                                        </FadeIn>
                                    )}
                                </div>
                            </div>
                        </FadeInExpand>
                    )}

                    {formData.krabi.attending === 'no' && (
                        <FadeInExpand className="px-8 md:px-12 pb-6">
                            <label className="block text-white/80 font-sans mb-1 text-sm uppercase tracking-wider">Message</label>
                            <textarea
                                className="w-full p-3 border border-white/30 rounded-lg focus:outline-none focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40"
                                rows="2"
                                placeholder="Send your best wishes..."
                                value={formData.krabi.message || ''}
                                onChange={(e) => updateKrabi('message', e.target.value)}
                            ></textarea>
                        </FadeInExpand>
                    )}

                    {/* RSVP Button */}
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
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mb-1" />
                                        <span className="font-chloe text-xl uppercase tracking-[0.12em]" style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}>
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
                onConfirm={confirmSubmit}
                data={formData.krabi}
                isSubmitting={isSubmitting}
            />
        </section>
    );
};

export default RSVP;
