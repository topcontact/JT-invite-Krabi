import { useState, useRef } from 'react';

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

export const useRSVPForm = () => {
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

    const [nameShake, setNameShake] = useState(0);
    const [englishWarning, setEnglishWarning] = useState(false);
    const warningTimer = useRef(null);

    const handleNameChange = (field, value) => {
        const hasNonEnglish = /[^a-zA-Z\s.-]/.test(value);
        if (hasNonEnglish) {
            setNameShake(prev => prev + 1); // trigger shake
            setEnglishWarning(true);
            // Auto-hide warning after 2.5s
            if (warningTimer.current) clearTimeout(warningTimer.current);
            warningTimer.current = setTimeout(() => setEnglishWarning(false), 2500);
        }
        const filtered = value.replace(/[^a-zA-Z\s.-]/g, '');
        updateKrabi(field, filtered);
    };

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

        // Validate Room Range selection
        if (formData.krabi.attending === 'yes' && formData.krabi.waitGroupRate === 'yes') {
            if (!formData.krabi.roomRange || formData.krabi.roomRange.length === 0) {
                alert("Please select at least one Room Preference price range.");
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
            await Promise.all(submissions.map(async (data) => {
                const response = await fetch(SCRIPT_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    redirect: "follow",
                });
                // Google Apps Script returns 302 redirect after successful write.
                // Via Vite proxy, we may receive the 302 directly (not followed).
                // Both 2xx and 3xx mean the data was saved successfully.
                if (!response.ok && response.status >= 400) {
                    throw new Error(`Server returned ${response.status}`);
                }
            }));

            setIsSubmitted(true);
            setShowReview(false);
        } catch (error) {
            console.error("Error!", error.message);
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    return {
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
    };
};
