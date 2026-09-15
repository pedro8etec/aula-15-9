import { X } from 'lucide-react';
import { ReactNode } from 'react';

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-slate-700 bg-slate-900 p-5 shadow-glow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-700 bg-slate-800 p-2 text-slate-200 hover:bg-slate-700">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
