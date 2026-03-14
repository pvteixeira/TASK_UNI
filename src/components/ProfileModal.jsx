import React, { useState, useRef } from 'react';
import { X, Camera, Share2, Download, Check, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [photo, setPhoto] = useState(user?.photo || null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser({ name, photo });
    onClose();
  };

  const profileUrl = `${window.location.origin}/profile/${user?.id || 'guest'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass w-full max-w-md rounded-[32px] overflow-hidden relative shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Personalizar Perfil</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-brand-primary/20 border-2 border-brand-primary/30 flex items-center justify-center overflow-hidden">
                {photo ? (
                  <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-brand-primary">
                    {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
                  </span>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 p-2 bg-brand-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Camera size={16} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handlePhotoUpload}
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">JPG, PNG ou GIF. Máx 2MB.</p>
          </div>

          {/* Name Input */}
          <div className="space-y-2 mb-8">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Seu Nome</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
              placeholder="Como quer ser chamado?"
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowQR(!showQR)}
              className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-sm font-bold transition-all"
            >
              <Share2 size={16} />
              {showQR ? 'Ocultar QR' : 'Compartilhar'}
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center justify-center gap-2 py-3 bg-brand-primary hover:bg-brand-primary/80 rounded-2xl text-white text-sm font-bold shadow-lg shadow-brand-primary/20 transition-all"
            >
              <Check size={16} />
              Salvar
            </button>
          </div>

          {/* QR Code Section */}
          {showQR && (
            <div className="mt-8 pt-8 border-t border-white/5 animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-white rounded-2xl">
                  <QRCodeSVG value={profileUrl} size={150} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white mb-1">Seu QR Code de Perfil</p>
                  <p className="text-xs text-slate-500 font-medium">Envie seu perfil para amigos</p>
                </div>
                <div className="w-full flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-xl">
                  <input 
                    type="text" 
                    readOnly 
                    value={profileUrl}
                    className="flex-1 bg-transparent border-none text-[10px] text-slate-400 focus:outline-none font-mono truncate"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-white/10 rounded-lg text-brand-primary transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
