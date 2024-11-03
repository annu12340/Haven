import { Loader2 } from 'lucide-react';
import React from 'react';

function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 size={24} className="animate-spin -mt-[80px]" />
    </div>
  );
}

export default loading;
