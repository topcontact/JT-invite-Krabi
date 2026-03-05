import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Check, X, BedDouble, Utensils, Baby, ArrowRight, User, Phone, Pencil } from 'lucide-react';

const Diamond = () => (
    <svg width="6" height="6" viewBox="0 0 10 10" className="fill-blue opacity-80 inline-block mx-2">
        <polygon points="5,0 10,5 5,10 0,5" />
    </svg>
);

const SlideToConfirm = ({ onConfirm, isSubmitting, isFolding }) => {
    const containerRef = useRef(null);
    const x = useMotionValue(0);
    const [confirmed, setConfirmed] = useState(false);
    const thumbWidth = 52;
    const [containerWidth, setContainerWidth] = useState(280);

    const maxDrag = containerWidth - thumbWidth - 8; // 8 for padding
    const bgOpacity = useTransform(x, [0, maxDrag], [0.3, 1]);
    const textOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);

    const handleDragEnd = (_, info) => {
        if (x.get() >= maxDrag * 0.85) {
            setConfirmed(true);
            onConfirm();
        }
    };

    return (
        <div
            ref={(el) => {
                containerRef.current = el;
                if (el) setContainerWidth(el.offsetWidth);
            }}
            className="relative h-14 rounded-full bg-navy/10 border border-navy/20 overflow-hidden select-none"
        >
            {/* Background fill */}
            <motion.div
                className="absolute inset-0 rounded-full bg-navy"
                style={{ opacity: bgOpacity }}
            />

            {/* Text label */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: textOpacity }}
            >
                <span className="text-xs font-bold uppercase tracking-wider text-navy/60 ml-10">
                    Slide to send
                </span>
            </motion.div>

            {/* Draggable thumb */}
            {!confirmed ? (
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: maxDrag }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    style={{ x }}
                    className="absolute top-1 left-1 w-12 h-12 rounded-full bg-navy shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
                    whileTap={{ scale: 0.95 }}
                >
                    {isSubmitting || isFolding ? (
                        <div className="w-5 h-5 border-2 border-mist/30 border-t-mist rounded-full animate-spin" />
                    ) : (
                        <ArrowRight size={20} className="text-mist" />
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: maxDrag }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 left-1 w-12 h-12 rounded-full bg-green-600 shadow-lg flex items-center justify-center z-10"
                >
                    {isSubmitting || isFolding ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Check size={20} className="text-white" />
                    )}
                </motion.div>
            )}
        </div>
    );
};

const TicketModal = ({ isOpen, onClose, onConfirm, data, isSubmitting }) => {
    const [isFolding, setIsFolding] = useState(false);

    const handleConfirm = async () => {
        setIsFolding(true);
        setTimeout(async () => {
            await onConfirm();
            setTimeout(() => setIsFolding(false), 500);
        }, 600);
    };

    const name = data?.name || "Guest";
    const status = data?.attending === 'yes' ? "Accepted" : "Declined";
    const adults = parseInt(data?.adults || 0);
    const totalChildren = data?.hasChildren === 'yes' ?
        (parseInt(data?.childrenOver12 || 0) + parseInt(data?.children7To12 || 0) + parseInt(data?.childrenUnder7 || 0)) : 0;
    const partySize = adults + totalChildren;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-navy/60 overflow-y-auto"
                    style={{ perspective: "1200px" }}
                >
                    <style>{`
                        .vintage-mask-top {
                            -webkit-mask-image: radial-gradient(circle at 10px 0px, transparent 10px, black 11.5px);
                            -webkit-mask-size: 20px 100%;
                            -webkit-mask-position: top left;
                            -webkit-mask-repeat: repeat-x;
                        }
                        .vintage-mask-bottom {
                            -webkit-mask-image: radial-gradient(circle at 10px 100%, transparent 10px, black 11.5px);
                            -webkit-mask-size: 20px 100%;
                            -webkit-mask-position: bottom left;
                            -webkit-mask-repeat: repeat-x;
                        }
                    `}</style>

                    <motion.div
                        className="relative w-full max-w-sm my-auto"
                        exit={{ y: -600, opacity: 0, scale: 0.8, transition: { duration: 0.6, ease: "easeInOut" } }}
                    >

                        {/* Upper Half */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={isFolding ? { rotateX: -90, y: 50, opacity: 0, originY: "bottom" } : { rotateX: 0, y: 0, opacity: 1, originY: "bottom" }}
                            transition={{ duration: 0.4, ease: "easeIn" }}
                            className="bg-mist vintage-mask-top pt-6 pb-1 px-4 relative drop-shadow-2xl z-10"
                        >
                            <div className="border-t-2 border-l-2 border-r-2 border-navy/30 rounded-t-xl relative p-5 bg-mist">
                                <div className="absolute top-[4px] left-[4px] right-[4px] bottom-0 border-t border-l border-r border-navy/20 rounded-t-lg pointer-events-none"></div>

                                <div className="relative z-10 text-center">
                                    <div className="mb-4 flex justify-center items-center">
                                        <Diamond />
                                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy mx-2">Please verify your details</span>
                                        <Diamond />
                                    </div>

                                    <h2 className="font-serif text-3xl text-navy tracking-tight mb-1">RSVP Review</h2>

                                    <div className="mt-4 mb-4 border border-navy/20 rounded-lg p-4 bg-white/40 text-left">
                                        <div className="flex items-start gap-3 mb-3">
                                            <User className="w-4 h-4 text-blue mt-1 shrink-0" />
                                            <div>
                                                <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy/60">Guest Name</p>
                                                <p className="font-serif text-lg text-navy leading-tight">{name}</p>
                                            </div>
                                        </div>

                                        {data?.phone && (
                                            <div className="flex items-start gap-3 mb-3">
                                                <Phone className="w-4 h-4 text-blue mt-px shrink-0" />
                                                <div>
                                                    <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy/60">Phone</p>
                                                    <p className="font-sans text-sm text-navy">{data.phone}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-navy/10">
                                            <div>
                                                <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-1">Status</p>
                                                <p className="font-serif text-base text-navy flex items-center gap-1.5">
                                                    {data?.attending === 'yes' ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-red-500" />}
                                                    {status}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-1">Party Size</p>
                                                <p className="font-serif text-base text-navy">{partySize} <span className="text-xs font-sans text-navy/60">total</span></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>

                        {/* Perforated Line connecting halves */}
                        <div className="relative h-0 z-20">
                            <div className="absolute inset-0 flex items-center justify-between px-[20px] w-full">
                                <div className="border-t-2 border-dashed border-navy/30 w-full relative top-[-1px]"></div>
                            </div>
                        </div>

                        {/* Lower Half */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={isFolding ? { rotateX: 90, y: -50, opacity: 0, originY: "top" } : { rotateX: 0, y: 0, opacity: 1, originY: "top" }}
                            transition={{ duration: 0.4, ease: "easeIn" }}
                            className="bg-mist vintage-mask-bottom pb-6 pt-1 px-4 relative drop-shadow-2xl z-10"
                        >
                            <div className="border-b-2 border-l-2 border-r-2 border-navy/30 rounded-b-xl relative p-5 bg-mist">
                                <div className="absolute bottom-[4px] left-[4px] right-[4px] top-0 border-b border-l border-r border-navy/20 rounded-b-lg pointer-events-none"></div>

                                <div className="relative z-10">
                                    {/* Extra Details */}
                                    {data?.attending === 'yes' && (totalChildren > 0 || data?.waitGroupRate === 'yes' || data?.dietary || data?.firstName) && (
                                        <div className="mb-5 bg-white/40 p-4 rounded-lg border border-navy/10">
                                            <div className="space-y-4 text-sm text-navy font-sans">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-0.5 text-center pb-4">Wait for Group Rate</p>
                                                {(data?.firstName || data?.lastName) && (
                                                    <div className="flex items-start gap-3">
                                                        <User className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                        <div className="leading-snug">
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/60">Guest Details</p>
                                                            {data?.firstName && <p>Firstname: {data.firstName}</p>}
                                                            {data?.lastName && <p>Lastname: {data.lastName}</p>}
                                                        </div>
                                                    </div>
                                                )}

                                                {totalChildren > 0 && (
                                                    <div className="flex items-start gap-3">
                                                        <Baby className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/60">Children</p>
                                                            <p className="leading-snug">Age &lt;7 = {data.childrenUnder7 || 0}</p>
                                                            <p className="leading-snug">Age 7-12 = {data.children7To12 || 0}</p>
                                                            <p className="leading-snug">Age 12+ = {data.childrenOver12 || 0}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.waitGroupRate === 'yes' && (
                                                    <div className="flex items-start gap-3">
                                                        <BedDouble className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                        <div className="leading-snug">
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-0.5">Room range interested</p>
                                                            <p className="mb-1">Rooms: {data?.rooms === 'Share room' ? `Sharing room (${data?.isShareNotSure ? 'Not sure now' : data?.shareWith})` : data?.rooms}</p>
                                                            {data?.roomRange && data?.roomRange.length > 0 && (
                                                                <div className="mb-1 text-xs pb-2">
                                                                    <p>Price:</p>
                                                                    {(Array.isArray(data?.roomRange) ? data.roomRange : [data.roomRange]).map((range, i) => (
                                                                        <p key={i} className="ml-2">{range.replace(/\/ night/g, '').trim()}</p>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {data?.checkIn && data?.checkOut && (
                                                                <div className="text-xs">
                                                                    <p>Dates: {data.checkIn} to {data.checkOut}</p>
                                                                    <p>({Math.round((new Date(data.checkOut) - new Date(data.checkIn)) / (1000 * 60 * 60 * 24))} nights)</p>
                                                                    {(() => {
                                                                        const eventDate = new Date('2026-12-04');
                                                                        const checkInDate = new Date(data.checkIn);
                                                                        const daysBefore = Math.round((eventDate - checkInDate) / (1000 * 60 * 60 * 24));
                                                                        return daysBefore > 0 ? <p>Arrive before event {daysBefore} night{daysBefore > 1 ? 's' : ''}</p> : null;
                                                                    })()}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.dietary && (
                                                    <div className="flex items-start gap-3">
                                                        <Utensils className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-0.5">Dietary Requirements</p>
                                                            <span className="italic leading-snug">"{data.dietary}"</span>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-center mb-5 opacity-60">
                                        <Diamond /><Diamond /><Diamond />
                                    </div>

                                    {/* Edit Details + Slide to Confirm */}
                                    <button
                                        onClick={onClose}
                                        disabled={isSubmitting || isFolding}
                                        className="w-full flex items-center justify-center gap-1.5 py-2.5 mb-3 rounded-lg font-sans text-xs font-bold uppercase tracking-wider text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors disabled:opacity-50"
                                    >
                                        <Pencil size={12} />
                                        Edit Details
                                    </button>
                                    <SlideToConfirm
                                        onConfirm={handleConfirm}
                                        isSubmitting={isSubmitting}
                                        isFolding={isFolding}
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TicketModal;
