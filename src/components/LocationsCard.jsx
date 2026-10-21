import React, { useState } from 'react';
import { Map, MapPin, ChevronDown, Navigation, ExternalLink, Car, Building, UtensilsCrossed, Hotel, School, Phone } from 'lucide-react';
import { KEY_LOCATIONS } from '../data/venuesData';

export default function LocationsCard({ onOpenMapModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('emeralda'); // 'hust_c7' | 'alo_garden' | 'emeralda' | 'restaurant_1969'

  const venuesList = [
    {
      key: 'hust_c7',
      label: '1. C7 ĐHBK Hà Nội',
      sub: 'Tập trung 11:00 • Xuất phát 11:30',
      icon: School,
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      key: 'alo_garden',
      label: '2. ALO RESORT (Alo Garden)',
      sub: 'Lưu trú 2 đêm • Đón Shuttle Bus',
      icon: Hotel,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      key: 'emeralda',
      label: '3. Emeralda Resort',
      sub: 'Địa điểm Hội thảo & Pre-conf',
      icon: Building,
      color: 'text-duo-blue bg-blue-50 border-blue-200'
    },
    {
      key: 'restaurant_1969',
      label: '4. Nhà hàng 1969',
      sub: 'Welcome Dinner & Gala Dinner',
      icon: UtensilsCrossed,
      color: 'text-amber-800 bg-amber-50 border-amber-200'
    }
  ];

  const currentVenue = KEY_LOCATIONS[activeTab] || KEY_LOCATIONS.emeralda;

  return (
    <div className="card-3d rounded-3xl overflow-hidden mt-4 bg-white transition-all">
      {/* Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 font-black text-duo-dark flex items-center justify-between text-left hover:bg-duo-bg/60 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base font-black text-duo-dark">
          <div className="w-10 h-10 rounded-2xl bg-duo-blue flex items-center justify-center shadow-[0_3px_0_#1899D6] text-white shrink-0">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span>Bản Đồ Các Điểm Đến Hội Thảo (Google Maps)</span>
              <span className="text-[10px] font-black uppercase bg-duo-blue/15 text-duo-blue px-2.5 py-0.5 rounded-full border border-duo-blue/20">
                4 Điểm Chính
              </span>
            </div>
            <p className="text-xs font-bold text-duo-muted mt-0.5">
              Chạm để {isOpen ? 'thu gọn' : 'xem bản đồ Google Maps & hướng dẫn di chuyển giữa các điểm'}
            </p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full btn-3d-white flex items-center justify-center shrink-0">
          <ChevronDown
            className={`w-4 h-4 text-duo-dark transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Collapsible Map Content */}
      {isOpen && (
        <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t-2 border-duo-border/70 space-y-4 animate-fade-in">
          
          {/* Venue Tabs Switcher */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {venuesList.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'btn-3d-blue text-white shadow-[0_3px_0_#1899D6]'
                      : 'btn-3d-white text-duo-dark hover:border-duo-blue/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-black text-xs sm:text-sm tracking-tight truncate">
                      {item.label}
                    </span>
                  </div>
                  <div className={`text-[10px] font-bold mt-1 truncate ${isActive ? 'text-white/90' : 'text-duo-muted'}`}>
                    {item.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Venue Details Banner */}
          <div className="bg-[#F8FAFC] border-2 border-duo-border/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-black text-sm sm:text-base text-duo-dark flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-duo-blue shrink-0" />
                  <span>{currentVenue.name}</span>
                </h4>
                {currentVenue.badge && (
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${currentVenue.badgeColor}`}>
                    {currentVenue.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-duo-muted flex-wrap">
                <p>
                  <strong>Địa chỉ:</strong> {currentVenue.address}
                </p>
                {currentVenue.phone && (
                  <a
                    href={`tel:${currentVenue.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1 text-duo-greenDark hover:underline font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                  >
                    <Phone className="w-3 h-3 text-duo-greenDark shrink-0" />
                    <span>Hotline: {currentVenue.phone}</span>
                  </a>
                )}
              </div>
              <p className="text-xs font-bold text-duo-dark flex items-start gap-1.5 pt-1">
                <Car className="w-3.5 h-3.5 text-duo-blue shrink-0 mt-0.5" />
                <span>{currentVenue.note}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 flex-wrap">
              {onOpenMapModal && (
                <button
                  type="button"
                  onClick={() => onOpenMapModal(currentVenue)}
                  className="btn-3d-white text-duo-dark font-black text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  title="Mở bản đồ popup"
                >
                  <MapPin className="w-3.5 h-3.5 text-duo-blue" />
                  <span>Phóng to</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => window.open(currentVenue.directUrl, '_blank', 'noopener,noreferrer')}
                className="btn-3d-blue text-white font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-[0_2px_0_#1899D6]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Chỉ đường trên Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </button>
            </div>
          </div>

          {/* Embedded Google Map Iframe (Lazy Loaded) */}
          <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-duo-border shadow-inner bg-slate-100">
            <iframe
              title={currentVenue.name}
              src={currentVenue.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>
      )}
    </div>
  );
}
