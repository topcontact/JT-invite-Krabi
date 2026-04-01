import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Check, X, BedDouble, Utensils, MessageSquare, Baby, ArrowRight, User, Phone, Pencil } from 'lucide-react';

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

    const maxDrag = containerWidth - thumbWidth - 8;
    // Glass effect: as you slide, the track becomes more translucent
    const trackBlur = useTransform(x, [0, maxDrag], [8, 20]);
    const trackBgOpacity = useTransform(x, [0, maxDrag], [0.15, 0.05]);
    const trackBorderOpacity = useTransform(x, [0, maxDrag], [0.3, 0.6]);
    const textOpacity = useTransform(x, [0, maxDrag * 0.4], [1, 0]);
    const thumbGlow = useTransform(x, [0, maxDrag], [0, 20]);

    const backdropFilter = useTransform(trackBlur, v => `blur(${v}px) saturate(180%)`);
    const backgroundColor = useTransform(trackBgOpacity, v => `rgba(255,255,255,${v})`);
    const borderColor = useTransform(trackBorderOpacity, v => `rgba(255,255,255,${v})`);
    const boxShadow = useTransform(thumbGlow, v => `0 2px 10px rgba(42,77,105,0.3), 0 0 ${v}px rgba(75,134,180,0.4)`);

    const handleDragEnd = () => {
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
            className="relative h-14 rounded-full overflow-hidden select-none"
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
        >
            {/* Liquid glass backdrop blur layer */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    backdropFilter,
                    WebkitBackdropFilter: backdropFilter,
                    backgroundColor,
                    borderColor,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                }}
            />

            {/* Inner highlight (top edge) */}
            <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-full pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
            />

            {/* Text label */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: textOpacity }}
            >
                <span className="text-xs font-krub font-[400] uppercase tracking-wider text-navy/50 ml-10 drop-shadow-sm">
                    เลื่อนเพื่อส่งข้อมูล
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
                    style={{
                        x,
                        boxShadow
                    }}
                    className="absolute top-1 left-1 w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Thumb glass */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'linear-gradient(145deg, rgba(42,77,105,0.95), rgba(42,77,105,0.8))',
                            backdropFilter: 'blur(10px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(10px) saturate(200%)',
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}
                    />
                    <div className="relative z-10">
                        {isSubmitting || isFolding ? (
                            <div className="w-5 h-5 border-2 border-mist/30 border-t-mist rounded-full animate-spin" />
                        ) : (
                            <ArrowRight size={20} className="text-white/90 drop-shadow-sm" />
                        )}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: maxDrag }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 left-1 w-12 h-12 rounded-full flex items-center justify-center z-10"
                    style={{
                        background: 'linear-gradient(145deg, rgba(22,163,74,0.95), rgba(22,163,74,0.8))',
                        backdropFilter: 'blur(10px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(10px) saturate(200%)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 2px 10px rgba(22,163,74,0.4), 0 0 20px rgba(22,163,74,0.3)',
                    }}
                >
                    {isSubmitting || isFolding ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Check size={20} className="text-white drop-shadow-sm" />
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
    const status = data?.attending === 'yes' ? "ยินดีเข้าร่วมงาน" : "ไม่สามารถเข้าร่วมได้";
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

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    disabled={isSubmitting || isFolding}
                                    className="absolute top-2 right-2 z-20 text-navy/40 hover:text-navy transition-colors p-2 disabled:opacity-50"
                                    aria-label="Close modal"
                                >
                                    <X size={20} />
                                </button>

                                <div className="relative z-10 text-center">
                                    <div className="mb-4 flex justify-center items-center">
                                        <Diamond />
                                        <span className="font-krub text-[11px] font-[400] uppercase tracking-widest text-navy mx-2">กรุณาตรวจสอบข้อมูลของคุณ</span>
                                        <Diamond />
                                    </div>

                                    <h2 className="font-serif text-3xl text-navy tracking-tight mb-1">สรุปการตอบรับ</h2>

                                    <div className="mt-4 mb-4 border border-navy/20 rounded-lg p-4 bg-white/40 text-left">
                                        <div className="flex items-start gap-3 mb-3">
                                            <User className="w-4 h-4 text-blue mt-1 shrink-0" />
                                            <div>
                                                <p className="font-krub text-[11px] font-[400] uppercase tracking-wider text-navy/60">ชื่อผู้เข้าร่วมงาน</p>
                                                <p className="font-serif text-lg text-navy leading-tight">{name}</p>
                                            </div>
                                        </div>

                                        {data?.phone && (
                                            <div className="flex items-start gap-3 mb-3">
                                                <Phone className="w-4 h-4 text-blue mt-px shrink-0" />
                                                <div>
                                                    <p className="font-krub text-[11px] font-[400] uppercase tracking-wider text-navy/60">เบอร์โทรศัพท์</p>
                                                    <p className="font-krub text-sm text-navy">{data.phone}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className={`grid ${data?.attending === 'yes' ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mt-4 pt-3 border-t border-navy/10`}>
                                            <div>
                                                <p className="font-krub text-[11px] font-[400] uppercase tracking-wider text-navy/60 mb-1">สถานะ</p>
                                                <p className="font-krub font-[400] text-base text-navy flex items-center gap-1.5">
                                                    {data?.attending === 'yes' ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-red-500" />}
                                                    {status}
                                                </p>
                                            </div>
                                            {data?.attending === 'yes' && (
                                                <div>
                                                    <p className="font-krub text-[11px] font-[400] uppercase tracking-wider text-navy/60 mb-1">จำนวนผู้เข้าร่วม</p>
                                                    <p className="font-serif text-base text-navy">{partySize} <span className="text-xs font-krub text-navy/60">คน</span></p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Dietary / Message in upper box */}
                                        {data?.attending === 'yes' && data?.dietary && (
                                            <div className="flex items-start gap-3 mt-4 pt-3 border-t border-navy/10">
                                                <Utensils className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="font-krub text-[11px] font-[400] uppercase tracking-wider text-navy/60 mb-0.5">ข้อจำกัดด้านอาหาร / ความต้องการเพิ่มเติม</p>
                                                    <span className="font-krub text-sm text-navy italic leading-snug">"{data.dietary}"</span>
                                                </div>
                                            </div>
                                        )}
                                        {data?.attending === 'no' && data?.message && (
                                            <div className="flex items-start gap-3 mt-4 pt-3 border-t border-navy/10">
                                                <MessageSquare className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="font-krub text-[11px] font-[400] uppercase tracking-wider text-navy/60 mb-0.5">ข้อความถึงบ่าวสาว</p>
                                                    <span className="font-krub text-sm text-navy italic leading-snug">"{data.message}"</span>
                                                </div>
                                            </div>
                                        )}
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
                            className="vintage-mask-bottom pb-6 pt-1 px-4 relative drop-shadow-2xl z-10 overflow-hidden"
                            style={{ backgroundColor: '#e7eff6' }}
                        >
                            {/* Background image with fade-to-white upward */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/ModalTicketPic.jpg"
                                    alt=""
                                    className="w-full h-full object-cover object-center"
                                />
                                {/* Fade overlay: white fading from top to transparent at bottom */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(to bottom, #e7eff6 0%, rgba(231,239,246,0.85) 30%, rgba(231,239,246,0.4) 60%, rgba(231,239,246,0.15) 100%)',
                                    }}
                                />
                            </div>

                            <div className="border-b-2 border-l-2 border-r-2 border-navy/30 rounded-b-xl relative p-5">
                                <div className="absolute bottom-[4px] left-[4px] right-[4px] top-0 border-b border-l border-r border-navy/20 rounded-b-lg pointer-events-none"></div>

                                <div className="relative z-10">
                                    {/* Extra Details */}
                                    {data?.attending === 'yes' && (totalChildren > 0 || data?.waitGroupRate === 'yes' || data?.dietary || data?.firstName) && (
                                        <div className="mb-5 p-4 rounded-lg border border-white/40"
                                            style={{
                                                background: 'rgba(255,255,255,0.45)',
                                                backdropFilter: 'blur(12px) saturate(180%)',
                                                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                                            }}
                                        >
                                            <div className="space-y-4 text-sm text-navy font-krub">
                                                <p className="text-[11px] font-[400] uppercase tracking-wider text-navy/60 mb-0.5 text-center pb-4">รอเข้าร่วม Group Rate</p>
                                                {(data?.firstName || data?.lastName) && (
                                                    <div className="flex items-start gap-3">
                                                        <User className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                        <div className="leading-snug">
                                                            <p className="text-[11px] font-[400] uppercase tracking-wider text-navy/60">ข้อมูลผู้เข้าพัก</p>
                                                            {data?.firstName && <p>ชื่อจริง: {data.firstName}</p>}
                                                            {data?.lastName && <p>นามสกุล: {data.lastName}</p>}
                                                        </div>
                                                    </div>
                                                )}

                                                {totalChildren > 0 && (
                                                    <div className="flex items-start gap-3">
                                                        <Baby className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-[11px] font-[400] uppercase tracking-wider text-navy/60">เด็ก</p>
                                                            <p className="leading-snug">อายุ &lt;7 ปี = {data.childrenUnder7 || 0}</p>
                                                            <p className="leading-snug">อายุ 7-12 ปี = {data.children7To12 || 0}</p>
                                                            <p className="leading-snug">อายุ 12+ ปี = {data.childrenOver12 || 0}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.waitGroupRate === 'yes' && (
                                                    <div className="flex items-start gap-3">
                                                        <BedDouble className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                                        <div className="leading-snug">
                                                            <p className="text-[11px] font-[400] uppercase tracking-wider text-navy/60 mb-0.5">ช่วงราคาห้องพักที่สนใจ</p>
                                                            <p className="mb-1">จำนวนห้อง: {data?.rooms === 'แชร์ห้องกับผู้อื่น' ? `แชร์ห้องกับผู้อื่น (${data?.isShareNotSure ? 'ยังไม่แน่ใจ' : data?.shareWith})` : data?.rooms}</p>
                                                            {data?.roomRange && data?.roomRange.length > 0 && (
                                                                <div className="mb-1 text-xs pb-2">
                                                                    <p>ราคา:</p>
                                                                    {(Array.isArray(data?.roomRange) ? data.roomRange : [data.roomRange]).map((range, i) => (
                                                                        <p key={i} className="ml-2">{range.replace(/\/ night/g, '').trim()}</p>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {data?.checkIn && data?.checkOut && (
                                                                <div className="text-xs">
                                                                    <p>วันที่: {data.checkIn} ถึง {data.checkOut}</p>
                                                                    <p>({Math.round((new Date(data.checkOut) - new Date(data.checkIn)) / (1000 * 60 * 60 * 24))} คืน)</p>
                                                                    {(() => {
                                                                        const eventDate = new Date('2026-12-04');
                                                                        const checkInDate = new Date(data.checkIn);
                                                                        const daysBefore = Math.round((eventDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

                                                                        if (daysBefore === 0) {
                                                                            return <p className="text-blue mt-1 font-medium">คุณเข้าพักในวันแต่งงานของเราพอดี!</p>;
                                                                        } else if (daysBefore > 0) {
                                                                            return <p className="text-blue mt-1 font-medium">คุณจะเข้าพักก่อนวันงาน {daysBefore} วัน</p>;
                                                                        }
                                                                        return null;
                                                                    })()}
                                                                </div>
                                                            )}
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
                                        className="w-full flex items-center justify-center gap-1.5 py-2.5 mb-3 rounded-lg font-krub text-sm font-[400] uppercase tracking-wider text-navy/70 hover:text-navy hover:bg-white/30 transition-colors disabled:opacity-50"
                                    >
                                        <Pencil size={12} />
                                        แก้ไขข้อมูล
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

                    {/* Loading Spinner Overlay - shown after fold animation while API submits */}
                    <AnimatePresence>
                        {isFolding && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center"
                            >
                                <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin mb-4" />
                                <p className="font-krub text-sm text-white/90 uppercase tracking-widest">กำลังส่งข้อมูล...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TicketModal;
