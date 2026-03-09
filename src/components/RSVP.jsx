import React from 'react';
import { Send, User, Phone, Users, Home, Calendar, Baby, ChevronDown } from 'lucide-react';
import { FadeInExpand, FadeInScale, FadeInView, FadeIn, Shake, SlideInWarning } from './animations/Motion';
import TicketModal from './TicketModal';

const InputField = ({ label, type = "text", value, onChange, placeholder, icon: Icon, required = false, disabled = false, options = [], ...props }) => (
    <div className={`mb-4 flex flex-col w-full min-w-0 ${disabled ? 'opacity-50' : ''}`}>
        <label className="block text-navy font-sans mb-1 text-sm uppercase tracking-wider truncate">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative mt-auto w-full min-w-0">
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
            <section className="pt-20 pb-40 md:pb-48 px-4 bg-white/40" id="rsvp">
                <FadeInScale className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <Send className="w-10 h-10 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-serif text-navy mb-4">Thank You!</h2>
                    <p className="text-lg text-gray-600 font-sans mb-8">
                        Your RSVP has been sent successfully. We are so excited to celebrate with you!
                    </p>
                    <p className="text-blue font-sans font-medium uppercase tracking-wider">
                        Supicha & Teerawat
                    </p>
                </FadeInScale>
            </section>
        );
    }

    return (
        <section className="pt-20 pb-40 md:pb-48 px-4 bg-white/40" id="rsvp">
            <FadeInView className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-10 bg-navy text-white text-center">
                    <h2 className="text-4xl md:text-5xl font-script mb-2">RSVP</h2>
                    <p className="font-sans uppercase tracking-widest text-sm text-white">Please respond by <br /> April 30th, 2026</p>
                </div>

                <form onSubmit={handleReview} className="p-8 md:p-12 space-y-12">

                    {/* Krabi Section */}
                    <div>
                        <p className="font-serif text-2xl text-navy mb-1">The Grotto Restaurant<br /> Rayavadee Resort, Krabi</p>
                        <p className="font-sans text-blue font-medium uppercase tracking-wider mb-3">Friday, December 4, 2026 • 16:00</p>
                        <p className="font-sans text-gray-500 mb-6">Wedding Ceremony and Reception</p>

                        <RadioGroup
                            label="Will you join us?"
                            name="krabi_attending"
                            value={formData.krabi.attending}
                            onChange={(val) => updateKrabi('attending', val)}
                            options={[
                                { label: "Joyfully Accept", value: "yes" },
                                { label: "Regretfully Decline", value: "no" }
                            ]}
                        />

                        {formData.krabi.attending && (
                            <FadeInExpand className="space-y-4 mb-4">
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
                            </FadeInExpand>
                        )}

                        {formData.krabi.attending === 'yes' && (
                            <FadeInExpand className="space-y-4">
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
                                <div className="mt-6 p-6 bg-mist/30 rounded-xl border border-blue/10">
                                    <h4 className="font-serif text-xl text-navy mb-4">Children</h4>
                                    <RadioGroup
                                        label="Will you be bringing children?"
                                        name="krabi_hasChildren"
                                        value={formData.krabi.hasChildren}
                                        onChange={(val) => updateKrabi('hasChildren', val)}
                                        options={[
                                            { label: "Yes", value: "yes" },
                                            { label: "No", value: "no" }
                                        ]}
                                    />

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
                                    <label className="block text-navy font-sans mb-1 text-sm uppercase tracking-wider">Dietary Restrictions / Additional Needs</label>
                                    <textarea
                                        className="w-full p-3 border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm"
                                        rows="2"
                                        value={formData.krabi.dietary}
                                        onChange={(e) => updateKrabi('dietary', e.target.value)}
                                    ></textarea>
                                </div>

                                {/* Accommodation Logic */}
                                <div className="mt-8 p-6 bg-mist/50 rounded-xl border border-blue/10">
                                    <h4 className="font-serif text-xl text-navy mb-4">Accommodation</h4>
                                    <RadioGroup
                                        label="Wait for Group Rate?"
                                        name="wait_group_rate"
                                        value={formData.krabi.waitGroupRate}
                                        onChange={(val) => updateKrabi('waitGroupRate', val)}
                                        options={[
                                            { label: "Yes, I'll wait", value: "yes" },
                                            { label: "No, I'll book myself", value: "no" }
                                        ]}
                                    />

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
                                                                className="rounded text-navy focus:ring-navy w-4 h-4"
                                                            />
                                                            <span className="font-sans text-sm text-navy/80">Not sure now</span>
                                                        </label>
                                                    </FadeInExpand>
                                                )}
                                                <label className="block text-navy font-sans mb-3 text-sm uppercase tracking-wider">Room Preference price range </label>
                                                <label className="block text-navy font-sans mb-3 text-sm tracking-wider">(You can select more than one option)</label>
                                                <div className="space-y-3">
                                                    {[
                                                        "Est. 4,000 - 6,000+ THB / night",
                                                        "Est. 6,000 - 10,000+ THB / night",
                                                        "Est. 25,000 - 40,000+ THB / night"
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
                                                                className="rounded text-navy focus:ring-navy w-4 h-4"
                                                            />
                                                            <span className="font-sans text-navy">{range}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full min-w-0">
                                                <div className="w-full sm:w-1/2 flex min-w-0">
                                                    <InputField
                                                        label="Check-in"
                                                        type="date"
                                                        value={formData.krabi.checkIn}
                                                        onChange={(e) => updateKrabi('checkIn', e.target.value)}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/2 flex min-w-0">
                                                    <InputField
                                                        label="Check-out"
                                                        type="date"
                                                        min={getNextDay(formData.krabi.checkIn)}
                                                        value={formData.krabi.checkOut}
                                                        onChange={(e) => updateKrabi('checkOut', e.target.value)}
                                                        disabled={!formData.krabi.checkIn}
                                                    />
                                                </div>
                                            </div>
                                            {formData.krabi.checkIn && formData.krabi.checkOut && (
                                                <div className="mt-2 text-center">
                                                    <span className="text-navy font-serif text-lg">
                                                        Night Stay: <span className="font-bold">{calculateNights(formData.krabi.checkIn, formData.krabi.checkOut)}</span> {calculateNights(formData.krabi.checkIn, formData.krabi.checkOut) === 1 ? 'night' : 'nights'}
                                                    </span>
                                                </div>
                                            )}
                                        </FadeIn>
                                    )}
                                </div>
                            </FadeInExpand>
                        )}
                        {formData.krabi.attending === 'no' && (
                            <FadeInExpand className="mt-4">
                                <label className="block text-navy font-sans mb-1 text-sm uppercase tracking-wider">Message</label>
                                <textarea
                                    className="w-full p-3 border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm"
                                    rows="2"
                                    placeholder="Send your best wishes..."
                                    value={formData.krabi.message || ''}
                                    onChange={(e) => updateKrabi('message', e.target.value)}
                                ></textarea>
                            </FadeInExpand>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 text-white font-sans uppercase tracking-widest transition-colors rounded-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-navy hover:bg-blue'}`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Review RSVP
                            </>
                        )}
                    </button>
                </form>
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
