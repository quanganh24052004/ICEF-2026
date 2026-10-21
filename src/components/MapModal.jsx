import React from 'react';
import { X, MapPin, Navigation, ExternalLink, Building2, Car, Compass } from 'lucide-react';
import { findVenueByLocationText } from '../data/venuesData';

export default function MapModal({ isOpen, onClose, locationData }) {
  if (!isOpen || !locationData) return null;

  // Resolve venue object
  const venue = typeof locationData === 'string'
    ? findVenueByLocationText(locationData)
    : locationData;

  const handleOpenGoogleMaps = () => {
    if (venue.directUrl) {
      window.open(venue.directUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="card-3d rounded-3xl w-full max-w-2xl bg-white overflow-hidden my-auto border-2 border-duo-border shadow-2xl">
        
        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-duo-border bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-blue flex items-center justify-center shadow-[0_3px_0_#1899D6] text-white shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-duo-dark leading-tight">
                  {venue.name || 'Vị trí Địa điểm'}
                </h3>
                {venue.badge && (
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${venue.badgeColor || 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                    {venue.badge}
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-duo-muted mt-0.5 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-duo-blue shrink-0" />
                <span>{venue.address}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-3d-white w-9 h-9 rounded-full flex items-center justify-center text-duo-dark cursor-pointer shrink-0"
            title="Đóng bản đồ"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Note / Shuttle / Distance details */}
          {(venue.note || venue.distance) && (
            <div className="bg-[#F0F9FF] border-2 border-duo-blue/30 p-3.5 rounded-2xl text-xs space-y-1.5">
              {venue.note && (
                <div className="flex items-start gap-2 text-duo-dark font-bold">
                  <Car className="w-4 h-4 text-duo-blue shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{venue.note}</span>
                </div>
              )}
              {venue.distance && (
                <div className="flex items-center gap-2 text-duo-muted font-bold pl-6">
                  <span>🚗 Cự ly: {venue.distance}</span>
                </div>
              )}
            </div>
          )}

          {/* Embedded Google Map iframe (lazy loaded, safe, responsive) */}
          <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border-2 border-duo-border shadow-inner bg-slate-100">
            {venue.embedUrl ? (
              <iframe
                title={venue.name}
                src={venue.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-duo-muted p-4 text-center">
                <Building2 className="w-10 h-10 mb-2 opacity-60" />
                <p className="text-sm font-black">Địa chỉ: {venue.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t-2 border-duo-border bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-xs font-bold text-duo-muted flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-duo-green"></span>
            <span>Google Maps Trực Tuyến</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenGoogleMaps}
              className="btn-3d-blue text-white font-black text-xs sm:text-sm px-4 py-2 rounded-2xl flex items-center gap-2 cursor-pointer shadow-[0_3px_0_#1899D6]"
            >
              <Navigation className="w-4 h-4 stroke-[2.5]" />
              <span>Chỉ Đường Trên Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-3d-white text-duo-dark font-black text-xs sm:text-sm px-4 py-2 rounded-2xl cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
