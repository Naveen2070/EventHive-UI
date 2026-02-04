import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '@/api/axios'
import { ScannerOverlay } from '@/features/organizer/components/ScannerOverlay'
import { ScanResultOverlay } from '@/features/organizer/components/ScanResultOverlay'
import { ScannerControls } from '@/features/organizer/components/ScannerControls'

export const Route = createFileRoute('/_app/organizer/scan')({
  component: ScannerPage,
})

function ScannerPage() {
  const [lastScanned, setLastScanned] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const checkInMutation = useMutation({
    mutationFn: async (reference: string) => {
      const res = await api.post('/bookings/check-in', {
        bookingReference: reference,
      })
      return res.data
    },
    onSuccess: (data) => toast.success(data.message),
    onError: (error: any) =>
      toast.error(error.response?.data?.message || 'Check-in Failed'),
    onSettled: () => {
      // Auto-reset after 2s
      setTimeout(() => {
        setLastScanned(null)
        setIsPaused(false)
      }, 2000)
    },
  })

  const handleScan = (detectedCodes: Array<any>) => {
    if (detectedCodes.length === 0 || isPaused) return
    const rawValue = detectedCodes[0].rawValue
    if (rawValue === lastScanned) return

    setIsPaused(true)
    setLastScanned(rawValue)
    checkInMutation.mutate(rawValue)
  }

  // Determine visual status for the overlay
  const uiStatus = checkInMutation.isPending
    ? 'pending'
    : checkInMutation.isError
      ? 'error'
      : checkInMutation.isSuccess
        ? 'success'
        : 'idle'

  return (
    <div className="max-w-md mx-auto space-y-6 flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Ticket Scanner</h1>
        <p className="text-slate-400">Point camera at attendee's QR code</p>
      </div>

      <div className="relative w-full aspect-square bg-black rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl">
        <Scanner
          onScan={handleScan}
          paused={isPaused}
          components={{ finder: false }}
          styles={{ container: { width: '100%', height: '100%' } }}
        />

        <ScannerOverlay isScanning={!isPaused} />

        <ScanResultOverlay
          status={uiStatus}
          attendeeName={checkInMutation.data?.attendeeName}
          errorMessage={checkInMutation.error?.response?.data?.message}
        />
      </div>

      <ScannerControls
        onReset={() => {
          setIsPaused(false)
          setLastScanned(null)
          checkInMutation.reset()
        }}
        isReady={!isPaused}
      />
    </div>
  )
}
