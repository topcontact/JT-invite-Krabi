import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, BedDouble, Utensils, MessageSquare, Baby, ArrowRight, User, Phone, Pencil } from 'lucide-react';
import SlideToConfirm from './SlideToConfirm';
import { calculateNights, getDaysBeforeEvent, getArrivalMessage } from '../../utils/formatters';

/**
 * Diamond divider component
 */
const Diamond = () => (
  <svg width="6" height="6" viewBox="0 0 10 10" className="fill-blue opacity-80 inline-block mx-2">
    <polygon points="5,0 10,5 5,10 0,5" />
  </svg>
);

/**
 * Ticket Modal Component
 * Displays a review modal before final submission
 * 
 * @param {object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {function} props.onClose - Close handler
 * @param {function} props.onConfirm - Confirm/submit handler
 * @param {object} props.data - Form data to display
 * @param {boolean} props.isSubmitting - Whether submission is in progress
 */
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
  const totalChildren = data?.hasChildren === 'yes'
    ? (parseInt(data?.childrenOver12 || 0) + parseInt(data?.children7To12 || 0) + parseInt(data?.childrenUnder7 || 0))
    : 0;
  const partySize = adults + totalChildren;
  const nights = calculateNights(data?.checkIn, data?.checkOut);
  const daysBefore = getDaysBeforeEvent(data?.checkIn);
  const arrivalMessage = getArrivalMessage(daysBefore);

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
          {/* Ticket CSS Masks */}
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
                    <span className="font-source-serif text-[10px] font-bold uppercase tracking-widest text-navy mx-2">Please verify your details</span>
                    <Diamond />
                  </div>

                  <h2 className="font-serif text-3xl text-navy tracking-tight mb-1">RSVP Review</h2>

                  <div className="mt-4 mb-4 border border-navy/20 rounded-lg p-4 bg-white/40 text-left">
                    <div className="flex items-start gap-3 mb-3">
                      <User className="w-4 h-4 text-blue mt-1 shrink-0" />
                      <div>
                        <p className="font-source-serif text-[10px] font-bold uppercase tracking-wider text-navy/60">Guest Name</p>
                        <p className="font-serif text-lg text-navy leading-tight">{name}</p>
                      </div>
                    </div>

                    {data?.phone && (
                      <div className="flex items-start gap-3 mb-3">
                        <Phone className="w-4 h-4 text-blue mt-px shrink-0" />
                        <div>
                          <p className="font-source-serif text-[10px] font-bold uppercase tracking-wider text-navy/60">Phone</p>
                          <p className="font-source-serif text-sm text-navy">{data.phone}</p>
                        </div>
                      </div>
                    )}

                    <div className={`grid ${data?.attending === 'yes' ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mt-4 pt-3 border-t border-navy/10`}>
                      <div>
                        <p className="font-source-serif text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-1">Status</p>
                        <p className="font-serif text-base text-navy flex items-center gap-1.5">
                          {data?.attending === 'yes' ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-red-500" />}
                          {status}
                        </p>
                      </div>
                      {data?.attending === 'yes' && (
                        <div>
                          <p className="font-source-serif text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-1">Party Size</p>
                          <p className="font-serif text-base text-navy">{partySize} <span className="text-xs font-source-serif text-navy/60">total</span></p>
                        </div>
                      )}
                    </div>

                    {/* Dietary / Message */}
                    {data?.attending === 'yes' && data?.dietary && (
                      <div className="flex items-start gap-3 mt-4 pt-3 border-t border-navy/10">
                        <Utensils className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                        <div>
                          <p className="font-source-serif text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-0.5">Dietary / Needs</p>
                          <span className="font-source-serif text-sm text-navy italic leading-snug">"{data.dietary}"</span>
                        </div>
                      </div>
                    )}
                    {data?.attending === 'no' && data?.message && (
                      <div className="flex items-start gap-3 mt-4 pt-3 border-t border-navy/10">
                        <MessageSquare className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                        <div>
                          <p className="font-source-serif text-[10px] font-bold uppercase tracking-wider text-navy/60 mb-0.5">Message</p>
                          <span className="font-source-serif text-sm text-navy italic leading-snug">"{data.message}"</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Perforated Line */}
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
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img src="/ModalTicketPic.jpg" alt="" className="w-full h-full object-cover object-center" />
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
                  {/* Extra Details for Group Rate */}
                  {data?.attending === 'yes' && (totalChildren > 0 || data?.waitGroupRate === 'yes' || data?.dietary || data?.firstName) && (
                    <div className="mb-5 p-4 rounded-lg border border-white/40"
                      style={{
                        background: 'rgba(255,255,255,0.45)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    >
                      <div className="space-y-4 text-sm text-navy font-source-serif">
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
                              <p className="mb-1">Rooms: {data?.rooms} {data?.stayType === 'sharing' ? `(Sharing with: ${data?.isShareNotSure ? 'Not sure now' : data?.shareWith})` : ''}</p>
                              {data?.roomRange && data?.roomRange.length > 0 && (
                                <div className="mb-1 text-xs pb-2">
                                  <p>Price:</p>
                                  {data.roomRange.map((range, i) => (
                                    <p key={i} className="ml-2">{range.replace(/\/ night/g, '').trim()}</p>
                                  ))}
                                </div>
                              )}
                              {data?.checkIn && data?.checkOut && (
                                <div className="text-xs">
                                  <p>Dates: {data.checkIn} to {data.checkOut}</p>
                                  <p>({nights} nights)</p>
                                  {arrivalMessage && <p className="text-blue mt-1 font-medium">{arrivalMessage}</p>}
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

                  {/* Edit Details Button */}
                  <button
                    onClick={onClose}
                    disabled={isSubmitting || isFolding}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 mb-3 rounded-lg font-source-serif text-xs font-bold uppercase tracking-wider text-navy/70 hover:text-navy hover:bg-white/30 transition-colors disabled:opacity-50"
                  >
                    <Pencil size={12} />
                    Edit Details
                  </button>

                  {/* Slide to Confirm */}
                  <SlideToConfirm
                    onConfirm={handleConfirm}
                    isSubmitting={isSubmitting}
                    label="Slide to send"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Loading Overlay */}
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
                <p className="font-source-serif text-sm text-white/90 uppercase tracking-widest">Sending...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketModal;
