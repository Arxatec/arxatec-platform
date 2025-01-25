import React from "react";
import { Fingerprint, ArrowLeft, Mail, Check, QrCode } from "lucide-react";

export const IconFingerprint: React.FC = () => (
  <Fingerprint className="w-6 h-6 text-gray-500" />
);
export const IconArrowLeft: React.FC = () => (
  <ArrowLeft className="w-4 h-4 mr-2" />
);
export const IconMail: React.FC = () => (
  <Mail className="w-6 h-6 text-gray-500" />
);
export const IconCheck: React.FC = () => (
  <Check className="w-6 h-6 text-primary" />
);
export const IconQrCode: React.FC = () => <QrCode className="w-5 h-5 mr-2" />;
