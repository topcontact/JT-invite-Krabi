import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Phone, Users, Home, Calendar, Baby, ChevronDown } from 'lucide-react';
import TicketModal from './TicketModal';

const InputField = ({ label, type = "text", value, onChange, placeholder, icon: Icon, required = false, disabled = false, options = [], ...props }) => (
    <div className={`mb-4 flex flex-col w-full ${disabled ? 'opacity-50' : ''}`}>
        <label className="block text-navy font-sans mb-1 text-sm uppercase tracking-wider">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative mt-auto">
            {Icon && <Icon className="absolute left-3 top-3 w-5 h-5 text-blue z-10 pointer-events-none" />}
            {type === 'select' ? (
                <>
                    <select
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        {...props}
                        className={`w-full p-3 ${Icon ? 'pl-10' : ''} pr-10 border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm appearance-none cursor-pointer ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
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
                    className={`w-full p-3 ${Icon ? 'pl-10' : ''} border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
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

const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const getNextDay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
};

const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');

    // Limit to 10 digits
    const trimmed = phoneNumber.slice(0, 10);

    // Format as 0xx-xxx-xxxx
    if (trimmed.length < 4) return trimmed;
    if (trimmed.length < 7) return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
};

const RSVP = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const [formData, setFormData] = useState({
        krabi: {
            attending: '',
            name: '',
            phone: '',
            adults: 1,
            hasChildren: '',
            childrenOver12: 0,
            children7To12: 0,
            childrenUnder7: 0,
            dietary: '',
            waitGroupRate: '',
            firstName: '',
            lastName: '',
            rooms: 1,
            shareWith: '',
            isShareNotSure: false,
            roomRange: [],
            checkIn: '',
            checkOut: '',
        }
    });

    const updateKrabi = (field, value) => {
        let finalValue = value;
        if (field === 'phone') {
            finalValue = formatPhoneNumber(value);
        }

        setFormData(prev => {
            const newData = {
                ...prev,
                krabi: { ...prev.krabi, [field]: finalValue }
            };

            // Validate Check-out date
            if (field === 'checkIn' && newData.krabi.checkOut && newData.krabi.checkOut <= value) {
                newData.krabi.checkOut = ''; // Reset check-out if it becomes invalid
            }

            return newData;
        });
    };

    const SCRIPT_URL = "/api/rsvp";

    const handleReview = (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        const submissions = [];

        // Validate children input if bringing children
        if (formData.krabi.attending === 'yes' && formData.krabi.hasChildren === 'yes') {
            const totalChildren = parseInt(formData.krabi.childrenOver12 || 0) +
                parseInt(formData.krabi.children7To12 || 0) +
                parseInt(formData.krabi.childrenUnder7 || 0);

            if (totalChildren === 0) {
                alert("Please select the number of children in the respective age groups.");
                setIsSubmitting(false);
                return;
            }
        }

        // Validate Share Room input
        if (formData.krabi.attending === 'yes' && formData.krabi.waitGroupRate === 'yes' && formData.krabi.rooms === 'Share room') {
            if (!formData.krabi.isShareNotSure && !formData.krabi.shareWith.trim()) {
                alert("Please specify who you are sharing the room with, or select 'Not sure now'.");
                setIsSubmitting(false);
                return;
            }
        }

        // All validations passed, show the review ticket
        setShowReview(true);
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        const submissions = [];

        // Prepare Krabi Data
        if (formData.krabi.attending) {
            // Add night stay info to the submission if applicable
            const nights = calculateNights(formData.krabi.checkIn, formData.krabi.checkOut);

            submissions.push({
                inviteType: 'krabi',
                event: 'Krabi',
                attending: formData.krabi.attending,
                name: formData.krabi.name,
                phone: `'${formData.krabi.phone}'`, // Prepend ' to force Google Sheets to treat as string
                adults: formData.krabi.attending === 'yes' ? formData.krabi.adults : '',
                childrenUnder7: formData.krabi.attending === 'yes' && formData.krabi.hasChildren === 'yes' ? formData.krabi.childrenUnder7 : (formData.krabi.attending === 'yes' ? '0' : ''),
                children7To12: formData.krabi.attending === 'yes' && formData.krabi.hasChildren === 'yes' ? formData.krabi.children7To12 : (formData.krabi.attending === 'yes' ? '0' : ''),
                childrenOver12: formData.krabi.attending === 'yes' && formData.krabi.hasChildren === 'yes' ? formData.krabi.childrenOver12 : (formData.krabi.attending === 'yes' ? '0' : ''),
                dietary: formData.krabi.attending === 'yes' ? formData.krabi.dietary : '',
                waitGroupRate: formData.krabi.attending === 'yes' ? formData.krabi.waitGroupRate : '',
                firstName: formData.krabi.attending === 'yes' ? formData.krabi.firstName : '',
                lastName: formData.krabi.attending === 'yes' ? formData.krabi.lastName : '',
                rooms: formData.krabi.attending === 'yes'
                    ? (formData.krabi.rooms === 'Share room'
                        ? `Share room (With: ${formData.krabi.isShareNotSure ? 'Not sure now' : formData.krabi.shareWith})`
                        : formData.krabi.rooms)
                    : '',
                roomRange4kTo6k: formData.krabi.attending === 'yes' && Array.isArray(formData.krabi.roomRange) && formData.krabi.roomRange.includes("Est. 4,000 - 6,000+ THB / night") ? 'Yes' : '',
                roomRange6kTo10k: formData.krabi.attending === 'yes' && Array.isArray(formData.krabi.roomRange) && formData.krabi.roomRange.includes("Est. 6,000 - 10,000+ THB / night") ? 'Yes' : '',
                roomRange25kTo40k: formData.krabi.attending === 'yes' && Array.isArray(formData.krabi.roomRange) && formData.krabi.roomRange.includes("Est. 25,000 - 40,000+ THB / night") ? 'Yes' : '',
                checkIn: formData.krabi.attending === 'yes' ? formData.krabi.checkIn : '',
                checkOut: formData.krabi.attending === 'yes' ? formData.krabi.checkOut : '',
                nightStay: formData.krabi.attending === 'yes' && nights > 0 ? nights : '',
                message: formData.krabi.attending === 'no' ? (formData.krabi.message || '') : ''
            });
        }

        if (submissions.length === 0) {
            alert("Please select whether you will attend.");
            return;
        }

        setIsSubmitting(true);

        try {
            await Promise.all(submissions.map(data =>
                fetch(SCRIPT_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
            ));

            setIsSubmitted(true);
            setShowReview(false);
        } catch (error) {
            console.error("Error!", error.message);
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <section className="pt-20 pb-40 md:pb-48 px-4 bg-white/40" id="rsvp">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center"
                >
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
                </motion.div>
            </section>
        );
    }

    return (
        <section className="pt-20 pb-40 md:pb-48 px-4 bg-white/40" id="rsvp">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
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
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mb-4">
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
                            </motion.div>
                        )}

                        {formData.krabi.attending === 'yes' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                                    <div className="w-full sm:w-1/2 flex">
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
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-2">
                                            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                                                <div className="w-full sm:w-1/3 flex">
                                                    <InputField
                                                        label="Under 7 yrs"
                                                        type="select"
                                                        options={Array.from({ length: 11 }, (_, i) => i)}
                                                        value={formData.krabi.childrenUnder7}
                                                        onChange={(e) => updateKrabi('childrenUnder7', e.target.value)}
                                                        icon={Baby}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/3 flex">
                                                    <InputField
                                                        label="7 - 12 yrs"
                                                        type="select"
                                                        options={Array.from({ length: 11 }, (_, i) => i)}
                                                        value={formData.krabi.children7To12}
                                                        onChange={(e) => updateKrabi('children7To12', e.target.value)}
                                                        icon={Baby}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/3 flex">
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
                                        </motion.div>
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
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                            <div className="mb-4">
                                                <InputField
                                                    label="First Name (English)"
                                                    value={formData.krabi.firstName}
                                                    onChange={(e) => updateKrabi('firstName', e.target.value)}
                                                    icon={User}
                                                    required
                                                />
                                                <InputField
                                                    label="Last Name (English)"
                                                    value={formData.krabi.lastName}
                                                    onChange={(e) => updateKrabi('lastName', e.target.value)}
                                                    icon={User}
                                                    required
                                                />
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
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 space-y-3">
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
                                                    </motion.div>
                                                )}
                                                <label className="block text-navy font-sans mb-3 text-sm uppercase tracking-wider">Room Preference price range (Select all that apply)</label>
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
                                            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                                                <div className="w-full sm:w-1/2 flex">
                                                    <InputField
                                                        label="Check-in"
                                                        type="date"
                                                        value={formData.krabi.checkIn}
                                                        onChange={(e) => updateKrabi('checkIn', e.target.value)}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/2 flex">
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
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                        {formData.krabi.attending === 'no' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                                <label className="block text-navy font-sans mb-1 text-sm uppercase tracking-wider">Message</label>
                                <textarea
                                    className="w-full p-3 border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm"
                                    rows="2"
                                    placeholder="Send your best wishes..."
                                    value={formData.krabi.message || ''}
                                    onChange={(e) => updateKrabi('message', e.target.value)}
                                ></textarea>
                            </motion.div>
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
            </motion.div>

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
