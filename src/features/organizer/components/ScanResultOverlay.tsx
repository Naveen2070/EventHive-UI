import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

interface ScanResultOverlayProps {
  status: 'idle' | 'pending' | 'success' | 'error'
  attendeeName?: string
  errorMessage?: string
}

export const ScanResultOverlay = ({
  status,
  attendeeName,
  errorMessage,
}: ScanResultOverlayProps) => {
  if (status === 'idle') return null

  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm animate-in fade-in duration-200">
      {status === 'pending' && (
        <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
      )}

      {status === 'error' && (
        <div className="text-center space-y-2">
          <XCircle className="h-20 w-20 text-red-500 mx-auto" />
          <h3 className="text-xl font-bold text-red-500">Invalid Ticket</h3>
          <p className="text-slate-400 max-w-50 mx-auto">{errorMessage}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center space-y-2">
          <CheckCircle2 className="h-20 w-20 text-emerald-500 mx-auto" />
          <h3 className="text-xl font-bold text-emerald-500">Checked In!</h3>
          <p className="text-white text-lg font-medium">{attendeeName}</p>
        </div>
      )}
    </div>
  )
}
